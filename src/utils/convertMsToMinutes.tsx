const convertMsToMinutes = (millis: number): string | number => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds}`;
};

export default convertMsToMinutes;
