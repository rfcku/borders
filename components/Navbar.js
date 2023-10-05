import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Input,
} from '@nextui-org/react';
import Image from 'next/image';
import { SearchIcon } from './SearchIcon';
import { FaMap } from 'react-icons/fa';
export const Navbar = ({ handleInput, date, time }) => {
  return (
    <NextNavbar fixed active={true} type='dark'>
      <NavbarContent>
        <NavbarBrand href='/'>
          <div className='flex flex-row gap-3 align-middle items-center'>
            <FaMap size='30' className='text-slate-300' />
            <div className='flex flex-col'>
              <h1>Border Wait Times</h1>
              <div className='text-sm font-light'>{date}</div>
            </div>
          </div>
        </NavbarBrand>
        <NavbarItem>
          <Input
            isClearable
            radius='lg'
            placeholder='Type to search...'
            onClear={() => handleInput('')}
            onChange={(e) => handleInput(e.target.value)}
            startContent={
              <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
            }
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem active>Home</NavbarMenuItem>
        <NavbarMenuItem>About</NavbarMenuItem>
        <NavbarMenuItem>Docs</NavbarMenuItem>
        <NavbarMenuItem>Blog</NavbarMenuItem>
      </NavbarMenu>
    </NextNavbar>
  );
};

// export default Navbar;
