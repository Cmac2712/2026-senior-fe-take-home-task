import React from "react";
import { StepIndicator } from "./StepIndicator";

interface BookingLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

export function BookingLayout({ currentStep, children }: BookingLayoutProps) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Book your trip
        </h1>
        <StepIndicator currentStep={currentStep} />
        {children}
      </div>
    </main>
  );
}
