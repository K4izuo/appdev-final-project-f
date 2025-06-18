import type React from "react"
import { MapPin, Calendar, Stethoscope, Info, Edit, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Pet } from "@/types/petsType"
import { EditPetModal } from "@/pets/modals/admin/EditPetModal"
import { DeletePetModal } from "@/pets/modals/admin/DeletePetModal"

interface AdminPetDetailModalProps {
  pet: Pet
  children: React.ReactNode
  onEditPet?: (petId: string, updatedPet: Partial<Pet>) => void
  onDeletePet?: (petId: string) => void
}

export function AdminPetDetailModal({ pet, children, onEditPet, onDeletePet }: AdminPetDetailModalProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "adopted":
        return "bg-blue-50 text-blue-700 border-blue-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getStatusDot = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500"
      case "pending":
        return "bg-amber-500"
      case "adopted":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-hidden p-0 gap-0 bg-white">
        <div className="flex flex-col h-full max-h-[95vh]">
          {/* Mobile/Tablet Layout - Stacked */}
          <div className="block lg:hidden">
            {/* Image Section - Mobile */}
            <div className="relative h-48 sm:h-56 md:h-64">
              <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Status Badge - Mobile */}
              <div className="absolute top-3 right-3">
                <Badge className={`${getStatusColor(pet.status)} px-2 py-1 text-xs font-medium border shadow-sm`}>
                  <div className={`w-1.5 h-1.5 ${getStatusDot(pet.status)} rounded-full mr-1.5`} />
                  {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </Badge>
              </div>

              {/* Pet ID - Mobile */}
              <div className="absolute top-3 left-3">
                <Badge
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm text-gray-700 border-white/50 shadow-sm text-xs"
                >
                  ID: {pet.id}
                </Badge>
              </div>
            </div>

            {/* Content Section - Mobile */}
            <div className="flex-1 overflow-y-auto scrollbar-thin max-h-[calc(95vh-12rem)] sm:max-h-[calc(95vh-14rem)] md:max-h-[calc(95vh-16rem)]">
              <div className="p-4 space-y-4">
                {/* Header - Mobile */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{pet.name}</h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                      <span className="text-sm truncate">{pet.location}</span>
                    </div>
                  </div>

                  {/* Actions Menu - Mobile */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-2 flex-shrink-0">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-44">
                      <EditPetModal pet={pet} onEditPet={onEditPet}>
                        <DropdownMenuItem className="text-blue-600 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Pet Details
                        </DropdownMenuItem>
                      </EditPetModal>
                      <DeletePetModal pet={pet} onDeletePet={onDeletePet}>
                        <DropdownMenuItem className="text-red-600 cursor-pointer" onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Pet
                        </DropdownMenuItem>
                      </DeletePetModal>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Status Management - Mobile */}
                <div>
                  <div className="text-xs text-gray-500 mb-2">Status Management</div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={pet.status === "available" ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${pet.status === "available" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"}`}
                    >
                      Available
                    </Button>
                    <Button
                      variant={pet.status === "pending" ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${pet.status === "pending" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"}`}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={pet.status === "adopted" ? "default" : "outline"}
                      size="sm"
                      className={`text-xs ${pet.status === "adopted" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"}`}
                    >
                      Adopted
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Pet Information - Mobile */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Info className="w-4 h-4 mr-2 text-orange-600" />
                    Pet Information
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Species</div>
                      <div className="font-semibold text-gray-900 text-sm">{pet.species}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Breed</div>
                      <div className="font-semibold text-gray-900 text-sm truncate">{pet.breed}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Age</div>
                      <div className="font-semibold text-gray-900 text-sm">{pet.age}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Gender</div>
                      <div className="font-semibold text-gray-900 text-sm">{pet.gender}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-1">Size</div>
                      <div className="font-semibold text-gray-900 text-sm">{pet.size}</div>
                    </div>
                    {pet.color && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-500 mb-1">Color</div>
                        <div className="font-semibold text-gray-900 text-sm truncate">{pet.color}</div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Health Information - Mobile */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                    <Stethoscope className="w-4 h-4 mr-2 text-green-600" />
                    Health Status
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium text-sm">Vaccinated</span>
                      <div className="flex items-center">
                        {pet.vaccinated ? (
                          <>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                            <span className="text-emerald-700 font-semibold text-sm">Complete</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                            <span className="text-red-700 font-semibold text-sm">Incomplete</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium text-sm">Spayed/Neutered</span>
                      <div className="flex items-center">
                        {pet.spayed ? (
                          <>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                            <span className="text-emerald-700 font-semibold text-sm">Yes</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                            <span className="text-red-700 font-semibold text-sm">No</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Description - Mobile */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Description</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-700 leading-relaxed text-sm">{pet.description}</p>
                  </div>
                </div>

                {/* Timeline - Mobile */}
                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                    <span className="font-semibold text-orange-900 text-sm">System Timeline</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-orange-700 text-xs">Date Added</span>
                      <span className="font-medium text-orange-900 text-xs">
                        {new Date(pet.dateAdded).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-700 text-xs">Days in System</span>
                      <span className="font-medium text-orange-900 text-xs">
                        {Math.floor((new Date().getTime() - new Date(pet.dateAdded).getTime()) / (1000 * 3600 * 24))}{" "}
                        days
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Layout - Side by Side */}
          <div className="hidden lg:flex h-full">
            {/* Left Side - Image */}
            <div className="relative w-1/2 min-h-[500px]">
              <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Status Badge - Desktop */}
              <div className="absolute top-6 right-6">
                <Badge className={`${getStatusColor(pet.status)} px-3 py-1.5 text-sm font-medium border shadow-sm`}>
                  <div className={`w-2 h-2 ${getStatusDot(pet.status)} rounded-full mr-2`} />
                  {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
                </Badge>
              </div>

              {/* Pet ID - Desktop */}
              <div className="absolute top-6 left-6">
                <Badge
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm text-gray-700 border-white/50 shadow-sm"
                >
                  ID: {pet.id}
                </Badge>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="w-1/2 flex flex-col">
              <div className="flex-1 overflow-y-auto scrollbar-thin">
                {/* Header - Desktop */}
                <div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 truncate">{pet.name}</h1>
                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{pet.location}</span>
                      </div>
                    </div>

                    {/* Actions Menu - Desktop */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="ml-4">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <EditPetModal pet={pet} onEditPet={onEditPet}>
                          <DropdownMenuItem
                            className="text-blue-600 cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Pet Details
                          </DropdownMenuItem>
                        </EditPetModal>
                        <DeletePetModal pet={pet} onDeletePet={onDeletePet}>
                          <DropdownMenuItem
                            className="text-red-600 cursor-pointer"
                            onSelect={(e) => e.preventDefault()}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Pet
                          </DropdownMenuItem>
                        </DeletePetModal>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Status Management - Desktop */}
                  <div className="mb-8">
                    <div className="text-sm text-gray-500 mb-3">Status Management</div>
                    <div className="flex gap-2">
                      <Button
                        variant={pet.status === "available" ? "default" : "outline"}
                        size="sm"
                        className={`${pet.status === "available" ? "bg-emerald-600 hover:bg-emerald-700" : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"}`}
                      >
                        Available
                      </Button>
                      <Button
                        variant={pet.status === "pending" ? "default" : "outline"}
                        size="sm"
                        className={`${pet.status === "pending" ? "bg-amber-600 hover:bg-amber-700" : "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-200"}`}
                      >
                        Pending
                      </Button>
                      <Button
                        variant={pet.status === "adopted" ? "default" : "outline"}
                        size="sm"
                        className={`${pet.status === "adopted" ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"}`}
                      >
                        Adopted
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Pet Information Grid - Desktop */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Info className="w-5 h-5 mr-2 text-orange-600" />
                      Pet Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Species</div>
                        <div className="font-semibold text-gray-900">{pet.species}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Breed</div>
                        <div className="font-semibold text-gray-900">{pet.breed}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Age</div>
                        <div className="font-semibold text-gray-900">{pet.age}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Gender</div>
                        <div className="font-semibold text-gray-900">{pet.gender}</div>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4">
                        <div className="text-sm text-gray-500 mb-1">Size</div>
                        <div className="font-semibold text-gray-900">{pet.size}</div>
                      </div>
                      {pet.color && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="text-sm text-gray-500 mb-1">Color</div>
                          <div className="font-semibold text-gray-900">{pet.color}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Health Information - Desktop */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                      Health Status
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-700 font-medium">Vaccinated</span>
                        <div className="flex items-center">
                          {pet.vaccinated ? (
                            <>
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                              <span className="text-emerald-700 font-semibold">Complete</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              <span className="text-red-700 font-semibold">Incomplete</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-xl">
                        <span className="text-gray-700 font-medium">Spayed/Neutered</span>
                        <div className="flex items-center">
                          {pet.spayed ? (
                            <>
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                              <span className="text-emerald-700 font-semibold">Yes</span>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                              <span className="text-red-700 font-semibold">No</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="mb-8" />

                  {/* Description - Desktop */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                    <div className="bg-gray-50 rounded-xl p-6">
                      <p className="text-gray-700 leading-relaxed">{pet.description}</p>
                    </div>
                  </div>

                  {/* Timeline - Desktop */}
                  <div className="bg-orange-50 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                      <span className="font-semibold text-orange-900">System Timeline</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-orange-700">Date Added</span>
                        <span className="font-medium text-orange-900">
                          {new Date(pet.dateAdded).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-orange-700">Days in System</span>
                        <span className="font-medium text-orange-900">
                          {Math.floor((new Date().getTime() - new Date(pet.dateAdded).getTime()) / (1000 * 3600 * 24))}{" "}
                          days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
