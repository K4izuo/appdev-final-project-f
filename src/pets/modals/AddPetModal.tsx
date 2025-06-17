import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Upload, X, Heart, PawPrint } from "lucide-react"
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
import type { Pet } from "@/types/petsType"

interface AddPetModalProps {
  onAddPet?: (pet: Omit<Pet, "id">) => void
}

export function AddPetModal({ onAddPet }: AddPetModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingPhotos, setUploadingPhotos] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    size: "",
    color: "",
    description: "",
    location: "",
    vaccinated: false,
    spayed: false,
    good_with_kids: false,
    good_with_pets: false,
    energy_level: "",
    photos: [] as string[],
  })

  // Handle focus management when modal opens
  useEffect(() => {
    if (open) {
      // Small delay to ensure modal is fully rendered
      const timer = setTimeout(() => {
        // Remove focus from any input that might have been auto-focused
        const activeElement = document.activeElement as HTMLElement
        if (activeElement && activeElement.tagName === "INPUT") {
          activeElement.blur()
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [open])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadingPhotos(true)

    // Simulate upload process
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

    const newPet: Omit<Pet, "id"> = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      age: formData.age,
      gender: formData.gender,
      size: formData.size,
      color: formData.color,
      description: formData.description,
      image: formData.photos[0] || "/placeholder.svg?height=300&width=300",
      status: "available" as const,
      location: formData.location,
      dateAdded: new Date().toISOString().split("T")[0],
      vaccinated: formData.vaccinated,
      spayed: formData.spayed,
    }

    setTimeout(() => {
      onAddPet?.(newPet)
      setFormData({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: "",
        size: "",
        color: "",
        description: "",
        location: "",
        vaccinated: false,
        spayed: false,
        good_with_kids: false,
        good_with_pets: false,
        energy_level: "",
        photos: [],
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
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white w-full sm:w-auto shadow-lg hover:shadow-xl rounded-xl">
          <Plus className="h-4 w-4 mr-2" />
          Add New Pet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 text-center">Add New Pet</DialogTitle>
          <DialogDescription className="text-gray-600 text-center !mt-2">
            Help a pet find their forever home
          </DialogDescription>
        </DialogHeader>

        {/* Hidden focusable element to prevent auto-focus on inputs */}
        <div tabIndex={0} className="sr-only" aria-hidden="true" />

        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          {/* Basic Information Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PawPrint className="w-5 h-5 text-blue-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name-modal">Pet Name *</Label>
                  <Input
                    id="name-modal"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter pet's name"
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breed-modal">Breed *</Label>
                  <Input
                    id="breed-modal"
                    value={formData.breed}
                    onChange={(e) => handleInputChange("breed", e.target.value)}
                    placeholder="e.g., Golden Retriever"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="species-modal">Pet Type *</Label>
                  <Select value={formData.species} onValueChange={(value) => handleInputChange("species", value)}>
                    <SelectTrigger id="species-modal" className="rounded-xl">
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
                  <Label htmlFor="age-modal">Age Category *</Label>
                  <Select value={formData.age} onValueChange={(value) => handleInputChange("age", value)}>
                    <SelectTrigger id="age-modal" className="rounded-xl">
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
                <div className="space-y-2">
                  <Label htmlFor="gender-modal">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                    <SelectTrigger id="gender-modal" className="rounded-xl">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size-modal">Size *</Label>
                  <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                    <SelectTrigger id="size-modal" className="rounded-xl">
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
                  <Label htmlFor="energy-modal">Energy Level</Label>
                  <Select
                    value={formData.energy_level}
                    onValueChange={(value) => handleInputChange("energy_level", value)}
                  >
                    <SelectTrigger id="energy-modal" className="rounded-xl">
                      <SelectValue placeholder="Select energy level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">😴 Low Energy</SelectItem>
                      <SelectItem value="Moderate">🚶 Moderate</SelectItem>
                      <SelectItem value="High">🏃 High Energy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="color-modal">Color</Label>
                  <Input
                    id="color-modal"
                    value={formData.color}
                    onChange={(e) => handleInputChange("color", e.target.value)}
                    placeholder="Pet's color"
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location-modal">Location *</Label>
                  <Input
                    id="location-modal"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City or shelter location"
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pet Details Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-500" />
                Pet Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="desc-modal">Description *</Label>
                <Textarea
                  id="desc-modal"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Tell us about this pet's personality..."
                  required
                  className="rounded-xl min-h-[120px] custom-scroll"
                />
              </div>

              <div className="space-y-4">
                <Label>Pet Characteristics</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vaccinated-modal"
                      checked={formData.vaccinated}
                      onCheckedChange={(checked) => handleInputChange("vaccinated", checked as boolean)}
                    />
                    <Label htmlFor="vaccinated-modal">Vaccinated</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="spayed-modal"
                      checked={formData.spayed}
                      onCheckedChange={(checked) => handleInputChange("spayed", checked as boolean)}
                    />
                    <Label htmlFor="spayed-modal">Spayed/Neutered</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="kids-modal"
                      checked={formData.good_with_kids}
                      onCheckedChange={(checked) => handleInputChange("good_with_kids", checked as boolean)}
                    />
                    <Label htmlFor="kids-modal">Good with children</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pets-modal"
                      checked={formData.good_with_pets}
                      onCheckedChange={(checked) => handleInputChange("good_with_pets", checked as boolean)}
                    />
                    <Label htmlFor="pets-modal">Good with other pets</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos Card */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-500" />
                Photos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-green-300 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload-modal"
                />
                <label htmlFor="photo-upload-modal" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Click to upload photos</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {uploadingPhotos && (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto" />
                  <p className="text-gray-600 mt-2">Uploading...</p>
                </div>
              )}

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8"
                        onClick={() => removePhoto(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 mr-2 border-b-2 border-white" />
                  Adding Pet...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Pet to Center
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
