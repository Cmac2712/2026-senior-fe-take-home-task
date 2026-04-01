import React, { useCallback, useState } from "react";
import FormField from "./FormField";
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


export default function TravellerForm({
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

  return (
    <div>
      <div>
        <h2>{trip.destination}</h2>
        <p>
          {formatDate(trip.departureDate)} &ndash;{" "}
          {formatDate(trip.returnDate)}
        </p>
        <p>{trip.summary}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend>Traveller details</legend>

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
              />
            )}
          </FormField>

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
              />
            )}
          </FormField>

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
              />
            )}
          </FormField>

          <FormField
            label="Special requests"
            name="specialRequests"
          >
            {(ariaProps) => (
              <textarea
                {...ariaProps}
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={3}
                placeholder="Dietary requirements, accessibility needs, etc."
              />
            )}
          </FormField>
        </fieldset>

        <button type="submit">Next step</button>
      </form>
    </div>
  );
}
