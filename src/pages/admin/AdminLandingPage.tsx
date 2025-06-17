import { useState } from "react"
import { Home, Users, FileText, Settings, PawPrint } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { NavigationItem, DashboardStats, Pet } from "@/types/petsType"
import { samplePets } from "@/pets/pets_data/pets"
import { sampleApplications } from "@/pets/pets_data/application"
import { Dashboard } from "@/pets/components/PetsDashboard"
import { BrowsePets } from "@/pets/components/PetsBrowse"
import { Applications } from "@/pets/components/PetsApplication"
import { Adopters } from "@/pets/components/PetsAdopter"
import { Reports } from "@/pets/components/PetsReport"
import { Settings as SettingsComponent } from "@/pets/components/PetsSettings"

// Navigation items
const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "pets", label: "Browse Pets", icon: PawPrint },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "adopters", label: "Adopters", icon: Users },
  { id: "reports", label: "Reports", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function PetAdoptionAdmin() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [pets, setPets] = useState<Pet[]>(samplePets)

  const handleAddPet = (newPetData: Omit<Pet, "id">) => {
    const newPet: Pet = {
      ...newPetData,
      id: (pets.length + 1).toString(),
    }
    setPets((prev) => [newPet, ...prev])
  }

  // Dashboard stats
  interface Application {
    status: "pending" | "approved" | "rejected";
    // other application properties would be here
  }

  const stats: DashboardStats = {
    totalPets: pets.length,
    availablePets: pets.filter((p: Pet) => p.status === "available").length,
    pendingAdoptions: pets.filter((p: Pet) => p.status === "pending").length,
    totalApplications: sampleApplications.length,
    pendingApplications: sampleApplications.filter((a: Application) => a.status === "pending").length,
    approvedApplications: sampleApplications.filter((a: Application) => a.status === "approved").length,
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard pets={pets} applications={sampleApplications} stats={stats} />
      case "pets":
        return <BrowsePets pets={pets} onAddPet={handleAddPet} />
      case "applications":
        return <Applications applications={sampleApplications} />
      case "adopters":
        return <Adopters />
      case "reports":
        return <Reports />
      case "settings":
        return <SettingsComponent />
      default:
        return <Dashboard pets={pets} applications={sampleApplications} stats={stats} />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2 rounded-lg transform transition-all duration-300 hover:scale-110">
                <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-base sm:text-lg font-semibold text-gray-900">PetAdopt</h1>
                <p className="text-xs text-gray-500">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto scrollbar-orange">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-2 sm:px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
                    activeSection === item.id
                      ? "bg-orange-50 text-orange-700 border-r-2 border-orange-500 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 px-3 sm:px-4 py-3 sm:py-4 border-t border-gray-200">
            <div className="flex items-center transform transition-all duration-300 hover:scale-105">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                <AvatarFallback className="text-xs sm:text-sm">AD</AvatarFallback>
              </Avatar>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@petadopt.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-2 flex items-center">
                <div className="bg-gradient-to-r from-orange-400 to-pink-400 p-2 rounded-lg">
                  <PawPrint className="h-5 w-5 text-white" />
                </div>
                <h1 className="ml-2 text-lg font-semibold text-gray-900">PetAdopt</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto custom-scroll">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
