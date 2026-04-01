import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
    "aria-required"?: boolean;
  }) => React.ReactNode;
}

export function FormField({
  label,
  name,
  error,
  required,
  children,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;

  return (
    <div>
      <label htmlFor={id}>
        {label}
        {required && (
          <>
            <span aria-hidden="true">*</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children({
        id,
        ...(error ? { "aria-describedby": errorId, "aria-invalid": true } : {}),
        ...(required ? { "aria-required": true } : {}),
      })}
      {error && (
        <p id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
