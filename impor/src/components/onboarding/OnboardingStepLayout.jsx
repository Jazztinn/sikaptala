export default function OnboardingStepLayout({
  header,
  title,
  subtitle,
  children,
  footer,
}) {
  const defaultHeader = (title || subtitle) ? (
    <div className="onboarding-header">
      {title ? <h2 className="brand-font">{title}</h2> : null}
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  ) : null;

  return (
    <div className="onboarding-screen-content">
      {header ?? defaultHeader}
      {children}
      {footer}
    </div>
  );
}
