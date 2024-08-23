import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import CreateUser from '@/components/CreateUser'

export default function UsersPage() {
  return (
    <div className=" max-h-screen grid grid-cols-16 grid-rows-11 bg-zinc-900 ">
      <Navbar />
      <Sidebar />
      <CreateUser />
    </div>
  )
}
