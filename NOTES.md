# Notes

## Assumptions

- For layout and styling I've stuck with Tailwind's default styling + the generated markup from Claude Code

- Validate on submit: I decided to validate the form on submit rather than onBlur. I think this is preferable for a small form such as this, however with a larger form the usability may be improved if the validation happens on blur.

- I've kept the form components as standared form components and haven't added anything fancy

## Key decisions

- No state management library: I decided not to use a state management solution for this excersize and opted for React state only, the size of the task I don't think warrents the need for a state management library. For production I would likely use a library like Zustand (with persist middlware) and/or React Query for data which need to be persisted to a Backend

- Current step is managed by the URL: I opted for maintaining the "current step" state via the URL (`step-1`, `step-2`, `step-3`). I think this improves the user experience by giving additional context to where the user is in the process. It also means the user can reload the page without begin reset to Step 1

- Form State & Validation: I've kept the validation simple here; since the form is quite simple. For a more complex form I would use a form library such as Formik with an object validation library like Yup or Zod to validate the form data against a schema

- Persist data to local storage: I decided to persist the form state to localStorage for improved usability. This means the user can navigate away and return without losing the form data.

- Styling: I'm using Tailwind V4 for CSS. I prefer the utility-fist approach for CSS; It prevents specificity issues and helps with scalability. I also find the colocation of markup and styling helps prevent unitentional modificatin of other elements.

- Semantic HTML: `<form>`, `<fieldset>`, `<legend>`, `<label>` with `htmlFor` for optimal accessability.

- Appropriate aria labels on elements: "aria-invalid" and "aria-describedby to link input to error message; "aria-required" on required fields; "role='alert'" on error messages; "aria-current='step" on step indicator

- Everything is easily tabbable with a visible focus ring on all interactive elements

- I've added some basic tests using RTL + Jest which test the validation and ensure the form renders correctly

## What I would improve for production

- End-to-end tests: I would add E2E tests with a Playwright/Cypress to validate critical paths.

- Persist data to BE: Form data could be persisted to the backend as the user types. This would allow the user to revisit the booking session via a follow-up email. As well as track metrics around booking abandonment

- I would add linting for consistent styling

- Pre-commit hooks: Add pre-commit hooks lint + type check

- CI/CD pipelines: Run type check + lint + build before a PR can be merged to the staging/main branch

- I18n: Currently English is the only supported language, but a library like next-i18next would allow for multiple languages
