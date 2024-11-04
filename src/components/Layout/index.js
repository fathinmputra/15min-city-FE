import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Sidebar from './Sidebar';
import MenuBarMobile from './MenuBarMobile';
import SearchPopup from '../SearchPopup';
import dynamic from 'next/dynamic';
import { useWalkthrough } from '../../contexts/WalkthroughContext';

const Walkthrough = dynamic(() => import('../Walkthrough'), { ssr: false });

export default function Layout({ pageTitle, children }) {
  let titleConcat = '15 Minutes Surabaya';
  if (pageTitle) titleConcat = pageTitle + ' | ' + titleConcat;

  const { toggleSearchPopupVisibility, isSearchPopupVisible } = useWalkthrough();
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Head>
        <title>{titleConcat}</title>
      </Head>
      <div className='min-h-screen'>
        <Walkthrough />
        <div className='flex'>
          <MenuBarMobile setter={setShowSidebar} />
          <Sidebar show={showSidebar} setter={setShowSidebar} toggleSearch={toggleSearchPopupVisibility} className='sidebar' />
          {isSearchPopupVisible && <SearchPopup onClose={toggleSearchPopupVisibility} />}
          <div className='flex flex-col flex-grow w-screen md:w-full min-h-screen'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
