import { Link } from 'next/link';

export const Navbar = ({ handleInput, date, time }) => {
  return (
    <div className='flex flex-row gap-2 px-20 py-10 justify-between align-middle items-center'>
      <Link href="/" className='flex flex-row gap-3 align-middle items-center'>



        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-14">
          <path fillRule="evenodd" d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 0 1 .75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 0 1 9.75 22.5a.75.75 0 0 1-.75-.75v-4.131A15.838 15.838 0 0 1 6.382 15H2.25a.75.75 0 0 1-.75-.75 6.75 6.75 0 0 1 7.815-6.666ZM15 6.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" clipRule="evenodd" />
          <path d="M5.26 17.242a.75.75 0 1 0-.897-1.203 5.243 5.243 0 0 0-2.05 5.022.75.75 0 0 0 .625.627 5.243 5.243 0 0 0 5.022-2.051.75.75 0 1 0-1.202-.897 3.744 3.744 0 0 1-3.008 1.51c0-1.23.592-2.323 1.51-3.008Z" />
        </svg>



        <div className='flex flex-col'>
          <h1 className='font-extrabold text-2xl'>GoBorderGo</h1>
          <div className='text-xs dark:text-zinc-400 font-light'>{date}</div>
        </div>
      </Link>
      <div className='flex flex-row gap-3'>
        <button className='text-zinc-500'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>

        </button>
        <input
          className='border-none rounded-lg px-3 py-2 w-80'
          placeholder='Type to search...'
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
    </div>
  );
};

