import React, { useState } from "react";

function Consultationpage() {
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
      const response = await fetch(`sua api de busca`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError("Error fetching user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold text-white mb-6">CPF Consultation</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-600 text-white border border-zinc-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
        >
          {loading ? "Loading..." : "Consult"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {userData && (
        <div className="mt-6 p-4 bg-zinc-600 text-white rounded-lg">
          <h2 className="text-xl font-bold mb-2">User Information</h2>
          <p>
            <strong>Name:</strong> {userData.pessoal.records[0].nome}
          </p>
          <p>
            <strong>Birth Date:</strong>{" "}
            {userData.pessoal.records[0].dataNascimento}
          </p>
          <p>
            <strong>Mother's Name:</strong>{" "}
            {userData.pessoal.records[0].nomeMae}
          </p>
          <p>
            <strong>CNS:</strong> {userData.pessoal.records[0].cnsDefinitivo}
          </p>
        </div>
      )}

      {userData && userData.calendario && userData.calendario.record && (
        <div className="mt-4 p-4 bg-zinc-600 text-white rounded-lg">
          <h2 className="text-xl font-bold mb-2">Vaccination Information</h2>
          {userData.calendario.record.imunizacoesCampanha.imunobiologicos.map(
            (vaccine: any, index: number) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">{vaccine.nome}</p>
                {vaccine.imunizacoes.map((dose: any, doseIndex: number) => (
                  <p key={doseIndex} className="ml-4">
                    {dose.esquemaDose.tipoDoseDto.descricao}:{" "}
                    {dose.dataAplicacao}
                  </p>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default function CPFConsultationPage() {
  return (
    <div className="bg-zinc-800 row-start-2 row-end-12 col-start-3 col-span-full flex justify-center items-center font-bold text-xl rounded-lg">
      <Consultationpage />
    </div>
  );
}
