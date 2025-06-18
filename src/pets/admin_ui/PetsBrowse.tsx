import { useState } from "react"
import { Heart, Search, Filter, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Pet } from "@/types/petsType"
import { getStatusColor } from "@/utils/status-helpers"
import { AddPetModal } from "@/pets/modals/admin/AddPetModal"
import { AdminPetDetailModal } from "@/pets/modals/AdminPetModal"

interface BrowsePetsProps {
  pets: Pet[]
  onAddPet?: (pet: Omit<Pet, "id">) => void
  onEditPet?: (petId: string, updatedPet: Partial<Pet>) => void
  onDeletePet?: (petId: string) => void
}

export function BrowsePets({ pets, onAddPet, onEditPet, onDeletePet }: BrowsePetsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter pets based on search and status
  const filteredPets = pets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || pet.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transform transition-all duration-300">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse Pets</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Manage all pets available for adoption ({filteredPets.length} pets)
          </p>
        </div>
        <AddPetModal onAddPet={onAddPet} />
      </div>

      {/* Search and Filter - Removed hover effects */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search pets by name, breed, or species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 shadow-sm"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48 shadow-sm">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="adopted">Adopted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Pets Grid - Keeping hover effects on pet cards as they weren't mentioned */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPets.map((pet, index) => (
          <AdminPetDetailModal key={pet.id} pet={pet} onEditPet={onEditPet} onDeletePet={onDeletePet}>
            <Card
              className="group overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 bg-white border-0 shadow-lg hover:shadow-orange-100 cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Badge
                  className={`absolute top-3 right-3 ${getStatusColor(pet.status)} transition-all duration-300 hover:scale-110 shadow-lg`}
                >
                  {pet.status}
                </Badge>
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="h-6 w-6 text-white drop-shadow-lg hover:text-red-400 cursor-pointer transition-colors duration-300" />
                </div>
              </div>

              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-orange-600 transition-colors duration-300">
                      {pet.name}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      {pet.breed} • {pet.age}
                    </p>
                    <p className="text-sm text-gray-600 capitalize">
                      {pet.gender} • {pet.size}
                    </p>
                    {pet.color && <p className="text-sm text-gray-600">Color: {pet.color}</p>}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-orange-500" />
                    <span className="truncate">{pet.location}</span>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{pet.description}</p>

                  <div className="flex gap-2 pt-2 flex-wrap">
                    {pet.vaccinated && (
                      <Badge
                        variant="outline"
                        className="text-xs transition-all duration-300 hover:scale-105 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      >
                        ✓ Vaccinated
                      </Badge>
                    )}
                    {pet.spayed && (
                      <Badge
                        variant="outline"
                        className="text-xs transition-all duration-300 hover:scale-105 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                      >
                        ✓ Spayed/Neutered
                      </Badge>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">Click to manage pet</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AdminPetDetailModal>
        ))}
      </div>

      {/* Empty State */}
      {filteredPets.length === 0 && (
        <div className="text-center py-16 animate-in fade-in-0 duration-500">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No pets found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search criteria or filters."
                : "Start by adding your first pet to the adoption center."}
            </p>
            {!searchTerm && filterStatus === "all" && <AddPetModal onAddPet={onAddPet} />}
          </div>
        </div>
      )}

      {/* Results Summary */}
      {filteredPets.length > 0 && (
        <div className="text-center py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {filteredPets.length} of {pets.length} pets
            {searchTerm && ` matching "${searchTerm}"`}
            {filterStatus !== "all" && ` with status "${filterStatus}"`}
          </p>
        </div>
      )}
    </div>
  )
}
