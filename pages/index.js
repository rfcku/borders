import { useState, useEffect } from 'react';
import Head from 'next/head';
import Border from '../components/border';

import { Navbar } from '../components/Navbar';
import { Code, ScrollShadow } from '@nextui-org/react';
import { timeAgo } from '../utils';

import { getBorders } from '../utils';

export default function Home({ date, time, timeAgo, ports }) {
  const [filtered, setFiltered] = useState(ports || []);

  const handleInput = (str) => {
    setFiltered(
      ports.filter((port) => {
        return port.port_name.toLowerCase().includes(str.toLowerCase());
      })
    );
  };

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  function success(pos) {
    var crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then(function (result) {
          console.log(result);
          if (result.state === 'granted') {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'prompt') {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === 'denied') {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <main>
      <Head>
        <title>Border Wait Times US</title>
        <meta name='google' content='nositelinkssearchbox' key='sitelinks' />
        <meta name='google' content='notranslate' key='notranslate' />
      </Head>
      <Navbar date={date} time={time} handleInput={handleInput} />
      <div className='flex flex-col gap-4 p-20 bg-gray'>
        <div className='flex flex-col items-end'>
          <Code className='text-sm font-light'>
            Updated: {date} {time}
          </Code>
          <br />
          <Code className='text-sm font-light'>{timeAgo}</Code>
        </div>
        <div>
          <ScrollShadow className='flex'>
            <div className='grid xs:grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {filtered.map((port) => (
                <Border key={port._name} {...port} />
              ))}
            </div>
          </ScrollShadow>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const data = await getBorders();
  // console.log('data', data);
  const { ports, last_updated_date, last_updated_time, updated } = data;

  const timestamp = new Date(`${last_updated_date} ${last_updated_time}`);
  timestamp.setHours(timestamp.getHours() - 3);
  console.log(timeAgo(timestamp));
  return {
    props: {
      // groups: grouped || [],
      ports: ports || [],
      date: timestamp.toDateString(),
      time: timestamp.toLocaleTimeString(),
      timeAgo: timeAgo(timestamp),
    },
  };
}
