import type React from "react"
import { useState } from "react"
import { Heart, MapPin, Calendar, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { Pet } from "@/types/petsType"
import { toast } from "@/hooks/use-toast"

interface UserPetDetailModalProps {
  pet: Pet
  children: React.ReactNode
}

export function UserPetDetailModal({ pet, children }: UserPetDetailModalProps) {
  const [isAdopting, setIsAdopting] = useState(false)

  const handleAdoptNow = () => {
    setIsAdopting(true)
    setTimeout(() => {
      setIsAdopting(false)
      toast({
        variant: "success",
        title: "Adoption Application Submitted! 🎉",
        description: `Your application to adopt ${pet.name} has been submitted successfully. We'll contact you within 24-48 hours to discuss next steps.`,
      })
    }, 2000)
  }

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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-hidden p-0 gap-0 bg-white">
        <div className="flex flex-col lg:flex-row h-full max-h-[95vh]">
          {/* Left Side - Image */}
          <div className="relative lg:w-1/2 h-64 lg:h-auto min-h-[400px]">
            <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Status Badge */}
            <div className="absolute top-6 right-6">
              <Badge className={`${getStatusColor(pet.status)} px-3 py-1.5 text-sm font-medium border shadow-sm`}>
                {pet.status === "available" && <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />}
                {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
              </Badge>
            </div>

            {/* Favorite Button */}
            <button className="absolute top-6 left-6 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group">
              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors duration-200" />
            </button>
          </div>

          {/* Right Side - Content */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex-1 overflow-y-auto scrollbar-thin">
              {/* Header */}
              <div className="p-8 pb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{pet.name}</h1>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{pet.location}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
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
                </div>

                <Separator className="mb-8" />

                {/* Health Information */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                    Health & Care
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Vaccinated</span>
                      <div className="flex items-center">
                        {pet.vaccinated ? (
                          <>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                            <span className="text-emerald-700 font-medium">Yes</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                            <span className="text-gray-500">No</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600">Spayed/Neutered</span>
                      <div className="flex items-center">
                        {pet.spayed ? (
                          <>
                            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
                            <span className="text-emerald-700 font-medium">Yes</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-2" />
                            <span className="text-gray-500">No</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* About Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    About {pet.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{pet.description}</p>
                </div>

                {/* Additional Info */}
                <div className="bg-blue-50 rounded-xl p-6 mb-8">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                    <span className="font-medium text-blue-900">Added to our center</span>
                  </div>
                  <p className="text-blue-700">
                    {new Date(pet.dateAdded).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    {Math.floor((new Date().getTime() - new Date(pet.dateAdded).getTime()) / (1000 * 3600 * 24))} days
                    ago
                  </p>
                </div>
              </div>
            </div>

            {/* Footer - Adopt Button */}
            {pet.status === "available" && (
              <div className="p-8 pt-0">
                <Button
                  onClick={handleAdoptNow}
                  disabled={isAdopting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isAdopting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 mr-3 border-b-2 border-white" />
                      Processing Application...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Heart className="w-5 h-5 mr-3" />
                      Adopt {pet.name}
                    </div>
                  )}
                </Button>
                <p className="text-center text-sm text-gray-500 mt-3">Start your adoption journey today</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
