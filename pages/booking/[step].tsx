import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { BookingLayout } from "@/components/BookingLayout";
import { TravellerForm } from "@/components/TravellerForm";
import type { BookingPageProps, TravellerFormData } from "@/lib/types";

const VALID_STEPS = ["step-1", "step-2", "step-3"] as const;

export const getServerSideProps: GetServerSideProps<BookingPageProps> = async (
  context,
) => {
  const step = context.params?.step as string;

  if (!VALID_STEPS.includes(step as (typeof VALID_STEPS)[number])) {
    return { notFound: true };
  }

  const currentStep =
    VALID_STEPS.indexOf(step as (typeof VALID_STEPS)[number]) + 1;

  const trip = {
    destination: "Loch Lomond, Scotland",
    departureDate: "2026-06-15",
    returnDate: "2026-06-28",
    summary: "A 3 day trip around the bonnie banks of Scotland's greatest loch",
  };

  const defaults = {
    numberOfTravellers: 2,
  };

  return { props: { trip, defaults, currentStep } };
};

export default function BookingStepPage({
  trip,
  defaults,
  currentStep,
}: BookingPageProps) {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = useCallback(
    (data: TravellerFormData) => {
      console.log("Booking form submitted:", data);
      setIsSubmitted(true);
      router.push("/booking/step-3");
    },
    [router],
  );

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      router.push(`/booking/step-${currentStep - 1}`);
    }
  }, [currentStep, router]);

  const handleNext = useCallback(() => {
    if (currentStep < 3) {
      router.push(`/booking/step-${currentStep + 1}`);
    }
  }, [currentStep, router]);

  return (
    <BookingLayout currentStep={currentStep}>
      {currentStep === 1 && (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Step 1: Select your trip
          </h2>
          <p className="text-gray-500">Trip selection is coming soon.</p>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center rounded-md bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
            >
              Next step
            </button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <TravellerForm
            trip={trip}
            defaults={defaults}
            onSubmit={handleFormSubmit}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Step 3: Payment
          </h2>
          <p className="text-gray-500">
            Payment processing is coming soon. Thank you for entering your
            traveller details.
          </p>
        </div>
      )}

      {currentStep > 1 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 min-h-[44px] cursor-pointer"
          >
            &larr; Back
          </button>
        </div>
      )}
    </BookingLayout>
  );
}
