"use client";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Clack() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        // Fazendo a requisição para buscar o usuário logado
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const userData: User = await response.json();
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    fetchUserData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>
        <strong>Olá</strong> {user.name}
      </p>
    </>
  );
}
