import React from 'react'
import useAuth from './context/useAuth';
import AuthForm from './desktopHome/AuthForm';
import JoinIngProcess from './desktopHome/JoinIngProcess';
import IntroducedHero from './desktopHome/IntroducedHero';
import ParentZoneDeskTop from './desktopHome/ParentZoneDeskTop';
import FaqDesktop from './desktopHome/FaqDesktop';
import DownloadGeneral from './desktopHome/DownloadJournal';
import MultistepForm from './desktopHome/MultistepForm';
import HeroSectiondesk from './desktopHome/HeroSectiondesk';
import StayConnected from './desktopHome/StayConnected';
import FloatingButtons from './desktopHome/FloatingButtons';

function DeskTopView() {
    const { isAuthenticated, loading } = useAuth();
  return (
    <div>
       <HeroSectiondesk />
       <IntroducedHero />
       <JoinIngProcess />
         {/* Only show Forms if user is not logged in and not loading */}
        {(!loading && !isAuthenticated) && <AuthForm />}

       <MultistepForm  />
       <ParentZoneDeskTop />
       <FaqDesktop/>
       <StayConnected />
       <FloatingButtons />
    </div>
  )
}

export default DeskTopView;
