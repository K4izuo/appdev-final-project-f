import { useState } from "react"
import { Heart, User, Search, MapPin, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Application, NavigationItem } from "@/types/petsType"
// import { samplePets } from "@/pets/pets_data/pets"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPetDetailModal } from "@/pets/modals/UserPetModal"
import { Toaster } from "@/components/ui/toaster"
import { useAllPets } from "@/hooks/useAllPets"

// User navigation items
const userNavigationItems: NavigationItem[] = [
  { id: "browse", label: "Browse Pets", icon: Search },
  { id: "applications", label: "My Applications", icon: Heart },
  { id: "profile", label: "Profile", icon: User },
]

// Sample user applications
const userApplications: Application[] = [
  {
    id: "1",
    petId: "1",
    petName: "Luna",
    applicantName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, San Francisco, CA 94102",
    experience: "I have had dogs for over 5 years and have a fenced backyard.",
    reason: "Looking for a loyal companion for my family.",
    status: "pending",
    dateSubmitted: "2024-01-16",
    applicantImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    petId: "4",
    petName: "Bella",
    applicantName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, San Francisco, CA 94102",
    experience: "First-time cat owner but have researched extensively about cat care.",
    reason: "Want to provide a loving home for a cat in need.",
    status: "approved",
    dateSubmitted: "2024-01-10",
    applicantImage: "/placeholder.svg?height=40&width=40",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "adopted":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function UserDashboard() {

  const { pets } = useAllPets()
  const [activeSection, setActiveSection] = useState("browse")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("available")

  // Filter pets for user (only available pets)
  const availablePets = pets.filter((pet) => pet.status === "available")
  const filteredPets = availablePets.filter((pet) => {
    const matchesSearch =
      pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.species.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "available" || pet.species.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const MyApplications = () => (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Track your adoption applications</p>
      </div>

      <div className="space-y-4">
        {userApplications.map((app, index) => (
          <Card
            key={app.id}
            className="animate-in fade-in-0 slide-in-from-left-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="h-8 w-8 text-blue-500" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">Application for {app.petName}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span>Applied on {new Date(app.dateSubmitted).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Badge className={`${getStatusColor(app.status)} text-sm px-3 py-1`}>
                    {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const Profile = () => (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage your account preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" className="border-blue-200 focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@email.com"
                className="border-blue-200 focus:border-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" defaultValue="(555) 123-4567" className="border-blue-200 focus:border-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" defaultValue="123 Main Street" className="border-blue-200 focus:border-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue="San Francisco" className="border-blue-200 focus:border-blue-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" defaultValue="94102" className="border-blue-200 focus:border-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email notifications for application updates</Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="new-pets">Notify me about new pets</Label>
            <Switch id="new-pets" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "applications":
        return <MyApplications />
      case "profile":
        return <Profile />
      default:
        return null
    }
  }

  return (
    <div className="flex h-screen bg-blue-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-blue-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-blue-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">john.doe@email.com</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {userNavigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 px-4 py-4 border-t border-blue-200">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-all duration-300"
              onClick={() => {
                // Add your logout logic here
                console.log("Logout clicked")
                // Example: redirect to login page or call logout API
              }}
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-blue-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-2 flex items-center">
                <div className="bg-gradient-to-r from-blue-400 to-indigo-500 p-2 rounded-lg">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <h1 className="ml-2 text-lg font-semibold text-gray-900">PetAdopt</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto custom-scroll">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Browse Pets Section - Rendered directly to avoid re-rendering */}
            {activeSection === "browse" && (
              <div className="space-y-6 animate-in fade-in-0 duration-500">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Find Your Perfect Pet</h1>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                      Discover amazing pets looking for their forever home ({filteredPets.length} pets available)
                    </p>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search pets by name, breed, or species..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 shadow-sm border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full sm:w-48 shadow-sm border-blue-200 focus:border-blue-500">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">All Available</SelectItem>
                      <SelectItem value="Dog">Dogs Only</SelectItem>
                      <SelectItem value="Cat">Cats Only</SelectItem>
                      <SelectItem value="Rabbit">Rabbits Only</SelectItem>
                      <SelectItem value="Bird">Birds Only</SelectItem>
                      <SelectItem value="Other">Other Pets</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Pets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPets.map((pet, index) => (
                    <UserPetDetailModal key={pet.id} pet={pet}>
                      <Card
                        className="group overflow-hidden transform transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl animate-in fade-in-0 slide-in-from-bottom-4 bg-white border-0 shadow-lg hover:shadow-blue-100 cursor-pointer"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="aspect-square relative overflow-hidden">
                          <img
                            src={pet.image || "/placeholder.svg"}
                            alt={pet.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Badge className="absolute top-3 right-3 bg-green-100 text-green-800 border-green-200 shadow-lg">
                            Available
                          </Badge>
                          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <Heart className="h-6 w-6 text-white drop-shadow-lg hover:text-red-400 cursor-pointer transition-colors duration-300" />
                          </div>
                        </div>

                        <CardContent className="p-5">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
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
                              <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-blue-500" />
                              <span className="truncate">{pet.location}</span>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{pet.description}</p>

                            <div className="flex gap-2 pt-2 flex-wrap">
                              {pet.vaccinated && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-50 text-green-700 border-green-200"
                                >
                                  ✓ Vaccinated
                                </Badge>
                              )}
                              {pet.spayed && (
                                <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                  ✓ Spayed/Neutered
                                </Badge>
                              )}
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-xs text-gray-400 text-center">Click to view details</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </UserPetDetailModal>
                  ))}
                </div>
              </div>
            )}

            {/* Other sections */}
            {renderContent()}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
