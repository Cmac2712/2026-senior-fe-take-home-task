import { validateTravellerForm } from "../validation";
import type { TravellerFormData } from "../types";

const validData: TravellerFormData = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  numberOfTravellers: "2",
  phoneNumber: "",
  specialRequests: "",
};

function validate(overrides: Partial<TravellerFormData> = {}) {
  return validateTravellerForm({ ...validData, ...overrides });
}

describe("validateTravellerForm", () => {
  it("returns no errors for valid data", () => {
    expect(validate()).toEqual({});
  });

  describe("firstName", () => {
    it("requires first name", () => {
      expect(validate({ firstName: "" })).toHaveProperty("firstName");
    });

    it("rejects whitespace-only", () => {
      expect(validate({ firstName: "   " })).toHaveProperty("firstName");
    });

    it("accepts a valid first name", () => {
      expect(validate({ firstName: "Jane" })).not.toHaveProperty("firstName");
    });
  });

  describe("lastName", () => {
    it("requires last name", () => {
      expect(validate({ lastName: "" })).toHaveProperty("lastName");
    });

    it("accepts a valid last name", () => {
      expect(validate({ lastName: "Smith" })).not.toHaveProperty("lastName");
    });
  });

  describe("email", () => {
    it("requires email", () => {
      expect(validate({ email: "" })).toHaveProperty("email");
    });

    it.each(["not-an-email", "missing@tld", "@no-local.com", "spaces in@email.com"])(
      "rejects invalid email: %s",
      (email) => {
        expect(validate({ email })).toHaveProperty("email");
      },
    );

    it.each(["user@example.com", "name+tag@domain.co.uk", "test@sub.domain.com"])(
      "accepts valid email: %s",
      (email) => {
        expect(validate({ email })).not.toHaveProperty("email");
      },
    );
  });

  describe("numberOfTravellers", () => {
    it("requires number of travellers", () => {
      expect(validate({ numberOfTravellers: "" })).toHaveProperty(
        "numberOfTravellers",
      );
    });

    it.each(["0", "-1", "21", "1.5", "abc"])(
      "rejects invalid value: %s",
      (numberOfTravellers) => {
        expect(validate({ numberOfTravellers })).toHaveProperty(
          "numberOfTravellers",
        );
      },
    );

    it.each(["1", "10", "20"])(
      "accepts valid value: %s",
      (numberOfTravellers) => {
        expect(validate({ numberOfTravellers })).not.toHaveProperty(
          "numberOfTravellers",
        );
      },
    );
  });

  describe("phoneNumber", () => {
    it("allows empty phone number", () => {
      expect(validate({ phoneNumber: "" })).not.toHaveProperty("phoneNumber");
    });

    it.each([
      "+44 20 7946 0958",
      "+1 (555) 123-4567",
      "020 7946 0958",
      "+33 1 42 68 53 00",
    ])("accepts valid phone: %s", (phoneNumber) => {
      expect(validate({ phoneNumber })).not.toHaveProperty("phoneNumber");
    });

    it.each(["abc", "123", "+44"])(
      "rejects invalid phone: %s",
      (phoneNumber) => {
        expect(validate({ phoneNumber })).toHaveProperty("phoneNumber");
      },
    );
  });

  describe("specialRequests", () => {
    it("allows empty special requests", () => {
      expect(validate({ specialRequests: "" })).not.toHaveProperty(
        "specialRequests",
      );
    });

    it("allows any text", () => {
      expect(
        validate({ specialRequests: "Vegetarian meals please" }),
      ).not.toHaveProperty("specialRequests");
    });
  });
});
