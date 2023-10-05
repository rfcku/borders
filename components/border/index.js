import {
  Grid,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Chip,
  Divider,
} from '@nextui-org/react';

import { Lanes } from './lane';
import { AiFillCar } from 'react-icons/ai';
import { FaWalking } from 'react-icons/fa';

import { FaMap } from 'react-icons/fa';
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
  // console.log('crossing_name', crossing_name);
  // console.log('port_name', port_name);

  if (port_name === 'Alexandria Bay, NY') {
    console.log('lanes', lanes);
  }
  // if (!lanes) return null;

  return (
    <Card key={port_number}>
      <CardHeader>
        <div className='flex flex-col gap-1 w-full'>
          <div className='flex flex-row justify-between w-full'>
            <div className='flex w-4/5'>
              <h3 className='font-bold text-lg'>
                <span>{port_name && port_name !== '' && `${port_name}`}</span>
                <span>
                  {crossing_name && crossing_name !== '' && `${crossing_name}`}
                </span>
              </h3>
            </div>
            <div className='flex w-1/5 justify-end'>
              <Button isIconOnly aria-label='Like'>
                <FaDirections size='20' />
              </Button>
            </div>
          </div>
          <div className='flex flex-row gap-2'>
            <Chip
              color={port_status.toLowerCase() === 'open' ? 'primary' : 'error'}
            >
              {port_status}
            </Chip>
            <Chip>{hours}</Chip>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className='grid grid-cols-2 gap-4'>
          <Lanes lanes={lanes} type='ready_lanes' />
        </div>
      </CardBody>
    </Card>
  );
}
