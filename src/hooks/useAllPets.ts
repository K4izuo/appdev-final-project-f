import { useState, useEffect } from "react"
import type { Pet } from "@/types/petsType"

export const useAllPets = () => {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllPets = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/all-pets", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()

      if (!Array.isArray(data.data)) {
        throw new Error("Expected pets array under 'data'")
      }
      setPets(data.data) // Ensure your Laravel controller returns JSON array
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllPets()
  }, [])

  return { pets, loading, error, refreshPets: fetchAllPets }
}
