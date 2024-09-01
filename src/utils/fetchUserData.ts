export enum Sexo {
  Masculino = "Masculino",
  Feminino = "Feminino",
}

// Interface para o modelo User
export interface User {
  id: number;
  name: string;
  email: string;
  pass: string;
  sexo: Sexo;
  pfp: string;
  createdAt: string;
}

export async function fetchUserData(): Promise<User> {
  const response = await fetch("http://localhost:3000/users/me", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  const userData: User = await response.json();
  return userData;
}
