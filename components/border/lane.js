import { Grid, Card, Divider, CardBody, CardHeader } from '@nextui-org/react';
export const Lane = (data) => {
  const { title, lane, icon, type } = data;

  const {
    ready_lanes: { delay_minutes },
  } = lane;

  const minutes = parseInt(delay_minutes || 0);
  return (
    <Card variant='flat'>
      <CardBody className='flex flex-col justify-center content-center items-center'>
        {icon}
        <p className='font-bold text-xl'>
          <span className='text-xl'>{minutes}</span>
          <span>mins</span>
        </p>
        <br /> {title} <br />
        <span> Lanes: {lane.maximum_lanes}</span>
      </CardBody>
    </Card>
  );
};

export const Lanes = ({ lanes, type }) => {
  return lanes.map(
    (l) =>
      l.lane.maximum_lanes !== 'N/A' && (
        <Lane key={l.title} {...l} type={type} />
      )
  );
};
