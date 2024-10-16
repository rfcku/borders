export const Lane = (data) => {
  const { title, lane, icon, type } = data;

  const {
    ready_lanes: { delay_minutes },
  } = lane;


  const minutes = parseInt(delay_minutes || 0);
  return (
    <div className='bg-zinc-900 rounded-xl p-4'>
      <div className='flex flex-col justify-center content-center items-center gap-2'>
        <p className='font-light text-xs text-zinc-500'>{title}</p>
        {icon}
        <p className='font-bold text-xl'>
          <span className='text-xl'>{minutes}</span>
          <span>mins</span>
        </p>
        <small className='text-center font-light text-xs text-zinc-500'>
          {' '}
          Lanes: {lane.maximum_lanes}
        </small>
      </div>
    </div>
  );
};

export const Lanes = ({ lanes, type }) => {
  return lanes.map((l) => <Lane key={l.title} {...l} type={type} />);
};
