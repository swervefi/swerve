export interface Token {
  symbol?: string
  decimals?: number
}

export interface DAI {
  symbol: 'DAI'
  decimals: 18
}

export interface USDC extends Token {
  symbol: 'USDC'
  decimals: 18
}

export type StableToken = DAI | USDC
