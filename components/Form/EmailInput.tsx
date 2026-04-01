import React from "react";
import { inputClasses } from "./styles";

interface EmailInputProps {
  value: string;
  error?: string | undefined;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}

export function EmailInput({
  error,
  value,
  onChange,
  onBlur,
  required,
}: EmailInputProps) {
  const id = `field-email`;
  const errorId = `${id}-error`;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email
        {required && (
          <>
            <span aria-hidden="true" className="text-red-600 ml-0.5">
              *
            </span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      <input
        id={id}
        name="email"
        type="email"
        value={value}
        autoComplete="email"
        onChange={onChange}
        onBlur={onBlur}
        {...(error
          ? { "aria-describedby": errorId, "aria-invalid": true }
          : {})}
        {...(required ? { "aria-required": true } : {})}
        className={inputClasses(!!error)}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
