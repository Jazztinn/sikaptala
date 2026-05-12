export default function OnboardingProgress({ steps, step }) {
  return (
    <div className="onboarding-progress">
      {steps.map((screen, index) => (
        <div
          key={screen.id}
          className={`onboarding-dot ${index <= step ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
