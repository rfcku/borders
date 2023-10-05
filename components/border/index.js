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
    },
    {
      title: 'Pedestrian',
      lane: pedestrian_lanes,
      icon: <FaWalking size='30' />,
    },
  ];
  return (
    <Card key={port_number}>
      <CardHeader>
        <div>
          <h3 className='font-bold text-lg'>
            <span>{port_name && port_name !== '' && `${port_name}`}</span>
            <span>
              {crossing_name && crossing_name !== '' && `${crossing_name}`}
            </span>
          </h3>
          <Chip
            color={port_status.toLowerCase() === 'open' ? 'primary' : 'error'}
          >
            {port_status}
          </Chip>
          <Chip>Hours: {hours}</Chip>
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
