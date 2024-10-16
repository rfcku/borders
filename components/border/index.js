

import { Lanes } from './lane';
import { AiFillCar } from 'react-icons/ai';
import { FaWalking } from 'react-icons/fa';

import { FaDirections } from 'react-icons/fa';
export default function Component(data) {
  const {
    port_number,
    port_name,
    crossing_name,
    hours,
    port_status,
    passenger_vehicle_lanes,
    pedestrian_lanes,
  } = data;


  const lanes = [
    {
      title: 'Vehicles',
      lane: passenger_vehicle_lanes,
      icon: <AiFillCar size='30' />,
      ...data,
    },
    {
      title: 'Pedestrian',
      lane: pedestrian_lanes,
      icon: <FaWalking size='30' />,
      ...data,
    },
  ];


  return (
    <div key={port_number} className='flex flex-col gap-3 align-middle justify-between items-stretch p-5 rounded-xl bg-zinc-800 min-w-96'>
      <div className='flex flex-col gap-2 w-full'>
        <div className='flex flex-row justify-between gap-4'>
          <div className='flex'>
            <h3 className='font-bold text-lg'>
              <span>{port_name && port_name !== '' && `${port_name}`}</span>
              <span className='ml-2 text-zinc-300'>
                {crossing_name && crossing_name !== '' && `${crossing_name}`}
              </span>
            </h3>
          </div>
          <div className='flex justify-center items-center align-middle'>
            <a href={`https://www.google.com.mx/maps/search/${port_name}+${crossing_name}+border`} target="_blank" aria-label='Like' className='bg-blue-600 flex justify-center items-center align-middle rounded-xl h-10 w-10'>
              <FaDirections size='20' />
            </a>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <div
            className={`flex ${port_status.toLowerCase() === 'open' ? 'bg-green-500' : 'bg-red-500'} items-center justify-center px-2 py-1 rounded-full text-xs font-bold uppercase`}
          >
            {port_status}
          </div>
          <div className='flex items-center align-middle justify-center px-2 py-1 uppercase text-xs bg-yellow-500 rounded-xl'>{hours}</div>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <Lanes lanes={lanes} type='ready_lanes' />
      </div>
      <div className='flex flex-row justify-start gap-1'>
        <div className='bg-zinc-700 rounded-xl px-2 py-1 text-xs text-zinc-500'>{data.border.replace("Border", "")}</div>
        <div className='bg-zinc-700 rounded-xl px-2 py-1 text-xs text-zinc-500'>{port_number}</div>
      </div>
    </div >
  );
}
