import { PawPrint, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Pet, Application, DashboardStats } from "@/types/petsType"
import { getStatusColor, getStatusIcon } from "@/utils/status-helpers"

interface DashboardProps {
  pets: Pet[]
  applications: Application[]
  stats: DashboardStats
}

export function Dashboard({ pets, applications, stats }: DashboardProps) {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="transform transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Welcome back! Here's what's happening with your pet adoption center.
        </p>
      </div>

      {/* Stats Cards - Removed hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Pets</CardTitle>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalPets}</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              <span className="text-green-600 font-medium">{stats.availablePets} available</span> for adoption
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Applications</CardTitle>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              <span className="text-yellow-600 font-medium">{stats.pendingApplications} pending</span> review
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Adoptions</CardTitle>
            <div className="text-xl sm:text-2xl font-bold text-gray-900">{stats.pendingAdoptions}</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              <span className="text-blue-600 font-medium">{stats.approvedApplications} approved</span> this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Removed hover effects */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <PawPrint className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              Recent Pets Added
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pets.slice(0, 3).map((pet, index) => (
              <div
                key={pet.id}
                className="flex items-center space-x-3 sm:space-x-4 p-2 rounded-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                  <AvatarImage src={pet.image || "/placeholder.svg"} alt={pet.name} />
                  <AvatarFallback className="text-xs sm:text-sm">{pet.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{pet.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {pet.breed} • {pet.age}
                  </p>
                </div>
                <Badge className={`${getStatusColor(pet.status)} text-xs`}>{pet.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.slice(0, 3).map((app, index) => {
              const StatusIcon = getStatusIcon(app.status)
              return (
                <div
                  key={app.id}
                  className="flex items-center space-x-3 sm:space-x-4 p-2 rounded-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                    <AvatarImage src={app.applicantImage || "/placeholder.svg"} alt={app.applicantName} />
                    <AvatarFallback className="text-xs sm:text-sm">{app.applicantName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{app.applicantName}</p>
                    <p className="text-xs sm:text-sm text-gray-500">Applied for {app.petName}</p>
                  </div>
                  <Badge className={`${getStatusColor(app.status)} text-xs flex items-center gap-1`}>
                    {StatusIcon && <StatusIcon className="h-3 w-3" />}
                    <span>{app.status}</span>
                  </Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
