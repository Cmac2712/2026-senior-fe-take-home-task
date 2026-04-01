export function inputClasses(hasError: boolean): string {
  return `block w-full rounded-md border px-3 py-2 text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${
    hasError
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-gray-300 focus-visible:ring-blue-500"
  }`;
}
