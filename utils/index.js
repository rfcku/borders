import xml2js from 'xml2js';
import dayjs from 'dayjs';
import { portCoordinates } from './coordinates';

const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

export const getDelay = (opts, format) => dayjs.duration({ ...opts });

export const CBP_API = 'https://bwt.cbp.gov/xml/bwt.xml';
const host = process.env.NEXT_PUBLIC_SITE_URL;

export const api = (url) => fetch(`${host}/api/${url}`);

const clean_obj = (port) => {
  const keys = Object.keys(port);
  const obj = {};
  keys.forEach((k) => {
    obj[k] =
      typeof port[k][0] === 'object' ? clean_obj(port[k][0]) : port[k][0];
  });
  
  // Inject coordinates if available
  if (obj.port_number && portCoordinates[obj.port_number]) {
    obj.lat = portCoordinates[obj.port_number].lat;
    obj.lon = portCoordinates[obj.port_number].lon;
  }
  
  return obj;
};
export const cleanObj = clean_obj;

export const cleanPorts = (ports) => {
  const res = [];
  ports.forEach((port) => {
    res.push(clean_obj(port));
  });
  return res;
};

export const getBorders = async () => {
  return fetch(CBP_API)
    .then((response) => response.text())
    .then(async (xml) => {
      const json = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
      return json.border_wait_time;
    })
    .then((data) => {
      return {
        ports: cleanPorts(data.port),
        updated: dayjs().format('MMMM D, YYYY'),
        last_updated_time: data.last_updated_time,
        last_updated_date: data.last_updated_date,
      };
    })
    .catch(console.error);
};

const port_name_to_query = (port_name) =>
  port_name[0].toLowerCase().replace(' ', '-');
export const toQuery = port_name_to_query;

export const matchQuery = (query, reports) => {
  return reports.port.filter((o) => {
    return port_name_to_query(o.port_name) === query;
  });
};

export const arrangeBy = (arr, key) => {
  const groups = {};
  arr.forEach((obj) => {
    const k = obj[key];

    if (!groups[k]) {
      groups[k] = [];
    }
    groups[k].push(obj);
  });
  return groups;
};

export const byCountry = (ports) => {
  const groups = {
    Canada: [],
    Mexico: [],
  };
  ports.forEach((port) => {
    if (port.border.includes('Canadian')) {
      groups.Canada.push(port);
    } else {
      groups.Mexico.push(port);
    }
  });
  return groups;
};

const filterBy = (arr, key, value) => {
  return arr.filter((o) => {
    return o[key] === value;
  });
};

export const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if (seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

// create a recursive function that searches for a key in an object
// and returns the value
const findKey = (obj, key) => {
  let value;

  Object.keys(obj).some((k) => {
    if (k === key) {
      value = obj[k];
      return true;
    }
    if (obj[k] && typeof obj[k] === 'object') {
      value = findKey(obj[k], key);
      return value !== undefined;
    }
  });

  return value;
};

//
const hasKey = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};

export const searchObject = (obj, keys) => {
  if (!obj || typeof obj !== 'object') {
    return {};
  }

  let result = {};
  let queue = [obj];

  while (queue.length > 0) {
    let current = queue.shift();
    for (let key of keys) {
      if (hasKey(current, key)) {
        result[key] = current[key];
      }
    }
    let keysArray = Object.keys(current);
    for (let i = 0; i < keysArray.length; i++) {
      let key = keysArray[i];
      if (typeof current[key] === 'object') {
        queue.push(current[key]);
      }
    }
  }

  return result;
};
