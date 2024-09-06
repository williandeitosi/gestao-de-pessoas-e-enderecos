"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Avatar from "../assets/images/avatar.png";

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

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-4">
      <p className="text-gray-400">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

function Pagination({
  usersPerPage,
  totalUsers,
  paginate,
  currentPage,
}: {
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex space-x-2">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-zinc-700 rounded-md disabled:opacity-50"
          >
            <ChevronLeft className="h-7 w-5" />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number ? "bg-blue-600" : "bg-zinc-700"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalUsers / usersPerPage)}
            className="px-3 py-1 bg-zinc-700 rounded-md disabled:opacity-50"
          >
            <ChevronRight className="h-7 w-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
}

function UserListContent() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [usersPerPage] = useState<number>(20);

  useEffect(() => {
    async function fetchClients() {
      try {
        const response = await fetch("http://localhost:3000/clients", {
          method: "GET",
          credentials: "include",
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
    setCurrentPage(1);
  }, [searchTerm, users]);

  // Isso pega os atuais.
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Proxima pagina
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (userId: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este usuário?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:3000/clients/${userId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId));
        } else {
          console.error("Erro ao excluir usuário:", await response.text());
        }
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    }
  };

  const handleEdit = (userId: number) => {
    console.log("Falta implementar lógica");
  };

  const openUserModal = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const handleAddUser = () => {
    window.location.href = "http://localhost:8080/create-user";
  };

  function formatCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }

  return (
    <div className="w-full h-full overflow-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Lista de Usuários</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          "Quantidade de Consultas (24 hrs)",
          "Total de usuários",
          "Novos Usuários (10 dias)",
        ].map((title, index) => (
          <div
            key={index}
            className="bg-zinc-700 p-4 rounded-lg border-[0.5px] border-opacity-20 border-blue-600"
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
        <button
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
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
            {currentUsers.map((user) => (
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
                    ? `${user.Address[0].city}, ${user.Address[0].state}`
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
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-zinc-800 p-8 rounded-lg max-w-2xl w-full relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 left-4 flex items-center text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="h-8 w-8 mr-2" />
            </button>
            <span className="absolute top-4 right-4 text-xs text-gray-400">
              ID: {selectedUser.id}
            </span>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Detalhes do usuário
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <Image
                  src={Avatar}
                  alt={selectedUser.name}
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4"
                />
                <p className="text-center text-xl font-semibold mb-2">
                  {selectedUser.name}
                </p>
                <p className="text-center text-gray-400 mb-4">
                  {selectedUser.email}
                </p>
              </div>
              <div>
                <InfoItem
                  label="CPF"
                  value={selectedUser.cpf ? formatCPF(selectedUser.cpf) : "N/A"}
                />
                <InfoItem
                  label="Data de nascimento"
                  value={
                    selectedUser.birth ? formatDate(selectedUser.birth) : "N/A"
                  }
                />
                <InfoItem label="Sexo" value={selectedUser.sexo || "N/A"} />
              </div>
            </div>
            <div className="flex-grow overflow-hidden ">
              <h3 className="text-xl font-semibold mb-4">Endereços</h3>
              <div className="addresses-container overflow-y-auto max-h-[40vh] pr-2">
                {selectedUser.Address.length > 0 ? (
                  selectedUser.Address.map((address, index) => (
                    <div
                      key={index}
                      className="bg-zinc-700 p-4 rounded-lg mb-4"
                    >
                      <p>
                        <strong>CEP:</strong> {address.cep}
                      </p>
                      <p>
                        <strong>Rua:</strong> {address.street}, {address.number}
                      </p>
                      <p>
                        <strong>Bairro:</strong> {address.neighboorhood}
                      </p>
                      <p>
                        <strong>Cidade:</strong> {address.city}
                      </p>
                      <p>
                        <strong>Estado:</strong> {address.state}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">Nenhum Endereço Cadastrado</p>
                )}
              </div>
            </div>
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
