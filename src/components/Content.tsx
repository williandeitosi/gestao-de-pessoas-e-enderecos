"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import Avatar from "../assets/images/avatar.png";
import { StaticImageData } from "next/image";

interface AddressType {
  id: number;
  cep: number;
  city: string;
  street: string;
  state: string;
  number: number;
  neighboorhood: string;
  clientsId?: number;
}

interface UserType {
  id: number;
  name: string;
  email: string;
  sexo?: string;
  pfp?: string;
  cpf?: string;
  birth?: string;
  Address: AddressType[];
}

function UserListContent() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("http://localhost:3000/clients", {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchClients();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleEdit = (userId: number) => {
    console.log("Falta implementar lógica");
  };

  const openUserModal = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full overflow-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          "Usuários Ativos (30 dias)",
          "Total de usuários",
          "Novos Usuários (10 dias)",
        ].map((title, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-4 rounded-lg border-[0.5px] border-opacity-20 border-yellow-300"
          >
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-3xl font-bold">
              {index === 1 ? users.length : index === 0 ? 120 : 25}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar usuários..."
            className="pl-10 pr-4 py-2 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Adicionar Usuário
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-zinc-700 rounded-lg">
          <thead>
            <tr className="text-left">
              <th className="p-3">Usuário</th>
              <th className="p-3">Email</th>
              <th className="p-3">Localização</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-t border-zinc-600">
                <td className="p-3 flex items-center space-x-2">
                  <Image
                    src={Avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.Address.length > 0
                    ? user.Address.map((address, index) => (
                        <div
                          key={index}
                        >{`${address.city}, ${address.state}`}</div>
                      ))
                    : "Endereço não vinculado"}
                </td>

                <td className="p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openUserModal(user)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="text-yellow-400 hover:text-yellow-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-800 p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Detalhes do Usuário</h2>
            <p>
              <strong>Nome:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>{/* <strong>Cidade:</strong> {selectedUser.city || "N/A"} */}</p>
            <p>
              {/* <strong>Estado:</strong> {selectedUser.state || "N/A"} */}
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContentPage() {
  return (
    <div className="bg-zinc-800 row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center font-bold text-xl rounded-lg">
      <UserListContent />
    </div>
  );
}
