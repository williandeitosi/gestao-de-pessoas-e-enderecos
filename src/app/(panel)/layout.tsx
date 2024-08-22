import ContentPage from '@/components/Content'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function PanelLayout() {
  return (
    <div className=" max-h-screen grid grid-cols-16 grid-rows-11 bg-zinc-900 ">
      <Navbar />
      <Sidebar />
      <ContentPage />
    </div>
  )
}
