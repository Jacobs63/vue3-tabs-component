import type { ExpiringStorage as ExpiringStorageInterface } from "./types"

class ExpiringStorage implements ExpiringStorageInterface {
  get(key: string): string | null {
    const cachedValue: string | null = localStorage.getItem(key)

    if (cachedValue === null) {
      return null
    }

    const cached = JSON.parse(cachedValue)

    if (!cached) {
      return null
    }

    const expires: Date = new Date(cached.expires)

    if (expires < new Date()) {
      localStorage.removeItem(key)
      return null
    }

    return cached.value
  }

  set(key: string, value: string, lifeTimeInMinutes: number): void {
    const currentTime: number = new Date().getTime()

    const expires: Date = new Date(currentTime + lifeTimeInMinutes * 60000)

    localStorage.setItem(key, JSON.stringify({ value, expires }))
  }
}

export default new ExpiringStorage
