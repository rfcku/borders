import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Input,
} from '@nextui-org/react';
import Image from 'next/image';
import { SearchIcon } from './SearchIcon';
export const Navbar = () => {
  return (
    <NextNavbar
      fixed
      active={true}
      type='dark'
      // logo={
      //   <NavbarBrand href='/'>
      //     <Image
      //       src='http://placehold.it/100x100'
      //       alt='NextUI Logo'
      //       width={100}
      //       height={100}
      //     />
      //   </NavbarBrand>
      // }
    >
      <NavbarContent>
        <NavbarBrand href='/'>
          <h1>Brds</h1>
        </NavbarBrand>
        <NavbarItem>
          <Input
            // label='Search'
            isClearable
            radius='lg'
            placeholder='Type to search...'
            startContent={
              <SearchIcon className='text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />
            }
          />
        </NavbarItem>
        {/* <NavbarMenuToggle /> */}
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
