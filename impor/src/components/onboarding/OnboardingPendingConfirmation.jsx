import OnboardingStepLayout from './OnboardingStepLayout.jsx';

export default function OnboardingPendingConfirmation({
  email,
  submitError,
  isSubmitting,
  onContinue,
  onReset,
}) {
  return (
    <OnboardingStepLayout>
      <div className="success-state">
        <div className="success-icon">✓</div>
        <h3>Confirm your email</h3>
        <p>
          We sent a confirmation link to {email}. Open it in this browser, then continue setup
          here.
        </p>
        {submitError && <span className="error-text">{submitError}</span>}
        <button className="onboarding-cta" onClick={onContinue} disabled={isSubmitting}>
          {isSubmitting ? 'Checking...' : 'I confirmed my email'}
        </button>
        <button className="onboarding-secondary" onClick={onReset} disabled={isSubmitting}>
          Use a different email
        </button>
      </div>
    </OnboardingStepLayout>
  );
}
