import { Grid, Card, Divider, CardBody, CardHeader } from '@nextui-org/react';
export const Lane = (data) => {
  const { title, lane, icon, type } = data;
  console.log('lane', lane);
  const {
    ready_lanes: { delay_minutes },
  } = lane;

  const minutes = parseInt(delay_minutes || 0);
  return (
    <Card variant='flat'>
      <CardBody className='flex flex-col justify-center content-center items-center gap-2'>
        <p className='font-light text-xs'>{title}</p>
        {icon}
        <p className='font-bold text-xl'>
          <span className='text-xl'>{minutes}</span>
          <span>mins</span>
        </p>
        <small className='text-center font-light text-xs'>
          {' '}
          Lanes: {lane.maximum_lanes}
        </small>
      </CardBody>
    </Card>
  );
};

export const Lanes = ({ lanes, type }) => {
  return lanes.map((l) => <Lane key={l.title} {...l} type={type} />);
  return lanes.map(
    (l) =>
      l.lane.maximum_lanes !== 'N/A' && (
        <Lane key={l.title} {...l} type={type} />
      )
  );
};
