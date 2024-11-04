// Sidebar.js
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SlHome } from 'react-icons/sl';
import { FaMosque, FaShoppingCart, FaBus, FaSearch } from 'react-icons/fa';
import { MdOutlineWork, MdRestaurant } from 'react-icons/md';
import { IoSchool } from 'react-icons/io5';
import { LuFerrisWheel } from 'react-icons/lu';
import { GiHealthNormal } from 'react-icons/gi';
import logo from '@/img/logo.svg';

export default function Sidebar({ show, setter, toggleSearch }) {
  const router = useRouter();

  const className = 'bg-[#132FBA] w-[250px] transition-[margin-left] ease-in-out duration-500 fixed md:static top-0 bottom-0 left-0 z-40';
  const appendClass = show ? ' ml-0' : ' ml-[-250px] md:ml-0';

  const MenuItem = ({ icon, name, route, onClick }) => {
    const colorClass = router.pathname === route ? 'text-white' : 'text-white/50 hover:text-white';

    const handleClick = () => {
      if (onClick) {
        onClick();
      } else if (route) {
        router.push(route);
      }
      setter((oldVal) => !oldVal);
    };

    return (
      <div
        onClick={handleClick}
        className={`flex gap-1 [&>*]:my-auto text-md pl-6 py-3 border-b-[1px] border-b-white/10 ${colorClass} cursor-pointer`}
      >
        <div className='text-xl flex [&>*]:mx-auto w-[30px]'>{icon}</div>
        <div>{name}</div>
      </div>
    );
  };

  const ModalOverlay = () => (
    <div
      className='flex md:hidden fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30'
      onClick={() => {
        setter((oldVal) => !oldVal);
      }}
    />
  );

  return (
    <>
      <div className={`${className}${appendClass}`}>
        <div className='p-2 flex'>
          <Link href='/'>
            <img src={logo.src} alt='Company Logo' width={300} height={300} />
          </Link>
        </div>
        <div className='sidebar flex flex-col flex-grow'>
          <MenuItem name='Home' route='/' icon={<SlHome />} />
          <MenuItem name='Pencarian' icon={<FaSearch />} onClick={toggleSearch} />
          <MenuItem name='Tempat Ibadah' route='/tempatibadah' icon={<FaMosque />} />
          <MenuItem name='Perkantoran' route='/perkantoran' icon={<MdOutlineWork />} />
          <MenuItem name='Pendidikan' route='/pendidikan' icon={<IoSchool />} />
          <MenuItem name='Perdagangan' route='/perdagangan' icon={<FaShoppingCart />} />
          <MenuItem name='Tempat Hiburan' route='/tempathiburan' icon={<LuFerrisWheel />} />
          <MenuItem name='Kesehatan' route='/kesehatan' icon={<GiHealthNormal />} />
          <MenuItem name='Halte' route='/halte' icon={<FaBus />} />
          <MenuItem name='Kuliner' route='/kuliner' icon={<MdRestaurant />} />
        </div>
        <div className='mt-20'>
          <div
            onClick={() => router.push('/adminlogin')}
            className='text-white/50 hover:text-white text-sm pl-6 py-3 cursor-pointer underline'
          >
            Admin Login
          </div>
        </div>
      </div>
      {show ? <ModalOverlay /> : null}
    </>
  );
}
