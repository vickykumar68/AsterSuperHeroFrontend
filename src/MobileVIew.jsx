import React from 'react';
import useAuth from './context/useAuth';
import DailyGenerals from './home/DailyGenerals';
import DownloadGeneral from './home/DownloadGeneral';
import Faq from './home/Faq';
import FixedFooter from './home/FixedFooter';
// import FormSection from './home/FormSection';
import HeroSection from './home/HeroSection';
import HowToJoin from './home/HowToJoin';
import MeetYourHero from './home/MeetYourHero';
import ParentZone from './home/ParentZone';
import Forms from './home/Forms';
import DailyTask from './home/DailyTask';
import NewFooter from './home/NewFooter';

function MobileVIew() {
  const { isAuthenticated, loading } = useAuth();
  return (
    <div className='relative min-h-screen'>
      <div className='pb-14'>
        <HeroSection />
        <MeetYourHero />
        <HowToJoin />
  {/* Only show Forms if user is not logged in and not loading */}
  {(!loading && !isAuthenticated) && <Forms />}
        {/* Only show DailyGenerals if user is logged in and not loading */}
        {(!loading && isAuthenticated) && <DailyGenerals />}
        <DailyTask />
        <ParentZone />
        <Faq />
        {/* <DownloadGeneral /> */}
        <NewFooter/>
      </div>
      <FixedFooter />
    </div>
  )
}

export default MobileVIew
