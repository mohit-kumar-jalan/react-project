export default function formatDate(date: any) {
  const currentDate: any = new Date();
  const incomingDate: any = new Date(date);
  const diffInMilliseconds = currentDate - incomingDate;
  const diffInYears = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)
  );
  const diffInMonths = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)
  );

  if (diffInYears > 0) {
    return diffInYears === 1
      ? `${diffInYears} year ago`
      : `${diffInYears} years ago`;
  } else if (diffInMonths > 0) {
    return diffInMonths === 1
      ? `${diffInMonths} month ago`
      : `${diffInMonths} months ago`;
  } else {
    return "Less than a month ago";
  }
}
