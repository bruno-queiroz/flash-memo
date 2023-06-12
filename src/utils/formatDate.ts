export const ONE_HOUR_IN_MILLISECONDS = 3600000;
export const ONE_DAY_IN_MILLISENCONDS = 86400000;
export const ONE_MONTH_IN_MILLISENCONDS = 2592000000;
export const ONE_YEAR_IN_MILLISECONDS = 31536000000;

export const formatDate = (date: number) => {
  let formattedDate = "";
  if (date < ONE_HOUR_IN_MILLISECONDS) {
    const dateInMinutes = date / 1000 / 60;
    const minutes = dateInMinutes.toFixed();

    formattedDate = minutes + "m";
  } else if (date < ONE_DAY_IN_MILLISENCONDS) {
    const dateInHours = date / 1000 / 60 / 60;
    const [hours] = dateInHours.toString().split(".");

    formattedDate = hours + "h";
  } else if (date < ONE_MONTH_IN_MILLISENCONDS * 2) {
    const dateInDays = date / 1000 / 60 / 60 / 24;
    const [days] = dateInDays.toString().split(".");

    formattedDate = days + "d";
  } else if (date < ONE_YEAR_IN_MILLISECONDS) {
    const dateInMonths = date / 1000 / 60 / 60 / 24 / 30;
    const dateRestDays = (date / 1000 / 60 / 60 / 24) % 30;
    const [month] = dateInMonths.toString().split(".");
    const day = dateRestDays.toFixed();

    formattedDate = `${month}.${day}m`;
  } else if (date < ONE_YEAR_IN_MILLISECONDS + ONE_MONTH_IN_MILLISENCONDS) {
    const dateInYear = date / 1000 / 60 / 60 / 24 / 365;
    const year = dateInYear.toFixed();

    formattedDate = year + "y";
  } else {
    const dateInYear = date / 1000 / 60 / 60 / 24 / 365;
    const dateRestMonths = ((date / 1000 / 60 / 60 / 24) % 365) / 30;
    const [year] = dateInYear.toString().split(".");
    const restMonts = dateRestMonths.toFixed();
    console.log(year);

    formattedDate = `${year}.${restMonts}y`;
  }

  return formattedDate;
};
