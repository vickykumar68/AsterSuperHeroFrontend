import React from "react";
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

// const FloatingButtons = () => {
//   return (
//     <div className="fixed -right-[80px] top-1/2 -translate-y-14 z-50 flex flex-col text-[14px] items-center font-black space-y-28 text-white">
//       {/* Sign Up Button */}
//       <button className="w-40 h-12 px-8 bg-yellow-400 hover:bg-yellow-500 text-[14px]  rounded-lg shadow-md transform -rotate-90 origin-bottom [-webkit-text-stroke:0.3px_black] tracking-tighter">
//         SIGN UP
//       </button>

//       {/* Contact Us Button */}
//       <button className="w-40 h-12 px-8 bg-blue-500 hover:bg-blue-600  rounded-lg shadow-md transform -rotate-90 origin-bottom [-webkit-text-stroke:0.3px_black] tracking-tighter">
//         CONTACT US
//       </button>
//     </div>
//   );
// };


const FloatingButtons = () => {

  const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

//  const handleSignUpLogout = async () => {
//     if (isAuthenticated) {
//       try {
//         // Call logout API
//         const response = await fetch('/api/auth/logout', {
//           method: 'POST',
//           credentials: 'include', // send cookies if required
//         });

//         if (response.ok) {
//           // Optionally update auth context
  

//           // Clear cookies/local storage
//           document.cookie.split(";").forEach((c) => {
//             document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
//           });
//           localStorage.clear();

//           // Redirect to login page
//           window.location.href = '#loginForm';
//         } else {
//           console.error('Logout failed');
//         }
//       } catch (err) {
//         console.error('Error during logout:', err);
//       }
//     } else {
//       // Scroll to login form
//       const formEl = document.getElementById('loginForm');
//       if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
//     }
//   };
const handleSignUpLogout = async () => {
  if (isAuthenticated) {
    try {
      // Call logout API
      const response = await fetch('/api/v1/superhero/auth/logout', {
        method: 'POST',
        credentials: 'include', // send cookies if required
      });

      if (response.ok) {
        // Clear cookies/localStorage
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        localStorage.clear();

        // Reload the page so login form shows correctly
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  } else {
    // Scroll to login form if user not logged in
    const formEl = document.getElementById('loginForm');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  }
};


return (
    <div className="fixed -right-[80px] top-1/2 -translate-y-14 z-50 flex flex-col text-[14px] items-center font-black space-y-28 text-white">
      {/* Sign Up Button */}
     <button
        onClick={handleSignUpLogout}
        className={`w-40 h-12 px-8 text-[14px] text-white rounded-lg shadow-md transform -rotate-90 origin-bottom [-webkit-text-stroke:0.3px_black] tracking-tighter
          ${isAuthenticated 
            ? 'bg-red-400 hover:bg-red-500' 
            : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
      >
        {isAuthenticated ? 'LOGOUT' : 'SIGN UP'}
      </button>

      {/* Contact Us Button */}
      <button
        onClick={() =>
          window.open("https://www.asterclinic.ae/feedback/", "_blank")
        }
        className="w-40 h-12 px-8 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transform -rotate-90 origin-bottom [-webkit-text-stroke:0.3px_black] tracking-tighter"
      >
        CONTACT US
      </button>
    </div>
  );
};


export default FloatingButtons;
 