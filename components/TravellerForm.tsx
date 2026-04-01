import React, { useCallback, useState } from "react";
import { FormField } from "./FormField";
import { validateTravellerForm } from "@/lib/validation";
import type {
  BookingDefaults,
  FormErrors,
  TravellerFormData,
  TripDetails,
} from "@/lib/types";

interface TravellerFormProps {
  trip: TripDetails;
  defaults: BookingDefaults;
  onSubmit: (data: TravellerFormData) => void;
}

const INITIAL_FORM_DATA: TravellerFormData = {
  firstName: "",
  lastName: "",
  email: "",
  numberOfTravellers: "",
  phoneNumber: "",
  specialRequests: "",
};


export function TravellerForm({
  trip,
  defaults,
  onSubmit,
}: TravellerFormProps) {
  const [formData, setFormData] = useState<TravellerFormData>({
    ...INITIAL_FORM_DATA,
    numberOfTravellers: String(defaults.numberOfTravellers),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const updated = { ...formData, [name]: value };
      setFormData(updated);

      if (hasSubmitted) {
        setErrors(validateTravellerForm(updated));
      }
    },
    [formData, hasSubmitted],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (!hasSubmitted) return;
      const updated = { ...formData, [e.target.name]: e.target.value };
      setErrors(validateTravellerForm(updated));
    },
    [formData, hasSubmitted],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setHasSubmitted(true);

      const newErrors = validateTravellerForm(formData);
      setErrors(newErrors);

      if (Object.keys(newErrors).length > 0) {
        const firstErrorField = Object.keys(newErrors)[0];
        document.getElementById(`field-${firstErrorField}`)?.focus();
        return;
      }

      onSubmit(formData);
    },
    [formData, onSubmit],
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const inputClasses = (hasError: boolean) =>
    `block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
      hasError
        ? "border-red-500 focus-visible:ring-red-500"
        : "border-gray-300 focus-visible:ring-blue-500"
    }`;

  return (
    <div>
      <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h2 className="text-lg font-semibold text-blue-900">
          {trip.destination}
        </h2>
        <p className="text-sm text-blue-700 mt-1">
          {formatDate(trip.departureDate)} &ndash;{" "}
          {formatDate(trip.returnDate)}
        </p>
        <p className="text-sm text-blue-800 mt-1">{trip.summary}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="border-none p-0 m-0">
          <legend className="text-xl font-semibold text-gray-900 mb-4">
            Traveller details
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField
              label="First name"
              name="firstName"
              error={errors.firstName}
              required
            >
              {(ariaProps) => (
                <input
                  {...ariaProps}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="given-name"
                  className={inputClasses(!!errors.firstName)}
                />
              )}
            </FormField>

            <FormField
              label="Last name"
              name="lastName"
              error={errors.lastName}
              required
            >
              {(ariaProps) => (
                <input
                  {...ariaProps}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="family-name"
                  className={inputClasses(!!errors.lastName)}
                />
              )}
            </FormField>
          </div>

          <FormField
            label="Email"
            name="email"
            error={errors.email}
            required
          >
            {(ariaProps) => (
              <input
                {...ariaProps}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
                className={inputClasses(!!errors.email)}
              />
            )}
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <FormField
              label="Number of travellers"
              name="numberOfTravellers"
              error={errors.numberOfTravellers}
              required
            >
              {(ariaProps) => (
                <input
                  {...ariaProps}
                  type="number"
                  name="numberOfTravellers"
                  min="1"
                  max="20"
                  value={formData.numberOfTravellers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClasses(!!errors.numberOfTravellers)}
                />
              )}
            </FormField>

            <FormField
              label="Phone number"
              name="phoneNumber"
              error={errors.phoneNumber}
            >
              {(ariaProps) => (
                <input
                  {...ariaProps}
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete="tel"
                  placeholder="+44 20 7946 0958"
                  className={inputClasses(!!errors.phoneNumber)}
                />
              )}
            </FormField>
          </div>

          <FormField label="Special requests" name="specialRequests">
            {(ariaProps) => (
              <textarea
                {...ariaProps}
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                placeholder="Dietary requirements, accessibility needs, etc."
                className={inputClasses(false)}
              />
            )}
          </FormField>
        </fieldset>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
          >
            Next step
          </button>
        </div>
      </form>
    </div>
  );
}
