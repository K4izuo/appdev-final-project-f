import { SettingsIcon, Bell, Shield, Palette, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="transform transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Configure your adoption center preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-sm">
                Email notifications
              </Label>
              <Switch id="email-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="text-sm">
                Push notifications
              </Label>
              <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="application-alerts" className="text-sm">
                New application alerts
              </Label>
              <Switch id="application-alerts" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor" className="text-sm">
                Two-factor authentication
              </Label>
              <Switch id="two-factor" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="session-timeout" className="text-sm">
                Auto session timeout
              </Label>
              <Switch id="session-timeout" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Palette className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm">
                Dark mode
              </Label>
              <Switch id="dark-mode" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="compact-view" className="text-sm">
                Compact view
              </Label>
              <Switch id="compact-view" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Database className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-backup" className="text-sm">
                Automatic backups
              </Label>
              <Switch id="auto-backup" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="data-export" className="text-sm">
                Allow data export
              </Label>
              <Switch id="data-export" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8 sm:py-12">
        <div className="transform transition-all duration-300 hover:scale-110">
          <SettingsIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
        </div>
        <p className="text-gray-500 text-sm sm:text-base">More configuration options coming soon!</p>
      </div>
    </div>
  )
}
