export function utcDateNow() {
  return new Date(Date.now()).toISOString() as unknown as Date;
}
