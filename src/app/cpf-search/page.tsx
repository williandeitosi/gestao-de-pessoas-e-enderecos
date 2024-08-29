import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CPFConsultationPage from "@/components/CPFConsultationPage";

export default function UsersPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-800">
          <div className="container mx-auto px-6 py-8">
            <CPFConsultationPage />
          </div>
        </main>
      </div>
    </div>
  );
}
