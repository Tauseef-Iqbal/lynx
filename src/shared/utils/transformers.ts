export function TransformToBoolean(value: any): boolean | any {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return value;
}
