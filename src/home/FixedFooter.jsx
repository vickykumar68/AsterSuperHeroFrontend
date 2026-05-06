import React from 'react';
import useAuth from '../context/useAuth';

function FixedFooter() {

  const { isAuthenticated, loading } = useAuth();

 const handleButtonClick = async () => {
  if (isAuthenticated) {
    try {
      const response = await fetch('/api/v1/superhero/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(false);
        }

        // Clear cookies/localStorage/session
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        localStorage.clear();
        sessionStorage.clear();

        console.log('Logout successful, reloading...');

        // Force a full page reload to show login form
        setTimeout(() => {
          window.location.href = window.location.origin + '/#login';
        }, 300);
      } else {
        console.error('Logout failed');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  } else {
    const formEl = document.getElementById('login');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else window.location.hash = '#login';
  }
};



  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-between z-50">
      <button
  onClick={() => window.open("https://www.asterclinic.ae/feedback/", "_blank")}
  className="w-1/2 py-4 font-black text-white text-lg 
    bg-gradient-to-b from-[#3db8ff] to-[#007bff] 
    shadow-[0_4px_0_#0056b3] 
    border border-blue-700
    [text-shadow:_1px_2px_2px_rgba(0,0,0,0.8)] font-goldman tracking-tighter"
  style={{
    textShadow: "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
    WebkitTextStroke: "1px rgba(0,0,0,0.5)",
  }}
>
  CONTACT US
</button>

      {/* Sign Up Button */}
      {/* <button
        className="w-1/2 py-4 font-black text-white text-lg 
        bg-gradient-to-b from-[#ffe259] to-[#f9a602] 
        shadow-[0_4px_0_#c67c00] 
        border border-yellow-600
        [text-shadow:_1px_2px_2px_rgba(0,0,0,0.6)] font-goldman tracking-tighter"
        style={{
          textShadow: '2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)',
          WebkitTextStroke: '1px rgba(0,0,0,0.5)'
        }}
        onClick={() => {
          // Dispatch a custom event to open register form
          window.dispatchEvent(new CustomEvent('open-register-form'));
          // Optionally scroll to the form
          const formEl = document.getElementById('login');
          if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        SIGN UP
      </button> */}
        <button
        onClick={handleButtonClick}
        className={`w-1/2 sm:w-1/2 py-4 font-black text-lg 
          shadow-[0_4px_0] border 
          [text-shadow:_1px_2px_2px_rgba(0,0,0,0.6)] font-goldman tracking-tighter
          ${isAuthenticated
            ? 'bg-red-400 shadow-[0_4px_0_#c00] border-red-600 text-white'
            : 'bg-gradient-to-b from-[#ffe259] to-[#f9a602] shadow-[0_4px_0_#c67c00] border-yellow-600 text-white'
          }`}
        style={{
          textShadow: '2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)',
          WebkitTextStroke: '1px rgba(0,0,0,0.5)'
        }}
      >
        {isAuthenticated ? 'LOGOUT' : 'SIGN UP'}
      </button>
    </div>
  )
}

export default FixedFooter;


