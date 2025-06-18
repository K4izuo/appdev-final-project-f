import type React from "react"
import { useState } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import type { Pet } from "@/types/petsType"

interface DeletePetModalProps {
  pet: Pet
  children: React.ReactNode
  onDeletePet?: (petId: string) => void
}

export function DeletePetModal({ pet, children, onDeletePet }: DeletePetModalProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationText, setConfirmationText] = useState("")

  const handleDelete = () => {
    if (confirmationText !== pet.name) {
      return
    }

    setIsDeleting(true)

    setTimeout(() => {
      onDeletePet?.(pet.id)

      toast({
        variant: "destructive",
        title: "Pet Removed",
        description: `${pet.name} has been permanently removed from the adoption center.`,
      })

      setIsDeleting(false)
      setOpen(false)
      setConfirmationText("")
    }, 1500)
  }

  const isConfirmationValid = confirmationText === pet.name

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl font-bold text-red-600">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
            Delete Pet
          </DialogTitle>
          <DialogDescription className="text-gray-600 !mt-2">
            This action cannot be undone. This will permanently remove the pet from the adoption center.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 mt-4">
          {/* Pet Information Card */}
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img
                  src={pet.image || "/placeholder.svg"}
                  alt={pet.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base sm:text-lg text-gray-900 truncate">{pet.name}</h3>
                  <p className="text-sm text-gray-600">
                    {pet.breed} • {pet.age} • {pet.gender}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">{pet.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Warning</p>
                <p className="text-yellow-700">
                  Deleting this pet will also remove all associated applications and data. This action is irreversible.
                </p>
              </div>
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmation" className="text-sm font-medium">
              To confirm deletion, type <span className="font-bold text-red-600">"{pet.name}"</span> below:
            </Label>
            <Input
              id="confirmation"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              placeholder={`Type "${pet.name}" to confirm`}
              className="border-red-200 focus:border-red-500 focus:ring-red-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                setConfirmationText("")
              }}
              className="flex-1 order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={!isConfirmationValid || isDeleting}
              variant="destructive"
              className="flex-1 order-1 sm:order-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 mr-2 border-b-2 border-white" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Pet Permanently
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
