import Link from "next/link";
import TagsInput from "react-tagsinput";
import { MdOutlineWaves, MdSearch } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";

export const Navbar = ({ handleInput, date, time, timeago, tags }) => {
  return (
    <div className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="flex flex-row px-6 md:px-20 py-4 justify-between items-center max-w-[1600px] mx-auto">
        <Link
          href="/"
          className="flex flex-row gap-3 items-center group"
        >
          <div className="bg-blue-600 p-2 rounded-xl group-hover:bg-blue-500 transition-colors">
            <MdOutlineWaves size={32} className="text-white" />
          </div>

          <div className="flex flex-col">
            <h1 className="font-black text-2xl tracking-tighter text-white">
              BORDER<span className="text-blue-500">FLOW</span>
            </h1>
            <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold leading-none">
              Real-time Intelligence
            </div>
          </div>
        </Link>

        <div className="flex flex-row gap-6 items-center">
          <div className="hidden lg:flex flex-row items-center gap-4 border-r border-zinc-800 pr-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase text-zinc-500 font-bold">Last Update</span>
              <code className="text-xs text-blue-400 font-medium">
                {time}
              </code>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] uppercase text-zinc-500 font-bold">Status</span>
              <code className="text-xs text-green-500 font-medium lowercase italic">{timeago}</code>
            </div>
          </div>

          <div className="flex flex-row items-center bg-zinc-900 border border-zinc-800 rounded-2xl px-3 py-1 focus-within:border-blue-500/50 transition-all min-w-[300px]">
            <MdSearch size={20} className="text-zinc-500" />
            <TagsInput
              value={tags}
              onChange={handleInput}
              className="react-tagsinput-custom"
              inputProps={{
                placeholder: "Search ports, cities...",
                className: "bg-transparent border-0 outline-none text-sm text-zinc-300 ml-2 py-1 w-full",
              }}
            />
          </div>

          <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-all">
            <HiOutlineLocationMarker size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
