
import Link from 'next/link';

import { Lanes } from './lane';
import { AiFillCar } from 'react-icons/ai';
import { FaWalking, FaTruck, FaDirections } from 'react-icons/fa';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import calculateDistance from '../../utils/distance';

export default function Component(data) {
  const {
    port_number,
    port_name,
    crossing_name,
    hours,
    port_status,
    passenger_vehicle_lanes,
    pedestrian_lanes,
    commercial_vehicle_lanes,
    userCoordinates,
  } = data;

  console.log(data);

  const lanes = [
    {
      title: 'Passenger',
      lane: passenger_vehicle_lanes,
      icon: <AiFillCar size='20' />,
      ...data,
    },
    {
      title: 'Commercial',
      lane: commercial_vehicle_lanes,
      icon: <FaTruck size='20' />,
      ...data,
    },
    {
      title: 'Pedestrian',
      lane: pedestrian_lanes,
      icon: <FaWalking size='20' />,
      ...data,
    },
  ];

  const { lat, lon } = userCoordinates;

  const hasCoordinates = data.lat && data.lon;
  const distance = (hasCoordinates && lat && lon)
    ? calculateDistance(lat, lon, data.lat, data.lon).toFixed(2)
    : null;

  return (
    <div key={port_number} className='flex flex-col gap-5 p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-blue-500/30 transition-all group shadow-xl'>
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex flex-row justify-between items-start gap-4'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-row items-center gap-2'>
              <div
                className={`w-2 h-2 rounded-full ${port_status.toLowerCase() === 'open' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'}`}
              />
              <span className='text-[10px] uppercase tracking-widest font-black text-zinc-500'>
                {port_status}
              </span>
            </div>
            <h3 className='font-bold text-xl text-white leading-tight'>
              {port_name && port_name !== '' && port_name}
            </h3>
            {crossing_name && crossing_name !== '' && (
              <p className='text-sm text-zinc-400 font-medium'>{crossing_name}</p>
            )}
          </div>
          
          <Link 
            rel="noreferrer" 
            href={`https://www.google.com.mx/maps/search/${port_name}+${crossing_name}+border`} 
            target="_blank" 
            className='bg-zinc-800 hover:bg-blue-600 text-zinc-400 hover:text-white p-3 rounded-xl transition-all'
          >
            <FaDirections size='20' />
          </Link>
        </div>

        <div className='flex flex-row items-center gap-3'>
          <div className='flex items-center px-2 py-1 bg-zinc-800 rounded-lg border border-zinc-700'>
             <span className='text-[10px] font-bold text-zinc-300 uppercase'>{hours}</span>
          </div>
          {distance && (
            <div className='flex flex-row items-center gap-1 text-zinc-500'>
              <HiOutlineLocationMarker size={14} />
              <span className='text-xs font-medium'>{distance}km away</span>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <Lanes lanes={lanes} type='ready_lanes' />
      </div>

      <div className='flex flex-row justify-between items-center pt-4 border-t border-zinc-800/50 mt-auto'>
        <div className='flex flex-row gap-2'>
           <span className='text-[9px] uppercase tracking-tighter bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-bold italic'>
            {data.border.replace("Border", "")}
          </span>
          <span className='text-[9px] uppercase tracking-tighter bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-bold'>
            #{port_number}
          </span>
        </div>
        <div className='text-[10px] text-zinc-600 font-medium'>
          ID: {port_number}
        </div>
      </div>
    </div >
  );
}
