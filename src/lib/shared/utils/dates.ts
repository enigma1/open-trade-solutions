type FormatDateProps = {
  date: string | Date;
  locale: string;
  options?: Intl.DateTimeFormatOptions;
};

export const formatDate = ({ date, locale, options }: FormatDateProps) =>
  new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    ...options,
  });

export const formatDateShort = ({ date, locale }: FormatDateProps) =>
  formatDate({
    date,
    locale,
    options: {
      month: 'short',
      day: '2-digit',
    },
  });

export const formatDateLong = ({ date, locale }: FormatDateProps) =>
  formatDate({
    date,
    locale,
    options: {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    },
  });

export const formatDateTime = ({ date, locale }: FormatDateProps) =>
  formatDate({
    date,
    locale,
    options: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
  });
