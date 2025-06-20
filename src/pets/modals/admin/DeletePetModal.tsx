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
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[85vh] sm:max-h-[90vh] overflow-hidden flex flex-col p-0">
        <div className="flex-shrink-0 p-4 sm:p-6 border-b border-red-200 bg-red-50">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-lg sm:text-xl md:text-2xl font-bold text-red-600">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <span>Delete Pet</span>
            </DialogTitle>
            <DialogDescription className="text-red-700 text-center text-sm sm:text-base mt-2">
              This action cannot be undone. This will permanently remove the pet from the adoption center.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100 hover:scrollbar-thumb-red-400 p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6 max-w-2xl mx-auto">
            {/* Pet Information Card */}
            <Card className="border-red-200 bg-red-50 shadow-sm">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg object-cover shadow-sm"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <h3 className="font-bold text-base sm:text-lg md:text-xl text-gray-900 mb-1 sm:mb-2">{pet.name}</h3>
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                        {pet.breed} • {pet.age} • {pet.gender}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">📍 {pet.location}</p>
                      <p className="text-xs text-gray-500">Status: {pet.status}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Warning Message */}
            <Card className="bg-yellow-50 border-yellow-200 shadow-sm">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm sm:text-base text-yellow-800 mb-2">⚠️ Critical Warning</h4>
                    <div className="space-y-2 text-xs sm:text-sm text-yellow-700 leading-relaxed">
                      <p>
                        Deleting <strong>{pet.name}</strong> will permanently remove:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-2 text-xs sm:text-sm">
                        <li>All pet information and photos</li>
                        <li>Associated adoption applications</li>
                        <li>Medical records and history</li>
                        <li>All related data from the system</li>
                      </ul>
                      <p className="font-semibold text-yellow-800 mt-2 text-xs sm:text-sm">
                        This action cannot be reversed!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Confirmation Input */}
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-3 sm:p-4 lg:p-5">
                <div className="space-y-3">
                  <div className="text-center sm:text-left">
                    <Label htmlFor="confirmation" className="text-sm sm:text-base font-bold text-gray-900 block mb-2">
                      Type the pet's name to confirm deletion:
                    </Label>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      Please type{" "}
                      <span className="font-bold text-red-600 bg-red-100 px-1 py-0.5 rounded break-all">
                        "{pet.name}"
                      </span>{" "}
                      exactly as shown
                    </p>
                  </div>
                  <Input
                    id="confirmation"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    placeholder={`Type "${pet.name}" to confirm`}
                    className="border-2 border-red-200 focus:border-red-500 focus:ring-red-500 h-10 sm:h-12 text-sm sm:text-base font-medium text-center rounded-lg"
                    autoComplete="off"
                  />
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isConfirmationValid ? "bg-green-500" : "bg-red-500"}`}
                    />
                    <span
                      className={`text-xs sm:text-sm font-medium ${isConfirmationValid ? "text-green-600" : "text-red-600"}`}
                    >
                      {isConfirmationValid ? "✓ Name matches" : "✗ Name does not match"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixed Footer with Actions */}
        <div className="flex-shrink-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false)
                setConfirmationText("")
              }}
              className="flex-1 order-2 sm:order-1 h-10 sm:h-12 text-sm sm:text-base font-medium rounded-lg border-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={!isConfirmationValid || isDeleting}
              variant="destructive"
              className="flex-1 order-1 sm:order-2 h-10 sm:h-12 text-sm sm:text-base font-medium rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-gray-400"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 mr-2 border-b-2 border-white" />
                  <span className="hidden xs:inline">Deleting Pet...</span>
                  <span className="xs:hidden">Deleting...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="hidden xs:inline">Delete Pet Permanently</span>
                  <span className="xs:hidden">Delete Pet</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
