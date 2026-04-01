import React, { useCallback, useState } from "react";
import {
  TextInput,
  EmailInput,
  NumberInput,
  PhoneInput,
  TextArea,
} from "@/components/Form";
import { validateTravellerForm } from "@/lib/validation";
import type {
  BookingDefaults,
  FormErrors,
  TravellerFormData,
  TripDetails,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

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

      console.log("Traveller Details: ", formData);

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

  return (
    <div>
      <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
        <h2 className="text-lg font-semibold text-blue-900">
          {trip.destination}
        </h2>
        <p className="text-sm text-blue-700 mt-1">
          {formatDate(trip.departureDate)} &ndash; {formatDate(trip.returnDate)}
        </p>
        <p className="text-sm text-blue-800 mt-1">{trip.summary}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset className="border-none p-0 m-0">
          <legend className="text-xl font-semibold text-gray-900 mb-4">
            Traveller details
          </legend>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <TextInput
              label="First name"
              name="firstName"
              error={errors.firstName}
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="given-name"
              required
            />

            <TextInput
              label="Last name"
              name="lastName"
              error={errors.lastName}
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="family-name"
              required
            />
          </div>

          <EmailInput
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
            <NumberInput
              label="Number of travellers"
              name="numberOfTravellers"
              min="1"
              max="10"
              value={formData.numberOfTravellers}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.numberOfTravellers}
            />

            <PhoneInput
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phoneNumber}
            />
          </div>

          <TextArea
            label="Special requests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Dietary requirements, accessibility needs, etc."
          />
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
