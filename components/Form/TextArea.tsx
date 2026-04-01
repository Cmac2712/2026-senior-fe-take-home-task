import React from "react";
import { inputClasses } from "./styles";

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  error?: string | undefined;
  required?: boolean;
  placeholder: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}

export function TextArea({
  label,
  name,
  error,
  value,
  onChange,
  onBlur,
  required,
  placeholder,
}: TextAreaProps) {
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
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
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
