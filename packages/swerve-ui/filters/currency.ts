/**
 * Currency filter
 *
 * TODO: BigInt implementation
 *
 * @param x
 */
export default function currency(x: string | number): string {
  return Number(x).toFixed(2).toString()
}
