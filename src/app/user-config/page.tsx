import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UserConfig from "@/components/UserConfig";

export default function UsersPage() {
  return (
    <div className=" max-h-screen grid grid-cols-16 grid-rows-11 bg-zinc-900 ">
      <Navbar />
      <Sidebar />
      <UserConfig />
    </div>
  );
}
