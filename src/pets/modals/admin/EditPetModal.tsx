import type React from "react"
import { useState, useEffect } from "react"
import { Upload, X, Heart, PawPrint, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import type { Pet } from "@/types/petsType"

interface EditPetModalProps {
  pet: Pet
  children: React.ReactNode
  onEditPet?: (petId: string, updatedPet: Partial<Pet>) => void
}

export function EditPetModal({ pet, children, onEditPet }: EditPetModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [formData, setFormData] = useState({
    name: pet.name,
    species: pet.species,
    breed: pet.breed,
    age: pet.age,
    gender: pet.gender,
    size: pet.size,
    color: pet.color || "",
    description: pet.description,
    location: pet.location,
    vaccinated: pet.vaccinated,
    spayed: pet.spayed,
    photos: [pet.image] as string[],
  })

  // Reset form data when pet changes or modal opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: pet.name,
        species: pet.species,
        breed: pet.breed,
        age: pet.age,
        gender: pet.gender,
        size: pet.size,
        color: pet.color || "",
        description: pet.description,
        location: pet.location,
        vaccinated: pet.vaccinated,
        spayed: pet.spayed,
        photos: [pet.image],
      })
    }
  }, [open, pet])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadingPhotos(true)

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, result],
        }))
      }
      reader.readAsDataURL(file)
    })

    setTimeout(() => setUploadingPhotos(false), 1000)
  }

  const removePhoto = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const updatedPet: Partial<Pet> = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: formData.age,
      gender: formData.gender,
      size: formData.size,
      color: formData.color,
      description: formData.description,
      image: formData.photos[0] || pet.image,
      location: formData.location,
      vaccinated: formData.vaccinated,
      spayed: formData.spayed,
    }

    setTimeout(() => {
      onEditPet?.(pet.id, updatedPet)

      toast({
        variant: "info",
        title: "Pet Updated Successfully! ✏️",
        description: `${formData.name}'s information has been updated and saved to the system.`,
      })

      setIsSubmitting(false)
      setOpen(false)
    }, 1500)
  }

  const isFormValid =
    formData.name &&
    formData.species &&
    formData.breed &&
    formData.age &&
    formData.gender &&
    formData.size &&
    formData.location

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[98vw] max-w-[98vw] sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[98vh] max-h-[98vh] sm:h-auto sm:max-h-[95vh] overflow-hidden flex flex-col p-0">
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center">
              Edit Pet Information
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center text-sm sm:text-base mt-1">
              Update {pet.name}'s details and information
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Basic Information Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <PawPrint className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name" className="text-sm font-medium">
                      Pet Name *
                    </Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter pet's name"
                      required
                      className="rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-breed" className="text-sm font-medium">
                      Breed *
                    </Label>
                    <Input
                      id="edit-breed"
                      value={formData.breed}
                      onChange={(e) => handleInputChange("breed", e.target.value)}
                      placeholder="e.g., Golden Retriever"
                      required
                      className="rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-species" className="text-sm font-medium">
                      Pet Type *
                    </Label>
                    <Select value={formData.species} onValueChange={(value) => handleInputChange("species", value)}>
                      <SelectTrigger id="edit-species" className="rounded-xl h-10 sm:h-11">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Dog">🐕 Dog</SelectItem>
                        <SelectItem value="Cat">🐱 Cat</SelectItem>
                        <SelectItem value="Rabbit">🐰 Rabbit</SelectItem>
                        <SelectItem value="Bird">🐦 Bird</SelectItem>
                        <SelectItem value="Other">🐾 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-age" className="text-sm font-medium">
                      Age Category *
                    </Label>
                    <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                      <SelectTrigger id="edit-age" className="rounded-xl h-10 sm:h-11">
                        <SelectValue placeholder="Select age" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Puppy/Kitten">🐶 Puppy/Kitten</SelectItem>
                        <SelectItem value="Young">🐕 Young</SelectItem>
                        <SelectItem value="Adult">🦮 Adult</SelectItem>
                        <SelectItem value="Senior">🐕‍🦺 Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <Label htmlFor="edit-gender" className="text-sm font-medium">
                      Gender *
                    </Label>
                    <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                      <SelectTrigger id="edit-gender" className="rounded-xl h-10 sm:h-11">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-size" className="text-sm font-medium">
                      Size *
                    </Label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                      <SelectTrigger id="edit-size" className="rounded-xl h-10 sm:h-11">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                        <SelectItem value="Extra Large">Extra Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-color" className="text-sm font-medium">
                      Color
                    </Label>
                    <Input
                      id="edit-color"
                      value={formData.color}
                      onChange={(e) => handleInputChange("color", e.target.value)}
                      placeholder="Pet's color"
                      className="rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="edit-location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City or shelter location"
                    required
                    className="rounded-xl h-10 sm:h-11 text-sm sm:text-base"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pet Details Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" />
                  Pet Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-description" className="text-sm font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="edit-description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Tell us about this pet's personality..."
                    required
                    className="rounded-xl min-h-[100px] sm:min-h-[120px] resize-none text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Pet Characteristics</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-vaccinated"
                        checked={formData.vaccinated}
                        onCheckedChange={(checked) => handleInputChange("vaccinated", checked as boolean)}
                      />
                      <Label htmlFor="edit-vaccinated" className="text-sm">
                        Vaccinated
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-spayed"
                        checked={formData.spayed}
                        onCheckedChange={(checked) => handleInputChange("spayed", checked as boolean)}
                      />
                      <Label htmlFor="edit-spayed" className="text-sm">
                        Spayed/Neutered
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos Card */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="flex items-center gap-2 text-sm sm:text-base lg:text-lg">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 sm:p-6 text-center hover:border-green-300 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="edit-photo-upload"
                  />
                  <label htmlFor="edit-photo-upload" className="cursor-pointer">
                    <Upload className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base">Click to upload new photos</p>
                    <p className="text-xs sm:text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                  </label>
                </div>

                {uploadingPhotos && (
                  <div className="text-center py-3 sm:py-4">
                    <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-500 mx-auto" />
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">Uploading...</p>
                  </div>
                )}

                {formData.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {formData.photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Pet photo ${index + 1}`}
                          className="w-full aspect-square object-cover rounded-xl"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-1 right-1 sm:top-2 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 sm:w-8 sm:h-8"
                          onClick={() => removePhoto(index)}
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </form>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-xl h-10 sm:h-11 order-2 sm:order-1 text-sm sm:text-base"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 rounded-xl h-10 sm:h-11 order-1 sm:order-2 text-sm sm:text-base"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 mr-2 border-b-2 border-white" />
                  <span className="hidden xs:inline">Updating Pet...</span>
                  <span className="xs:hidden">Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  <span className="hidden xs:inline">Update Pet Information</span>
                  <span className="xs:hidden">Update Pet</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
