import { useState } from "react"
import { Outlet } from "react-router-dom"
import {DashboardHeader,DashboardSidebar} from "@/components"
import { useAuth } from "@/contexts"
function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock user data - in a real app, this would come from your auth context
  // const user = {
  //   name: "John Doe",
  //   email: "john.doe@example.com",
  //   role: "admin", // or "uploader"
  //   avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  // }
  const {user}= useAuth()
// const state = useAuth()
// const user = state.state.currentUser
// console.log(state)
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      <DashboardHeader user={user} onMenuClick={() => setSidebarOpen(true)} />

      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar user={user} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-5 md:px-12 lg:px-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
