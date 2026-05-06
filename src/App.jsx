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
import { useEffect } from 'react';
import AOS from "aos";
import MobileVIew from './MobileVIew';
import DeskTopView from './DeskTopView';
import GetUser from "./admin/GetUser";
import { Routes, Route } from "react-router-dom";

function App() {
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
      <div className='hidden sm:block'>
        <DeskTopView/>
      </div>
      <div className='block sm:hidden'>
        <MobileVIew />
      </div>
    </div>
  );
}

export default App;