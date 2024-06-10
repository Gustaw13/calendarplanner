export const getDateFromDateString = (dateString: string) => {
  return dateString.slice(0, 10);
};

export const getTimeFromDateString = (dateString: string) => {
  return dateString.slice(11, 16);
};
