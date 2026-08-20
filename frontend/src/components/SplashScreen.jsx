import React, { useEffect, useState } from 'react';
import platoraLogo from '../assets/food/platora-logo.png';

const SplashScreen = ({ onFinish }) => {
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    // Start fading out after 2.5s
    const fadeTimer = setTimeout(() => setFadingOut(true), 2500);
    // Unmount after 3s
    const unmountTimer = setTimeout(() => {
        document.body.style.overflow = 'auto';
        onFinish();
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
      document.body.style.overflow = 'auto';
    };
  }, [onFinish]);

  return (
    <>
      <div className={`splash-screen ${fadingOut ? 'fade-out' : ''}`}>
        <div className="logo-container">
          <img src={platoraLogo} alt="Platora Logo" className="splash-logo" />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 1;
          transition: opacity 0.5s ease-out;
          pointer-events: all;
        }
        
        body.dark-mode .splash-screen {
          background: #0f172a;
        }

        .splash-screen.fade-out {
          opacity: 0;
          pointer-events: none;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoEnter 2.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
        }

        .splash-logo {
          width: 350px;
          max-width: 70vw;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0px 8px 30px rgba(255, 77, 77, 0.3));
        }

        @keyframes logoEnter {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          20% {
            transform: scale(1.15);
            opacity: 1;
          }
          35% {
            transform: scale(1);
            opacity: 1;
          }
          80% {
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          100% {
            transform: scale(4); /* Dramatic zoom into the camera */
            opacity: 0;
            filter: blur(10px);
          }
        }
      `}} />
    </>
  );
};

export default SplashScreen;
