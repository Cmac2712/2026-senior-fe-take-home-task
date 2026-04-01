import React from "react";
import { inputClasses } from "./styles";

interface NumberInputProps {
  label: string;
  name: string;
  value: string;
  error?: string | undefined;
  required?: boolean;
  min: string;
  max: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}

export function NumberInput({
  label,
  name,
  error,
  value,
  min,
  max,
  onChange,
  onBlur,
  required,
}: NumberInputProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
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
        name={name}
        type="number"
        value={value}
        min={min}
        max={max}
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
