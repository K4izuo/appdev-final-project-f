import { Phone, Mail, Eye, CheckCircle, XCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import type { Application } from "@/types/petsType"
import { getStatusColor, getStatusIcon } from "@/utils/status-helpers"
import { toast } from "@/hooks/use-toast"

interface ApplicationsProps {
  applications: Application[]
}

export function Applications({ applications }: ApplicationsProps) {
  const ApplicationCard = ({ app, index }: { app: Application; index: number }) => {
    const StatusIcon = getStatusIcon(app.status)

    return (
      <Card className="animate-in fade-in-0 slide-in-from-left-4" style={{ animationDelay: `${index * 100}ms` }}>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
                <AvatarImage src={app.applicantImage || "/placeholder.svg"} alt={app.applicantName} />
                <AvatarFallback className="text-sm">{app.applicantName[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-base sm:text-lg truncate">{app.applicantName}</h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Applied for <span className="font-medium">{app.petName}</span>
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-1">
                  <div className="flex items-center min-w-0">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{app.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
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
                    <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">View Details</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Application Details</DialogTitle>
                    <DialogDescription>Review the complete adoption application</DialogDescription>
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
                            description: `${app.applicantName}'s application for ${app.petName} has been approved. They will be notified shortly.`,
                          })
                        }}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          toast({
                            variant: "destructive",
                            title: "Application Rejected",
                            description: `${app.applicantName}'s application for ${app.petName} has been rejected.`,
                          })
                        }}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
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
    <div className="space-y-4 sm:space-y-6 animate-in fade-in-0 duration-500">
      <div className="transform transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Adoption Applications</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Review and manage adoption applications</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All Applications
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm">
            Pending
          </TabsTrigger>
          <TabsTrigger value="approved" className="text-xs sm:text-sm">
            Approved
          </TabsTrigger>
          <TabsTrigger value="rejected" className="text-xs sm:text-sm">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-4 sm:mt-6">
          {applications.map((app, index) => (
            <ApplicationCard key={app.id} app={app} index={index} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4 mt-4 sm:mt-6">
          {applications
            .filter((app) => app.status === "pending")
            .map((app, index) => (
              <ApplicationCard key={app.id} app={app} index={index} />
            ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-4 sm:mt-6">
          {applications
            .filter((app) => app.status === "approved")
            .map((app, index) => (
              <ApplicationCard key={app.id} app={app} index={index} />
            ))}
        </TabsContent>

        <TabsContent value="rejected" className="mt-4 sm:mt-6">
          {applications.filter((app) => app.status === "rejected").length === 0 ? (
            <div className="text-center py-8 sm:py-12 animate-in fade-in-0 duration-500">
              <p className="text-gray-500 text-sm sm:text-base">No rejected applications at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applications
                .filter((app) => app.status === "rejected")
                .map((app, index) => (
                  <ApplicationCard key={app.id} app={app} index={index} />
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
