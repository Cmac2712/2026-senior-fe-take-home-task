const STEP_LABELS = ["Select your trip", "Traveller details", "Success"];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Booking progress" className="mb-8">
      <ol className="flex items-center gap-3">
        {STEP_LABELS.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <li key={stepNum} className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  isActive
                    ? "text-blue-600"
                    : isCompleted
                      ? "text-green-800"
                      : "text-gray-600"
                }`}
                {...(isActive ? { "aria-current": "step" as const } : {})}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : isCompleted
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "\u2713" : stepNum}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </span>
              {index < STEP_LABELS.length - 1 && (
                <span
                  className={`hidden sm:block h-px w-8 ${
                    isCompleted ? "bg-green-300" : "bg-gray-200"
                  }`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
