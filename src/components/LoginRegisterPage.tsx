"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, AtSign, Lock, Users } from "lucide-react";
import Image from "next/image";
import Logo from "../assets/images/image.png";

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const toggleForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex justify-center mb-6">
          <Image src={Logo} alt="Logo" width={64} height={64} />
        </div>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          {isLogin ? "Login" : "Registro"}
        </h2>
        <form className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex items-center space-x-2">
                <User
                  className={`text-white ${focusedInput === "name" ? "text-blue-500" : ""}`}
                />
                <input
                  type="text"
                  placeholder="Nome"
                  className="w-full p-2 rounded bg-zinc-700 text-white"
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Users
                  className={`text-white ${focusedInput === "gender" ? "text-blue-500" : ""}`}
                />
                <select
                  className="w-full p-2 rounded bg-zinc-700 text-white"
                  onFocus={() => setFocusedInput("gender")}
                  onBlur={() => setFocusedInput(null)}
                >
                  <option value="">Selecione o Gênero</option>
                  <option value="male">Masculino</option>
                  <option value="female">Feminino</option>
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
              placeholder="Email"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              onFocus={() => setFocusedInput("email")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Lock
              className={`text-white ${focusedInput === "password" ? "text-blue-500" : ""}`}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 rounded bg-zinc-700 text-white"
              onFocus={() => setFocusedInput("password")}
              onBlur={() => setFocusedInput(null)}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white p-2 rounded"
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
