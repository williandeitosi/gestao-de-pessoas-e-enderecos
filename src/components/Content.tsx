'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, Eye, Edit, Trash2, User } from 'lucide-react';
import Avatar from '../assets/images/avatar.png';
import { StaticImageData } from 'next/image';

interface UserType {
  id: number;
  name: string;
  email: string;
  city: string;
  state: string;
  Number: string;
  Bairro: string;
  Cep: string;
  avatar: StaticImageData;
}

const mockUsers: UserType[] = [
  { id: 1, name: 'Joao Silva', email: 'joaosilva@example.com', city: 'Sao Paulo', state: 'SP', Number: '605', Bairro: 'Sapequeira', Cep: '89600-000', avatar: Avatar },
  { id: 2, name: 'Maria Oliveira', email: 'mariaoliveira@example.com', city: 'Rio de Janeiro', state: 'RJ', Number: '123', Bairro: 'Copacabana', Cep: '22000-000', avatar: Avatar },
  { id: 3, name: 'Pedro Santos', email: 'pedrosantos@example.com', city: 'Belo Horizonte', state: 'MG', Number: '456', Bairro: 'Savassi', Cep: '30150-000', avatar: Avatar },
  { id: 4, name: 'Ana Costa', email: 'anacosta@example.com', city: 'Porto Alegre', state: 'RS', Number: '789', Bairro: 'Centro', Cep: '90000-000', avatar: Avatar },
  { id: 5, name: 'Carlos Pereira', email: 'carlospereira@example.com', city: 'Curitiba', state: 'PR', Number: '101', Bairro: 'Batel', Cep: '80230-000', avatar: Avatar },
  { id: 6, name: 'Fernanda Lima', email: 'fernandalima@example.com', city: 'Salvador', state: 'BA', Number: '202', Bairro: 'Barra', Cep: '40130-000', avatar: Avatar },
  { id: 7, name: 'Roberto Almeida', email: 'robertoalmeida@example.com', city: 'Fortaleza', state: 'CE', Number: '303', Bairro: 'Meireles', Cep: '60160-000', avatar: Avatar },
  { id: 8, name: 'Juliana Souza', email: 'julianasouza@example.com', city: 'Recife', state: 'PE', Number: '404', Bairro: 'Boa Viagem', Cep: '51010-000', avatar: Avatar },
  { id: 9, name: 'Rafael Martins', email: 'rafaelmartins@example.com', city: 'Brasilia', state: 'DF', Number: '505', Bairro: 'Asa Norte', Cep: '70800-000', avatar: Avatar },
  { id: 10, name: 'Tatiane Rodrigues', email: 'tatianerodrigues@example.com', city: 'Manaus', state: 'AM', Number: '606', Bairro: 'Centro', Cep: '69000-000', avatar: Avatar },
  { id: 11, name: 'Gustavo Lima', email: 'gustavolima@example.com', city: 'Belém', state: 'PA', Number: '707', Bairro: 'Batista Campos', Cep: '66000-000', avatar: Avatar },
];

function UserListContent() {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setFilteredUsers(
      users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleEdit = (userId: number) => {
    // Implementar lógica ainda
    console.log("Falta implementar lógica");
  };

  const openUserModal = (user: UserType) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className='w-full h-full overflow-auto p-6 text-white'>
      <h1 className='text-3xl font-bold mb-6'>Lista de Usuarios</h1>

      <div className='grid grid-cols-3 gap-4 mb-6'>
        {['Usuarios Ativos (30 dias)', 'Total de usuarios', 'Novos Usuarios (10 dias)'].map((title, index) => (
          <div key={index} className='bg-zinc-700 p-4 rounded-lg border-[0.5px] border-opacity-20 border-yellow-300'>
            <h2 className='text-lg font-semibold mb-2'>{title}</h2>
            <p className='text-3xl font-bold'>{index === 1 ? users.length : index === 0 ? 120 : 25}</p>
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
                <Image src={user.avatar} alt={user.name} width={32} height={32} className="rounded-full" />
                <span>{user.name}</span>
                </td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{`${user.city}, ${user.state}`}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <button onClick={() => openUserModal(user)} className="text-blue-400 hover:text-blue-300">
                      <Eye className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleEdit(user.id)} className="text-yellow-400 hover:text-yellow-300">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300">
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
            <p><strong>Nome:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Cidade:</strong> {selectedUser.city}</p>
            <p><strong>Estado:</strong> {selectedUser.state}</p>
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
  )
}