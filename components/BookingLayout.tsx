import React from "react";
import { StepIndicator } from "./StepIndicator";

interface BookingLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export function BookingLayout({ currentStep, children }: BookingLayoutProps) {
  return (
    <main>
      <h1>Book your trip</h1>
      <StepIndicator currentStep={currentStep} />
      {children}
    </main>
  );
}
