export default function getDaysUntilBirthday(birthDate) {
  const today = new Date();
  const birthday = new Date(birthDate);
  birthday.setFullYear(today.getFullYear()); //make sure that birthday is calculated for the current year

  if (birthday < today) {
    //check if the calculated birthday date is in the past
    birthday.setFullYear(today.getFullYear() + 1);
  }

  const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
  const daysUntilBirthday = Math.floor((birthday - today) / oneDay); //calculating the time difference in days

  return daysUntilBirthday;
}
