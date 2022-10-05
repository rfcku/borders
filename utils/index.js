import xml2js from "xml2js";
export const CBP_API = "https://bwt.cbp.gov/xml/bwt.xml";

const groups = {
  Canada: [],
  Mexico: [],
};

const clean_obj = (port) => {
  const keys = Object.keys(port);
  const obj = {};
  keys.forEach((k) => {
    obj[k] =
      typeof port[k][0] === "object" ? clean_obj(port[k][0]) : port[k][0];
  });
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
    .catch(console.error);
};

const port_name_to_query = (port_name) =>
  port_name[0].toLowerCase().replace(" ", "-");
export const toQuery = port_name_to_query;

export const matchQuery = (query, reports) => {
  return reports.port.filter((o) => {
    return port_name_to_query(o.port_name) === query;
  });
};
