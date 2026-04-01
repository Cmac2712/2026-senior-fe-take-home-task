import React from "react";
import { inputClasses } from "./styles";

interface PhoneInputProps {
  value: string;
  error?: string | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>,
  ) => void;
}

export function PhoneInput({
  error,
  value,
  onChange,
  onBlur,
}: PhoneInputProps) {
  const id = `field-phoneNumber`;
  const errorId = `${id}-error`;
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Phone Number
      </label>
      <input
        id={id}
        name="phoneNumber"
        type="tel"
        value={value}
        placeholder="+44 20 7946 0958"
        autoComplete="tel"
        onChange={onChange}
        onBlur={onBlur}
        {...(error
          ? { "aria-describedby": errorId, "aria-invalid": true }
          : {})}
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
