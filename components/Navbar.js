
import { SearchIcon } from './SearchIcon';
import { FaMap } from 'react-icons/fa';
export const Navbar = ({ handleInput, date, time }) => {
  return (
    <div className='flex flex-row gap-2 px-20 py-10 justify-between align-middle items-center'>
      <a href="/" className='flex flex-row gap-3 align-middle items-center'>
        <FaMap size='30' className='text-slate-300' />
        <div className='flex flex-col'>
          <h1 className='font-extrabold text-xl'>Border Wait Times</h1>
          <div className='text-xs dark:text-zinc-400 font-light'>{date}</div>
        </div>
      </a>
      <div>
        <input
          className='border-none rounded-lg px-3 py-2 w-80'
          placeholder='Type to search...'
          onClear={() => handleInput('')}
          onChange={(e) => handleInput(e.target.value)}
          startContent={
            <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
          }
        />
      </div>
    </div>
  );
};

