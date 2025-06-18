import { FileText, BarChart3, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Reports() {
  return (
    <div className="space-y-6 animate-in fade-in-0 duration-500">
      <div className="transform transition-all duration-300">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">View adoption statistics and generate reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
              Adoption Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-gray-600">Track adoption rates over time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              Success Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-gray-600">Monitor key performance indicators</p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500" />
              Monthly Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs sm:text-sm text-gray-600">Generate comprehensive monthly summaries</p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center py-8 sm:py-12">
        <div className="transform transition-all duration-300 hover:scale-110">
          <FileText className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
        </div>
        <p className="text-gray-500 text-sm sm:text-base">Detailed reporting features coming soon!</p>
      </div>
    </div>
  )
}
