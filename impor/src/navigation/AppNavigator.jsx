import { useLayoutEffect, useRef, useState } from 'react';
import BottomNav from '../components/BottomNav.jsx';
import RemovedTabScreen from '../screens/RemovedTab/RemovedTabScreen.jsx';
import './app-navigator.css';

const SCREENS = {
  home: { component: RemovedTabScreen, title: 'Home' },
  symptoms: { component: RemovedTabScreen, title: 'Symptoms' },
  family: { component: RemovedTabScreen, title: 'Family' },
  profile: { component: RemovedTabScreen, title: 'Settings' },
};

// Screens that take over the full app shell (no global bottom nav).
const FULLSCREEN_FLOW = new Set();

export default function AppNavigator({
  profile,
  child,
  children = [],
  onOpenAi,
  onSignOut,
  onProfileChange,
  onChildrenChange,
  signingOut = false,
  onNavigateToAddChild,
}) {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenHistory, setScreenHistory] = useState([]);
  const contentAreaRef = useRef(null);

  useLayoutEffect(() => {
    const container = contentAreaRef.current;
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [currentScreen]);

  const navigateTo = (screen) => {
    if (currentScreen === screen) return;

    setScreenHistory((history) => [...history, currentScreen].slice(-12));
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setScreenHistory((history) => {
      const nextHistory = [...history];
      const previous = nextHistory.pop() || 'home';
      setCurrentScreen(previous);
      return nextHistory;
    });
  };

  const screenConfig = SCREENS[currentScreen] || SCREENS.home;
  const Screen = screenConfig.component;
  const isFullscreen = FULLSCREEN_FLOW.has(currentScreen);

  return (
    <div className={`app-container${isFullscreen ? ' app-container--fullscreen' : ''}`}>
      <div className="content-area" ref={contentAreaRef}>
        <Screen
          profile={profile}
          child={child}
          children={children}
          onOpenAi={onOpenAi}
          onSignOut={onSignOut}
          onProfileChange={onProfileChange}
          onChildrenChange={onChildrenChange}
          signingOut={signingOut}
          onNavigateToAddChild={onNavigateToAddChild}
          onNavigateToProfile={() => navigateTo('profile')}
          onExit={() => navigateTo('home')}
          onBack={goBack}
          title={screenConfig.title}
        />
      </div>
      {!isFullscreen && (
        <BottomNav
          active={currentScreen}
          setActive={navigateTo}
          openChatModal={onOpenAi}
        />
      )}
    </div>
  );
}
