export interface TripDetails {
  destination: string;
  departureDate: string;
  returnDate: string;
  summary: string;
}

export interface BookingDefaults {
  numberOfTravellers: number;
}

export interface BookingPageProps {
  trip: TripDetails;
  defaults: BookingDefaults;
  currentStep: number;
}

export interface TravellerFormData {
  firstName: string;
  lastName: string;
  email: string;
  numberOfTravellers: string;
  phoneNumber: string;
  specialRequests: string;
}

export type FormErrors = Partial<Record<keyof TravellerFormData, string>>;
