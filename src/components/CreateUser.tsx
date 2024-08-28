"use client";

import React, { useState } from "react";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import Avatar from "../assets/images/avatar.png";

interface Address {
  city: string;
  state: string;
  street: string;
  number: string;
  neighborhood: string;
  cep: string;
}

interface UserType {
  name: string;
  email: string;
  addresses: Address[];
  cpf: string;
  birth: string;
  avatar: StaticImageData;
  gender: string;
}

const estadosBR = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

function CreateUser() {
  const [user, setUser] = useState<UserType>({
    name: "",
    email: "",
    cpf: "",
    birth: "",
    addresses: [
      {
        city: "",
        state: "",
        street: "",
        number: "",
        neighborhood: "",
        cep: "",
      },
    ],
    avatar: Avatar,
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = value.replace(/\D/g, "").slice(0, 11);
      if (formattedValue.length > 3) {
        formattedValue = `${formattedValue.slice(0, 3)}.${formattedValue.slice(3)}`;
      }
      if (formattedValue.length > 7) {
        formattedValue = `${formattedValue.slice(0, 7)}.${formattedValue.slice(7)}`;
      }
      if (formattedValue.length > 11) {
        formattedValue = `${formattedValue.slice(0, 11)}-${formattedValue.slice(11, 13)}`;
      }
    }

    setUser((prevUser) => ({ ...prevUser, [name]: formattedValue }));
  };

  const handleAddressChange = async (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cep") {
      formattedValue = value.replace(/\D/g, "").slice(0, 8);
      if (formattedValue.length > 5) {
        formattedValue = `${formattedValue.slice(0, 5)}-${formattedValue.slice(5)}`;
      }

      if (formattedValue.length === 9) {
        const addressData = await fetchAddressData(
          formattedValue.replace("-", "")
        );
        if (addressData) {
          const newAddresses = user.addresses.map((address, i) => {
            if (i === index) {
              return {
                ...address,
                ...addressData,
                cep: formattedValue,
              };
            }
            return address;
          });
          setUser((prevUser) => ({ ...prevUser, addresses: newAddresses }));
          return;
        }
      }
    }

    const newAddresses = user.addresses.map((address, i) => {
      if (i === index) {
        return { ...address, [name]: formattedValue };
      }
      return address;
    });
    setUser((prevUser) => ({ ...prevUser, addresses: newAddresses }));
  };

  const addAddress = () => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: [
        ...prevUser.addresses,
        {
          city: "",
          state: "",
          street: "",
          number: "",
          neighborhood: "",
          cep: "",
        },
      ],
    }));
  };

  const fetchAddressData = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        return {
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        };
      }
    } catch (error) {
      console.error("Error on fetchaddres", error);
    }
    return null;
  };

  const removeAddress = (index: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      addresses: prevUser.addresses.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("New user:", user);
  };

  return (
    <div className="w-full max-w-4xl p-6 bg-zinc-700 rounded-lg shadow-xl">
      <div className="flex items-center mb-6">
        <ArrowLeft className="h-6 w-6 text-blue-400 mr-2" />
        <h1 className="text-3xl font-bold text-white">Criar Novo Usuário</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-4 mb-4">
              <Image
                src={Avatar}
                alt="Avatar"
                width={64}
                height={64}
                className="rounded-full"
              />
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Escolher Avatar
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  name="cpf"
                  value={user.cpf}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  maxLength={14}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Sexo
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-zinc-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="birth"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Nascimento
                  </label>
                  <input
                    type="date"
                    id="birth"
                    name="birth"
                    value={user.birth}
                    onChange={handleChange}
                    className="
                    w-full px-3 py-2 
                    bg-zinc-600 text-white 
                    rounded-md focus:outline-none 
                    focus:ring-2 focus:ring-blue-500
                    hover:bg-zinc-500 transition-colors 
                    appearance-none 
                    placeholder-gray-400 
                    [&::-webkit-calendar-picker-indicator]:cursor-pointer 
                    [&::-webkit-calendar-picker-indicator]:invert"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h2 className="text-xl font-semibold text-white mb-2">Endereços</h2>
            <div className="addresses-container max-h-80 overflow-y-auto space-y-6">
              {user.addresses.map((address, index) => (
                <div key={index} className="bg-zinc-600 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-white">
                      Endereço {index + 1}
                    </h3>
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => removeAddress(index)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { name: "street", label: "Rua", type: "text" },
                      { name: "number", label: "Número", type: "number" },
                      { name: "neighborhood", label: "Bairro", type: "text" },
                      { name: "city", label: "Cidade", type: "text" },
                      { name: "cep", label: "CEP", type: "text" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          htmlFor={`${field.name}-${index}`}
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          id={`${field.name}-${index}`}
                          name={field.name}
                          value={address[field.name as keyof Address]}
                          onChange={(e) => handleAddressChange(index, e)}
                          className='w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-inner-spin-button]:appearance-none"'
                          required
                          maxLength={field.name === "cep" ? 9 : undefined}
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor={`state-${index}`}
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Estado
                      </label>
                      <select
                        id={`state-${index}`}
                        name="state"
                        value={address.state}
                        onChange={(e) => handleAddressChange(index, e)}
                        className="addresses-container w-full px-3 py-2 bg-zinc-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        {estadosBR.map((estado) => (
                          <option key={estado.value} value={estado.value}>
                            {estado.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAddress}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" /> Adicionar Endereço
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Criar Usuário
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CreateUserPage() {
  return (
    <div className="bg-zinc-800 row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center font-bold text-xl rounded-lg">
      <CreateUser />
    </div>
  );
}
