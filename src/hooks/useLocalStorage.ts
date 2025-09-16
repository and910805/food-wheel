import { useEffect, useState } from "react"

export function useLocalStorage<T>(key: string, initialValue: T, reset = false) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (reset || !raw) {
        localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
      return JSON.parse(raw) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {}
  }, [key, value])

  return [value, setValue] as const
}