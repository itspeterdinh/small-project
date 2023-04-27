export const GATEWAYS = {
  MOON: 'moon',
  EARTH: 'earth',
  VENUS: 'venus',
}

const env = process.browser ? process.env : JSON.parse(process.env)
export const { NODE_ENV, WEB_URL, GATEWAY_URL, WEBSOCKET_URL, SENTRY_DSN_URL } = env

export const MASTER_ORG_SLUG = 'amo'
export const WONDERRATES_ORG_SLUG = 'wonderrates'

export const DEV = NODE_ENV === 'development'
export const PROD = NODE_ENV === 'production'
export const TEST = NODE_ENV === 'test'
