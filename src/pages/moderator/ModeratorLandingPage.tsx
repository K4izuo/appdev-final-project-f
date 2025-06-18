import { useState } from "react"
import { Home, FileText, UsersIcon, Settings, Shield, Eye, CheckCircle, XCircle, Phone, Mail } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Application, NavigationItem } from "@/types/petsType"
import { sampleApplications } from "@/pets/pets_data/application"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Moderator navigation items
const moderatorNavigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "users", label: "Users", icon: UsersIcon },
  { id: "settings", label: "Settings", icon: Settings },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return CheckCircle
    case "rejected":
      return XCircle
    default:
      return null
  }
}

export default function ModeratorDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const stats = {
    totalApplications: sampleApplications.length,
    pendingApplications: sampleApplications.filter((a) => a.status === "pending").length,
    approvedApplications: sampleApplications.filter((a) => a.status === "approved").length,
    rejectedApplications: sampleApplications.filter((a) => a.status === "rejected").length,
  }

  const Dashboard = () => (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Moderator Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage adoption applications and user requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{stats.totalApplications}</div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{stats.pendingApplications}</div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Approved</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{stats.approvedApplications}</div>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Rejected</CardTitle>
            <div className="text-2xl font-bold text-gray-900">{stats.rejectedApplications}</div>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-500" />
            Recent Applications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {sampleApplications.slice(0, 3).map((app, index) => {
            const StatusIcon = getStatusIcon(app.status)
            return (
              <div
                key={app.id}
                className="flex items-center space-x-4 p-2 rounded-lg"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={app.applicantImage || "/placeholder.svg"} alt={app.applicantName} />
                  <AvatarFallback>{app.applicantName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{app.applicantName}</p>
                  <p className="text-sm text-gray-500">Applied for {app.petName}</p>
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
  )

  const Applications = () => {
    const ApplicationCard = ({ app, index }: { app: Application; index: number }) => {
      const StatusIcon = getStatusIcon(app.status)

      return (
        <Card className="animate-in fade-in-0 slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-4 min-w-0 flex-1">
                <Avatar className="h-12 w-12 flex-shrink-0">
                  <AvatarImage src={app.applicantImage || "/placeholder.svg"} alt={app.applicantName} />
                  <AvatarFallback>{app.applicantName[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-lg truncate">{app.applicantName}</h3>
                  <p className="text-gray-600">
                    Applied for <span className="font-medium">{app.petName}</span>
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-500 mt-1">
                    <div className="flex items-center min-w-0">
                      <Mail className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="truncate">{app.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{app.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge className={`${getStatusColor(app.status)} text-xs flex items-center gap-1`}>
                  {StatusIcon && <StatusIcon className="h-3 w-3" />}
                  <span>{app.status}</span>
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Application Review</DialogTitle>
                      <DialogDescription>Review and manage adoption application</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">Applicant Name</Label>
                          <p className="text-sm text-gray-600">{app.applicantName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Pet Applied For</Label>
                          <p className="text-sm text-gray-600">{app.petName}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Email</Label>
                          <p className="text-sm text-gray-600 break-all">{app.email}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">Phone</Label>
                          <p className="text-sm text-gray-600">{app.phone}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Address</Label>
                        <p className="text-sm text-gray-600">{app.address}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Experience with Pets</Label>
                        <p className="text-sm text-gray-600">{app.experience}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Reason for Adoption</Label>
                        <p className="text-sm text-gray-600">{app.reason}</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 pt-4">
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            toast({
                              variant: "success",
                              title: "Application Approved! ✅",
                              description: `${app.applicantName}'s application for ${app.petName} has been approved by moderation team.`,
                            })
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Application
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            toast({
                              variant: "destructive",
                              title: "Application Rejected",
                              description: `${app.applicantName}'s application for ${app.petName} has been rejected by moderation team.`,
                            })
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject Application
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-6 animate-in fade-in-0 duration-500">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Application Management</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">Review and manage adoption applications</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="all" className="text-sm">
              All Applications
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-sm">
              Pending
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-sm">
              Approved
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-sm">
              Rejected
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {sampleApplications.map((app, index) => (
              <ApplicationCard key={app.id} app={app} index={index} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {sampleApplications
              .filter((app) => app.status === "pending")
              .map((app, index) => (
                <ApplicationCard key={app.id} app={app} index={index} />
              ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {sampleApplications
              .filter((app) => app.status === "approved")
              .map((app, index) => (
                <ApplicationCard key={app.id} app={app} index={index} />
              ))}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4 mt-6">
            {sampleApplications
              .filter((app) => app.status === "rejected")
              .map((app, index) => (
                <ApplicationCard key={app.id} app={app} index={index} />
              ))}
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const Users = () => (
    <div className="text-center py-12 animate-in fade-in-0 duration-500">
      <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-gray-900 mb-2">User Management</h2>
      <p className="text-gray-600 max-w-md mx-auto">
        Manage user accounts and profiles. This section will help you oversee user activities and maintain platform
        quality.
      </p>
    </div>
  )

  const ModeratorSettings = () => (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Moderator Settings</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Configure your moderation preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              Moderation Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-notifications">Auto-approve verified users</Label>
              <Switch id="auto-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-alerts">Email alerts for new applications</Label>
              <Switch id="email-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="priority-review">Priority review for urgent cases</Label>
              <Switch id="priority-review" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-500" />
              System Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="bulk-actions">Enable bulk actions</Label>
              <Switch id="bulk-actions" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="advanced-filters">Advanced filtering options</Label>
              <Switch id="advanced-filters" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "applications":
        return <Applications />
      case "users":
        return <Users />
      case "settings":
        return <ModeratorSettings />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-purple-50 overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 opacity-75 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-purple-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-6 py-6 border-b border-purple-200">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">PetAdopt</h1>
                <p className="text-xs text-gray-500">Moderator Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {moderatorNavigationItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-purple-50 text-purple-700 border-r-2 border-purple-500 shadow-sm"
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
          <div className="flex-shrink-0 px-4 py-4 border-t border-purple-200">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Moderator" />
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 truncate">Moderator</p>
                <p className="text-xs text-gray-500 truncate">moderator@petadopt.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-purple-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 transition-all duration-300"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="ml-2 flex items-center">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 p-2 rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
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
      <Toaster />
    </div>
  )
}
