"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, AtSign, Lock, Users, CheckCircle } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/images/image.png";
import LoginSvg from "../assets/svgs/login.svg";
import RegisterSvg from "../assets/svgs/register.svg";
import Success from "../assets/svgs/success.svg";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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
          document.cookie = `token=${data.token}; path=/; max-age=10800; SameSite=None; Secure`;
          window.location.href = "/";
        } else {
          setShowSuccessModal(true);
        }
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        // Aqui você pode adicionar uma lógica para mostrar erros ao usuário
      }
    } catch (error) {
      console.error("Error:", error);
      // Aqui você pode adicionar uma lógica para mostrar erros de conexão ao usuário
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  const goToLogin = () => {
    setShowSuccessModal(false);
    setIsLogin(true);
    setFormData({
      name: "",
      email: "",
      password: "",
      gender: "",
      pfp: "",
    });
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="flex items-center justify-center">
          <Image
            src={isLogin ? LoginSvg : RegisterSvg}
            alt={isLogin ? "Login SVG" : "Register SVG"}
            width={300}
            height={300}
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            {isLogin ? "Login" : "Registro"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="flex items-center space-x-2">
                  <User
                    className={`${
                      focusedInput === "name" ? "text-blue-400" : "text-white"
                    }`}
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
                    className={`${
                      focusedInput === "gender" ? "text-blue-400" : "text-white"
                    }`}
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
                className={`${
                  focusedInput === "email" ? "text-blue-400" : "text-white"
                }`}
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
                className={`${
                  focusedInput === "password" ? "text-blue-400" : "text-white"
                }`}
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
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md"
            >
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Registro Concluído com Sucesso!
              </h3>
              <div className="flex items-center justify-center mb-6">
                <Image
                  src={Success}
                  alt={"Sucessfuly Register"}
                  width={300}
                  height={300}
                />{" "}
              </div>
              <p className="text-zinc-400 text-center mb-6">
                Sua conta foi criada. Você já pode fazer login.
              </p>
              <div className="flex justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded mr-2"
                  onClick={goToLogin}
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-1/2 bg-zinc-700 text-white px-4 py-2 rounded ml-2"
                  onClick={closeModal}
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginRegisterPage;
