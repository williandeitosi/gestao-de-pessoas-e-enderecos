import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"

export default function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-16 grid-rows-12 ">
      <Navbar/>
      <Sidebar/>
    </div>
  )
}
