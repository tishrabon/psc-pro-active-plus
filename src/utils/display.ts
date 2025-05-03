// to show time in nice hour:mins format yall
export const timeHrMin = (time: number): string => {
  const hour = (Math.floor(time/60)).toString().padStart(2, '0');
  const mins = (Math.floor(time%60)).toString().padStart(2, '0');

  return (`${hour}:${mins}`);
}

export const foucsVsBreak = (formatt: string, focusName: string, breakName: string): string => {

  const [focus, rest] = formatt.split("/").map(Number);
  return `${focusName}: ${focus} min & ${breakName}: ${rest} min`;
}
