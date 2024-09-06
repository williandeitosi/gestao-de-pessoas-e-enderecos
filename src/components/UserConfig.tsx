"use client";
import { useEffect, useState } from "react";
import { Camera } from "lucide-react";
import Avatar from "../assets/images/avatar.png";
import Image from "next/image";
import { fetchUserData, User, Sexo } from "../utils/fetchUserData"; // Importando o tipo Sexo

export default function Component() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState({
    email: false,
    pass: false,
    sexo: false,
  });

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await fetchUserData();
        setUser(userData);
      } catch (err) {
        setError((err as Error).message);
      }
    }

    getUserData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  const AvatarPath = user.sexo === "Masculino" ? "images/m" : "images/f";

  return (
    <div className="bg-zinc-800 p-4 rounded-md row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center">
      <div className="w-full max-w-screen-md space-y-4">
        <div className="bg-zinc-700 bg-opacity-90 rounded-lg p-6 relative">
          <div className="absolute top-4 right-4 bg-zinc-700 rounded-full p-2 cursor-pointer">
            <Camera className="w-6 h-6 text-blue-500" />
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`/${AvatarPath}/${user.pfp}`}
              alt="Profile"
              className="w-32 h-32 bg-zinc-600 bg-opacity-10 rounded-full mb-4"
            />
            <h2 className="text-xl font-bold text-blue-500">{user.name}</h2>
          </div>
        </div>

        <div className="bg-zinc-700 bg-opacity-85 rounded-lg p-6 space-y-8">
          <div className="flex items-center justify-between">
            <label className="text-zinc-400 w-1/3">Nome Completo:</label>
            <p className="text-white w-2/3">{user.name}</p>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-zinc-400 w-1/3">Email:</label>
            <div className="flex items-center space-x-2 w-2/3">
              {isEditing.email ? (
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser(
                      (prev) => prev && { ...prev, email: e.target.value }
                    )
                  }
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
              ) : (
                <p className="text-white flex-grow">{user.email}</p>
              )}
              <button
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, email: !prev.email }))
                }
                className="px-3 py-1 bg-zinc-600 text-white rounded hover:bg-zinc-500 focus:outline-none"
              >
                {isEditing.email ? "Salvar" : "Alterar"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-zinc-400 w-1/3">Senha:</label>
            <div className="flex items-center space-x-2 w-2/3">
              {isEditing.pass ? (
                <input
                  type="password"
                  value={user.pass}
                  onChange={(e) =>
                    setUser((prev) => prev && { ...prev, pass: e.target.value })
                  }
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
              ) : (
                <p className="text-white flex-grow">********</p>
              )}
              <button
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, pass: !prev.pass }))
                }
                className="px-3 py-1 bg-zinc-600 text-white rounded hover:bg-zinc-500 focus:outline-none"
              >
                {isEditing.pass ? "Salvar" : "Alterar"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-zinc-400 w-1/3">Sexo:</label>
            <div className="flex items-center space-x-2 w-2/3">
              {isEditing.sexo ? (
                <select
                  value={user.sexo}
                  onChange={(e) =>
                    setUser(
                      (prev) =>
                        prev && { ...prev, sexo: e.target.value as Sexo }
                    )
                  }
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              ) : (
                <p className="text-white flex-grow">{user.sexo}</p>
              )}
              <button
                onClick={() =>
                  setIsEditing((prev) => ({ ...prev, sexo: !prev.sexo }))
                }
                className="px-3 py-1 bg-zinc-600 text-white rounded hover:bg-zinc-500 focus:outline-none"
              >
                {isEditing.sexo ? "Salvar" : "Alterar"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-zinc-400 w-1/3">
              Data de Criação da Conta:
            </label>
            <p className="text-white w-2/3">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
