import numeral from 'numeral';

export const mmss = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = seconds % 60;

  const formattedSeconds = numeral(remainingSeconds).format('00');

  const formattedMinutes = numeral(minutes).format('00');

  return `${formattedMinutes}:${formattedSeconds}`;
};
