import type { FormErrors, TravellerFormData } from "./types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+?[0-9\s\-().]{7,20}$/;
const MAX_TRAVELLERS = 20;

export function validateTravellerForm(data: TravellerFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.numberOfTravellers.trim()) {
    errors.numberOfTravellers = "Number of travellers is required";
  } else {
    const num = Number(data.numberOfTravellers);
    if (!Number.isInteger(num) || num < 1 || num > MAX_TRAVELLERS) {
      errors.numberOfTravellers = `Please enter a number between 1 and ${MAX_TRAVELLERS}`;
    }
  }

  if (data.phoneNumber.trim() && !PHONE_REGEX.test(data.phoneNumber.trim())) {
    errors.phoneNumber =
      "Please enter a valid phone number (e.g. +44 20 7946 0958)";
  }

  return errors;
}
