export function formatDate(date: string) {
  return date;
}

export const combineDateAndTime = (
  date: string,
  time: string
): Date => {
  return new Date(`${date}T${time}`);
};

export const getMinimumDateTime = (): Date => {
  const minimumDateTime = new Date();

  minimumDateTime.setHours(
    minimumDateTime.getHours() + 2
  );

  if (
    minimumDateTime.getSeconds() > 0 ||
    minimumDateTime.getMilliseconds() > 0
  ) {
    minimumDateTime.setMinutes(
      minimumDateTime.getMinutes() + 1
    );
  }

  minimumDateTime.setSeconds(0, 0);

  return minimumDateTime;
};

export const getMinimumDate = (): string => {
  const minimumDateTime = getMinimumDateTime();

  const year = minimumDateTime.getFullYear();
  const month = String(
    minimumDateTime.getMonth() + 1
  ).padStart(2, "0");
  const day = String(
    minimumDateTime.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getMinimumTime = (): string => {
  const minimumDateTime = getMinimumDateTime();

  const hours = String(
    minimumDateTime.getHours()
  ).padStart(2, "0");

  const minutes = String(
    minimumDateTime.getMinutes()
  ).padStart(2, "0");

  return `${hours}:${minutes}`;
};