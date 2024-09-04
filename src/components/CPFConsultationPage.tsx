import { useState } from "react";
import Avatar from "../assets/images/avatar.png";
import AvatarF from "../assets/images/image.png";
import Image from "next/image";

function ConsultationPage() {
  const [cpf, setCpf] = useState("");
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setUserData(null);

    try {
      const response = await fetch(`http://localhost:3000/search?cpf=${cpf}`, {
        credentials: "include",
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Falha ao buscar dados do usuário");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("Erro ao buscar dados do usuário. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const renderUserInfo = () => {
    const pessoal = userData?.pessoal?.records[0];
    if (!pessoal) {
      return <p>Informações pessoais não disponíveis.</p>;
    }

    return (
      <div className="addresses-container p-4 bg-zinc-600 text-white rounded-lg h-full overflow-y-auto ">
        <h2 className="text-xl font-bold mb-2">Informações Pessoais</h2>
        <p>
          <strong>Nome:</strong> {pessoal.nome}
        </p>
        <p>
          <strong>Data de Nascimento:</strong> {pessoal.dataNascimento}
        </p>
        <p>
          <strong>Nome da Mãe:</strong> {pessoal.nomeMae}
        </p>
        <p>
          <strong>CNS:</strong> {pessoal.cnsDefinitivo}
        </p>
      </div>
    );
  };

  const renderAddressInfo = () => {
    const endereco = userData?.pessoal?.records[0]?.endereco;
    if (!endereco) {
      return <p>Informações de endereço não disponíveis.</p>;
    }

    return (
      <div className="addresses-container p-4 bg-zinc-600 text-white rounded-lg h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Endereço</h2>
        <p>
          <strong>Logradouro:</strong> {endereco.logradouro}
        </p>
        <p>
          <strong>Número:</strong> {endereco.numero}
        </p>
        <p>
          <strong>Complemento:</strong> {endereco.complemento}
        </p>
        <p>
          <strong>Bairro:</strong> {endereco.bairro}
        </p>
        <p>
          <strong>Município:</strong> {endereco.municipio}
        </p>
        <p>
          <strong>UF:</strong> {endereco.siglaUf}
        </p>
        <p>
          <strong>CEP:</strong> {endereco.cep}
        </p>
      </div>
    );
  };

  const renderGenderInfo = () => {
    const gender = userData?.pessoal?.records[0]?.sexo;
    const avatarSrc = gender === "M" ? Avatar : AvatarF;

    if (!gender) {
      return <p>Sexo não informado</p>;
    }

    return (
      <div className="p-4 bg-zinc-600 text-white rounded-lg h-full  overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Sexo</h2>
        <div className="flex items-center justify-center">
          <Image
            src={avatarSrc}
            alt="Avatar"
            className="w-32 h-32 object-cover"
          />
        </div>
      </div>
    );
  };

  const renderVaccineInfo = () => {
    const imunizacoesCampanha =
      userData?.calendario?.record?.imunizacoesCampanha?.imunobiologicos;
    if (!imunizacoesCampanha || imunizacoesCampanha.length === 0) {
      return <p>Informações de vacinação não disponíveis.</p>;
    }

    return (
      <div className="addresses-container p-4 bg-zinc-600 text-white rounded-lg h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-2">Informações de Vacinação</h2>
        {imunizacoesCampanha.map((vaccine: any, index: number) => (
          <div key={index} className="mb-2">
            <p className="font-semibold">{vaccine.nome}</p>
            {vaccine.imunizacoes.map((dose: any, doseIndex: number) => (
              <p key={doseIndex} className="ml-4">
                {dose.esquemaDose.tipoDoseDto.descricao}: {dose.dataAplicacao}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl p-6 bg-zinc-700 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-6">Consulta de CPF</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-600 text-white border border-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
        >
          {loading ? "Carregando..." : "Consultar"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userData && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="h-64">{renderUserInfo()}</div>
          <div className="h-64">{renderAddressInfo()}</div>
          <div className="h-64">{renderVaccineInfo()}</div>
          <div className="h-64">{renderGenderInfo()}</div>
        </div>
      )}
    </div>
  );
}

export default function CPFConsultationPage() {
  return (
    <div className="bg-zinc-800 row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center font-bold text-xl rounded-lg">
      <ConsultationPage />
    </div>
  );
}
