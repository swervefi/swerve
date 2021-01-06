export default function isValidToken(s: string) {
  return ['dai', 'usdc', 'usdt', 'tusd'].includes(s)
}
