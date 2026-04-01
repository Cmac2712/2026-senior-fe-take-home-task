import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TravellerForm } from "../TravellerForm";
import type { BookingDefaults, TripDetails } from "@/lib/types";

const trip: TripDetails = {
  destination: "Loch Lomond, Scotland",
  departureDate: "2026-06-15",
  returnDate: "2026-06-28",
  summary: "A 3 day trip around the bonnie banks of Scotland's greatest loch",
};

const defaults: BookingDefaults = {
  numberOfTravellers: 2,
};

function renderForm(onSubmit = jest.fn()) {
  return {
    onSubmit,
    user: userEvent.setup(),
    ...render(
      <TravellerForm trip={trip} defaults={defaults} onSubmit={onSubmit} />,
    ),
  };
}

describe("TravellerForm", () => {
  it("renders all fields with labels", () => {
    renderForm();

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of travellers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/special requests/i)).toBeInTheDocument();
  });

  it("pre-fills number of travellers from defaults", () => {
    renderForm();

    expect(screen.getByLabelText(/number of travellers/i)).toHaveValue(2);
  });

  it("displays trip summary", () => {
    renderForm();

    expect(screen.getByText("Loch Lomond, Scotland")).toBeInTheDocument();
    expect(screen.getByText(/A 3 day trip/)).toBeInTheDocument();
  });

  it("shows errors when submitting empty form", async () => {
    const { user } = renderForm();

    // Clear the pre-filled travellers field
    const travellersInput = screen.getByLabelText(/number of travellers/i);
    await user.clear(travellersInput);

    await user.click(screen.getByRole("button", { name: /next step/i }));

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/number of travellers is required/i),
    ).toBeInTheDocument();
  });

  it("does not call onSubmit when validation fails", async () => {
    const { user, onSubmit } = renderForm();

    await user.click(screen.getByRole("button", { name: /next step/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("calls onSubmit with form data when valid", async () => {
    const { user, onSubmit } = renderForm();

    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Smith");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.click(screen.getByRole("button", { name: /next step/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        numberOfTravellers: "2",
      }),
    );
  });

  it("shows phone error only for invalid format", async () => {
    const { user } = renderForm();

    await user.type(screen.getByLabelText(/first name/i), "Jane");
    await user.type(screen.getByLabelText(/last name/i), "Smith");
    await user.type(screen.getByLabelText(/email/i), "jane@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "abc");
    await user.click(screen.getByRole("button", { name: /next step/i }));

    expect(screen.getByText(/valid phone number/i)).toBeInTheDocument();

    await user.clear(screen.getByLabelText(/phone number/i));
    await user.type(screen.getByLabelText(/phone number/i), "+44 20 7946 0958");

    expect(screen.queryByText(/valid phone number/i)).not.toBeInTheDocument();
  });
});
