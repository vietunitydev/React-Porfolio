const YEAR_ONLY_REGEX = /^\d{4}$/;
const YEAR_MONTH_REGEX = /^\d{4}-\d{2}$/;
const FULL_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function toProjectDate(value: string): Date | null {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) {
    return null;
  }

  if (FULL_DATE_REGEX.test(trimmed)) {
    const date = new Date(`${trimmed}T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (YEAR_MONTH_REGEX.test(trimmed)) {
    const date = new Date(`${trimmed}-01T00:00:00Z`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (YEAR_ONLY_REGEX.test(trimmed)) {
    const date = new Date(Date.UTC(Number(trimmed), 0, 1));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const parsed = new Date(trimmed);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function toProjectDateInputValue(value: string): string {
  const trimmed = String(value ?? '').trim();

  if (FULL_DATE_REGEX.test(trimmed)) {
    return trimmed;
  }

  if (YEAR_MONTH_REGEX.test(trimmed)) {
    return `${trimmed}-01`;
  }

  if (YEAR_ONLY_REGEX.test(trimmed)) {
    return `${trimmed}-01-01`;
  }

  const date = toProjectDate(trimmed);
  return date ? date.toISOString().slice(0, 10) : '';
}

export function formatProjectMonthYear(value: string, locale = 'en-US'): string {
  const trimmed = String(value ?? '').trim();
  const date = toProjectDate(trimmed);
  if (!date) {
    return trimmed || 'No date';
  }

  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getProjectSortTimestamp(value: string): number {
  const date = toProjectDate(value);
  return date ? date.getTime() : Number.NEGATIVE_INFINITY;
}
