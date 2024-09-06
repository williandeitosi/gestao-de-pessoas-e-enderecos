import React, { useEffect, useState } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchUserData, User, Sexo } from "../utils/fetchUserData";
import { updateUserData } from "../utils/updateUserData"; // Importe a função de atualização

interface AvatarCarouselProps {
  user: User;
  onSelectAvatar: (newPfp: string) => void;
}

const AvatarCarousel: React.FC<AvatarCarouselProps> = ({
  user,
  onSelectAvatar,
}) => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalAvatars = user.sexo === "Masculino" ? 17 : 14;

  const getAvatarPath = (index: number) =>
    `/${user.sexo === "Masculino" ? "images/m" : "images/f"}/${index + 1}.png`;

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + totalAvatars) % totalAvatars
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalAvatars);
  };

  const visibleAvatars = [
    (currentIndex - 2 + totalAvatars) % totalAvatars,
    (currentIndex - 1 + totalAvatars) % totalAvatars,
    currentIndex,
    (currentIndex + 1) % totalAvatars,
    (currentIndex + 2) % totalAvatars,
  ];

  return (
    <div className="flex items-center space-x-4">
      <button onClick={handlePrev} className="p-2">
        <ChevronLeft className="w-6 h-6 text-blue-500" />
      </button>
      <div className="flex space-x-4">
        {visibleAvatars.map((index, i) => (
          <img
            key={index}
            src={getAvatarPath(index)}
            alt={`Avatar ${index + 1}`}
            className={`w-16 h-16 rounded-full cursor-pointer transition-opacity duration-300 ${
              i === 2
                ? "opacity-100 scale-150"
                : "opacity-50 hover:opacity-75 hover:scale-105"
            }`}
            onClick={() => onSelectAvatar(`${index + 1}.png`)}
          />
        ))}
      </div>
      <button onClick={handleNext} className="p-2">
        <ChevronRight className="w-6 h-6 text-blue-500" />
      </button>
    </div>
  );
};

const Component: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState({
    email: false,
    pass: false,
    sexo: false,
  });
  const [showCarousel, setShowCarousel] = useState(false);

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

  const handleSelectAvatar = async (newPfp: string) => {
    if (user) {
      const updatedUser = { ...user, pfp: newPfp };
      setUser(updatedUser);
      try {
        await updateUserData(user.id.toString(), updatedUser);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  const handleInputChange = (field: keyof User, value: string) => {
    setUser((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const toggleEditing = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const toggleCarousel = () => {
    setShowCarousel((prev) => !prev);
  };

  const handleSaveChanges = async () => {
    if (user) {
      try {
        await updateUserData(user.id.toString(), user);
      } catch (err) {
        setError((err as Error).message);
      }
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-md row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center">
      <div className="w-full max-w-screen-md space-y-4">
        <div className="bg-zinc-700 bg-opacity-90 rounded-lg p-6">
          <div className="flex flex-col items-center space-y-4 relative">
            <div className="relative">
              <img
                src={`/${user.sexo === "Masculino" ? "images/m" : "images/f"}/${user.pfp}`}
                alt="Profile"
                className="w-32 h-32 bg-zinc-600 bg-opacity-10 rounded-full"
              />
              <button
                onClick={toggleCarousel}
                className="absolute bottom-0 right-0 bg-zinc-600 rounded-full p-2 cursor-pointer"
              >
                <Camera className="w-6 h-6 text-blue-500" />
              </button>
            </div>
            <h2 className="text-xl font-bold text-blue-500">{user.name}</h2>
            {showCarousel && (
              <AvatarCarousel user={user} onSelectAvatar={handleSelectAvatar} />
            )}
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
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
              ) : (
                <p className="text-white flex-grow">{user.email}</p>
              )}
              <button
                onClick={() => {
                  toggleEditing("email");
                  if (isEditing.email) handleSaveChanges();
                }}
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
                  onChange={(e) => handleInputChange("pass", e.target.value)}
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                />
              ) : (
                <p className="text-white flex-grow">********</p>
              )}
              <button
                onClick={() => {
                  toggleEditing("pass");
                  if (isEditing.pass) handleSaveChanges();
                }}
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
                  onChange={(e) => handleInputChange("sexo", e.target.value)}
                  className="bg-zinc-600 text-white border border-zinc-600 rounded px-2 py-1 focus:outline-none focus:border-blue-500 flex-grow"
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              ) : (
                <p className="text-white flex-grow">{user.sexo}</p>
              )}
              <button
                onClick={() => {
                  toggleEditing("sexo");
                  if (isEditing.sexo) handleSaveChanges();
                }}
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
};

export default Component;
