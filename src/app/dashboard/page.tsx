import { Layout } from "@/components/layout"
import { BookingManager } from "@/components/booking-manager"
import { PropertyManager } from "@/components/property-manager"
import { DashboardStats } from "@/components/dashboard-stats"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
   return (
    <Layout>
      <div className="space-y-6 space-x-6 mx-2 w-full max-w-full overflow-hidden">
        {/* Simplified & Customizable Stats */}
        <DashboardStats />

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            📅 Today's Check-ins
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            🏠 Occupancy Report
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            💰 Revenue Summary
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            👥 Guest Management
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <BookingManager />
          <PropertyManager />
        </div>
      </div>
    </Layout>
  )
}