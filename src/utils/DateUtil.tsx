// 1. Define the enum for month formats
export enum MonthFormat {
  Long = 'long',
  Short = 'short',
  Narrow = 'narrow',
}

/**
 * Returns an array of month names for a given locale and format.
 * @param locale The locale string (e.g., 'en-US', 'es-ES', 'id-ID'). Defaults to 'en-US'.
 * @param format The format of the month name (MonthFormat.Long, MonthFormat.Short, MonthFormat.Narrow). Defaults to MonthFormat.Long.
 * @returns An array of 12 strings representing month names.
 */
export function getAllMonths(
  locale: string = 'en-US',
  format: MonthFormat = MonthFormat.Long // Use the enum here
): string[] {
  const months: string[] = [];
  for (let i = 0; i < 12; i++) {
    const date = new Date(0, i);
    // Use the enum value directly as the string for toLocaleString
    months.push(date.toLocaleString(locale, { month: format }));
  }
  return months;
}