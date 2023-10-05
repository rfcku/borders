import { useState } from 'react';
import Head from 'next/head';
import Border from '../components/border';

import { Navbar } from '../components/Navbar';

import { getBorders, arrangeBy, byCountry } from '../utils';

export default function Home({ time, groups }) {
  // console.log('groups', groups);
  const [country, setCountry] = useState('Mexico');
  const ports = groups[country];
  const [portName, setPortName] = useState('');
  const gs = arrangeBy(ports, 'port_name');

  const keys = Object.keys(gs);
  const autocompleteKeys = keys.map((title) => ({ label: title }));
  const handleAutoComplete = (title) => {
    setPortName(title);
  };
  return (
    <main>
      <Head>
        <title>Border Wait Times US / {country.toUpperCase()}</title>
        <meta name='google' content='nositelinkssearchbox' key='sitelinks' />
        <meta name='google' content='notranslate' key='notranslate' />
      </Head>
      <Navbar />
      <div>
        <div className='grid grid-cols-4 gap-4'>
          {ports.map((port) => {
            if (portName !== '' && port.port_name !== portName) return null;
            return <Border key={port._name} {...port} />;
          })}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context) {
  const reports = await getBorders();
  const { ports } = reports;

  const grouped = byCountry(ports);

  return {
    props: {
      groups: grouped || [],
    },
  };
}
