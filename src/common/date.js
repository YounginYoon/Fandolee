import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("YYYY-MM-DD");
};

export const timestampToDateFormat = (timestamp) => {
  const date = timestamp.toDate();

  return dateFormat(date);
};
