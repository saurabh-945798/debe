export function formatDate(
  date: string
) {
  return new Date(date).toLocaleString();
}


export const combineDateAndTime = (
  date: string,
  time: string
): Date => {

  return new Date(`${date}T${time}`);

};


export const getMinimumDateTime = () => {

  const now = new Date();

  now.setHours(
    now.getHours() + 2
  );

  return now;

};


export const getMinimumDate = () => {

  const date = getMinimumDateTime();

  return date
    .toISOString()
    .split("T")[0];

};