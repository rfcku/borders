export const Lane = (data) => {
  const { title, lane, icon } = data;

  const laneTypes = [
    { key: 'standard_lanes', label: 'Standard' },
    { key: 'ready_lanes', label: 'Ready' },
    { key: 'NEXUS_SENTRI_lanes', label: 'NEXUS' },
    { key: 'FAST_lanes', label: 'FAST' },
  ];

  const hasData = (key) => {
    if (!lane[key]) return false;
    const { operational_status } = lane[key];
    return operational_status !== 'N/A';
  };

  const activeLanes = laneTypes.filter(lt => hasData(lt.key));

  if (activeLanes.length === 0) return null;

  return (
    <div className='bg-zinc-800/50 rounded-2xl p-4 border border-zinc-800/50'>
      <div className='flex flex-row items-center gap-2 mb-4'>
        <div className='text-blue-500 bg-blue-500/10 p-1.5 rounded-lg'>
          {icon}
        </div>
        <p className='font-black text-xs uppercase tracking-widest text-zinc-400'>{title}</p>
        <div className='ml-auto bg-zinc-900 px-2 py-0.5 rounded text-[10px] font-bold text-zinc-500 border border-zinc-800'>
          MAX: {lane.maximum_lanes}
        </div>
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {activeLanes.map(({ key, label }) => {
          const { delay_minutes, operational_status } = lane[key];
          const isClosed = operational_status === 'Lanes Closed';
          const minutes = parseInt(delay_minutes || 0);
          
          return (
            <div key={key} className='flex flex-col bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/50 items-start justify-center'>
              <span className='text-[9px] uppercase tracking-wider text-zinc-500 font-black mb-1'>{label}</span>
              {isClosed ? (
                <span className='text-[11px] text-red-400 font-bold uppercase tracking-tight'>Closed</span>
              ) : (
                <div className='flex items-baseline gap-1'>
                  <span className={`text-lg font-black leading-none ${minutes > 30 ? 'text-orange-500' : 'text-white'}`}>
                    {minutes}
                  </span>
                  <span className='text-[10px] font-bold text-zinc-600 uppercase'>min</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Lanes = ({ lanes, type }) => {
  return lanes.map((l) => <Lane key={l.title} {...l} type={type} />);
};
