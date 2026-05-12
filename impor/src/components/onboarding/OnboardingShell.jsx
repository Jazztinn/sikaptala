import { AppNavbar } from '../navigation/index.js';
import OnboardingProgress from './OnboardingProgress.jsx';

export default function OnboardingShell({
  children,
  steps = [],
  step = 0,
  direction = 'next',
  onBack,
  showNavigation = true,
  animate = true,
  title,
  extra,
  transparent = true,
}) {
  const screenClassName = `onboarding-screen${animate ? ` slide-${direction}` : ''}`;
  const navigationTitle = title ?? (steps.length ? <OnboardingProgress steps={steps} step={step} /> : null);
  const screenKey = animate ? step : 'static';

  return (
    <div className="onboarding-flow">
      {showNavigation && (
        <AppNavbar
          variant="inner"
          transparent={transparent}
          title={navigationTitle}
          onBack={onBack}
          extra={extra}
        />
      )}

      <div className="onboarding-screen-wrapper">
        <div key={screenKey} className={screenClassName}>
          {children}
        </div>
      </div>
    </div>
  );
}
