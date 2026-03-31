import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import TravellerForm from "@/components/TravellerForm";
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
    destination: "Patagonia, Chile",
    departureDate: "2026-06-15",
    returnDate: "2026-06-28",
    summary:
      "A 14-day guided trek through Torres del Paine with local hosts.",
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
      setTimeout(() => {
        router.push("/booking/step-3");
      }, 1500);
    },
    [router],
  );

  return (
    <main>
      <h1>Book your trip</h1>

      {currentStep === 1 && (
        <div>
          <h2>Step 1: Select your trip</h2>
          <p>
            Trip selection is coming soon. For now, proceed to the next step to
            enter your traveller details.
          </p>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          {isSubmitted ? (
            <div>
              <p>Details submitted successfully!</p>
              <p>Redirecting to payment&hellip;</p>
            </div>
          ) : (
            <TravellerForm
              trip={trip}
              defaults={defaults}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2>Step 3: Payment</h2>
          <p>
            Payment processing is coming soon. Thank you for entering your
            traveller details.
          </p>
        </div>
      )}
    </main>
  );
}
