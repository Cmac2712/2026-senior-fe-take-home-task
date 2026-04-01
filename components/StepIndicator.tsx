const STEP_LABELS = ["Select your trip", "Traveller details", "Payment"];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress">
      <ol>
        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;

          return (
            <li key={stepNum}>
              <span {...(isActive ? { "aria-current": "step" as const } : {})}>
                <span>{stepNum}</span>
                <span>{label}</span>
              </span>
              {index < STEP_LABELS.length - 1 && (
                <span aria-hidden="true">&rarr;</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
