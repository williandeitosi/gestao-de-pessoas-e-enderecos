"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkUserLoggedIn } from "@/utils/checkUserLoggedIn";
import LoginRegisterPage from "@/components/LoginRegisterPage";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userLoggedIn = await checkUserLoggedIn();
      if (userLoggedIn) {
        router.push("/main");
      }
    };

    checkLoginStatus();
  }, [router]);

  return (
    <>
      <LoginRegisterPage />
    </>
  );
}
