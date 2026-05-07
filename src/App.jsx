// import './App.css';
// import { useEffect } from 'react';
// import AOS from "aos";
// import MobileVIew from './MobileVIew';
// import DeskTopView from './DeskTopView';


// function App() {
//     useEffect(() => {
//       AOS.init({
//         duration: 800,       // values from 0 to 3000, in ms
//         easing: 'ease-in-out',
//         once: false,         // whether animation should happen only once
//         mirror: false,       // whether elements should animate out while scrolling past them
//       });
//     }, []);
//   return (
//         <div>
//             <div className='hidden sm:block'>
//                 <DeskTopView/>
//             </div>
//             <div className='block sm:hidden'>
//                 <MobileVIew />
//             </div>
//         </div>
//   );
// }

// export default App;


import './App.css';
import { useState, useEffect, Suspense, lazy } from 'react';
import AOS from "aos";

const DeskTopView = lazy(() => import('./DeskTopView'));
const MobileVIew = lazy(() => import('./MobileVIew'));

function App() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: false,
    });
  }, []);

  return (
    <div>
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <span className="text-lg font-bold">Loading...</span>
        </div>
      }>
        {isMobile ? <MobileVIew /> : <DeskTopView />}
      </Suspense>
    </div>
  );
}

export default App;