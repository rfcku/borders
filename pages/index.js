import { useState, useEffect } from 'react';
import Head from 'next/head';
import Border from '../components/border';
import { Navbar } from '../components/Navbar';
import { timeAgo } from '../utils';
import { getBorders } from '../utils';

export default function Home({ date, time, timeAgo, ports }) {
  const [filtered, setFiltered] = useState(ports || []);

  const handleInput = (str) => {
    setFiltered(
      ports.filter((port) => {

        const name = port.port_name.toLowerCase();
        const crossing = port.crossing_name.toLowerCase();
        const number = port.port_number.toLowerCase();
        const border = port.border.toLowerCase();

        const search = str.toLowerCase();

        return name.includes(search) || crossing.includes(search) || number.includes(search) || border.includes(search);

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
        .then(function(result) {
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
          <code className='text-sm font-light'>
            Updated: {date} {time}
          </code>
          <code className='text-sm font-light'>{timeAgo}</code>
        </div>
        <div>
          <div className='flex'>
            <div className='grid xs:grid-cols-1 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {filtered.map((port) => (
                <Border key={port._name} {...port} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='flex text-zinc-500 justify-center align-middle items-enter p-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
          <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
        </svg>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const data = await getBorders();
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
