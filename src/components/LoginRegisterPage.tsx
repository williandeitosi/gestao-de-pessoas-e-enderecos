"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, AtSign, Lock, Users } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/images/image.png";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    pfp: "",
  });

  const toggleForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = isLogin ? "/users/login" : "/users/register";
    const payload = isLogin
      ? { email: formData.email, pass: formData.password }
      : {
          name: formData.name,
          email: formData.email,
          pass: formData.password,
          sexo: formData.gender,
          pfp: "default.png",
        };

    try {
      const response = await fetch(`http://localhost:3000${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Success:", data);
        if (isLogin) {
          // Armazenar token JWT em um cookie
          document.cookie = `token=${data.token}; path=/; max-age=3600; SameSite=None; Secure`;
        } else {
          console.log("User registered successfully:", data);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={64} height={64} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? "Login" : "Registro"}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="flex items-center space-x-2">
                <User
                  className={`text-white ${focusedInput === "name" ? "text-blue-500" : ""}`}
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className="w-full p-2 rounded bg-zinc-700 text-white"
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Users
                  className={`text-white ${focusedInput === "gender" ? "text-blue-500" : ""}`}
                />
                <select
                  name="gender"
                  className="w-full p-2 rounded bg-zinc-700 text-white"
                  onFocus={() => setFocusedInput("gender")}
                  onBlur={() => setFocusedInput(null)}
                  onChange={handleChange}
                  value={formData.gender}
                >
                  <option value="">Selecione o Gênero</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>
            </>
          )}
          <div className="flex items-center space-x-2">
            <AtSign
              className={`text-white ${focusedInput === "email" ? "text-blue-500" : ""}`}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Lock
              className={`text-white ${focusedInput === "password" ? "text-blue-500" : ""}`}
            />
            <input
              type="password"
              name="password"
              placeholder="Senha"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
              onChange={handleChange}
              value={formData.password}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white p-2 rounded"
            type="submit"
          >
            {isLogin ? "Entrar" : "Registrar"}
          </motion.button>
          <p className="mt-4 text-center text-zinc-400">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
            <button
              onClick={toggleForm}
              className="text-blue-400 hover:underline ml-1"
            >
              {isLogin ? "Registre-se" : "Faça Login"}
            </button>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginRegisterPage;
