export interface AppConfig {
  port: number
  fallbackLanguage: string
}

export interface DbConfig {
  host: string
  name: string
  password: string
  port: number
  user: string
}

export interface JwtProps {
  secret: string
  expires: string
}

export interface RedisConfig {
  host: string
  port: number
  ttl: number
}
