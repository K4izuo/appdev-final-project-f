import { Users } from "lucide-react"

export function Adopters() {
  return (
    <div className="text-center py-8 sm:py-12 animate-in fade-in-0 duration-500">
      <div className="transform transition-all duration-300 hover:scale-110">
        <Users className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Adopters Management</h2>
      <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
        Manage adopter profiles and history. This section will help you track successful adoptions and maintain
        relationships with adopters.
      </p>
    </div>
  )
}
