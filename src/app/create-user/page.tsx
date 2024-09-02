"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkUserLoggedIn } from "@/utils/checkUserLoggedIn";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import CreateUser from "@/components/CreateUser";

export default function UsersPage() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await checkUserLoggedIn();
      if (!userLoggedIn) {
        router.push("/login");
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <div className=" max-h-screen grid grid-cols-16 grid-rows-11 bg-zinc-900 ">
      <Navbar />
      <Sidebar />
      <CreateUser />
    </div>
  );
}
