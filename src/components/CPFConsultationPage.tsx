"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

interface Address {
  tipoEndereco: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  siglaUf: string;
  pais: string;
  cep: string;
}

interface Telephone {
  ddi: string;
  ddd: string;
  numero: string;
  tipo: number;
}

interface Nationality {
  nacionalidade: number;
  municipioNascimento: string;
  paisNascimento: string;
}

interface PersonalData {
  cnsDefinitivo: string;
  cnsProvisorio: string[];
  nome: string;
  cpf: string;
  dataNascimento: string;
  sexo: string;
  nomeMae: string;
  nomePai: string;
  grauQualidade: number;
  ativo: boolean;
  obito: boolean;
  partoGemelar: boolean;
  vip: boolean;
  racaCor: string;
  telefone: Telephone[];
  nacionalidade: Nationality;
  endereco: Address;
}

interface ConsultationResult {
  pessoal: {
    code: number;
    paginado: boolean;
    records: PersonalData[];
  };
  calendario: {
    code: number;
    paginado: boolean;
    record: {
      cns: string;
      cpf: string;
      indigena: boolean;
      calendario: any[];
      outrasImunizacoes: {
        imunobiologicos: any[];
      };
      imunizacoesCampanha: {
        imunobiologicos: any[];
      };
    };
  };
}

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => (
  <div className="bg-zinc-700 rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

const CPFConsultationPage: React.FC = () => {
  const [cpf, setCpf] = useState<string>("");
  const [consultationResult, setConsultationResult] =
    useState<ConsultationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`Sua api de consulta aqui`, {
        mode: "no-cors",
      });

      if (!response.ok) {
        throw new Error("Erro na consulta. Verifique o CPF e tente novamente.");
      }

      const data: ConsultationResult = await response.json();
      setConsultationResult(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao buscar os dados. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCPF = (value: string): string => {
    const cpf = value.replace(/\D/g, "");
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full h-full overflow-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Consulta</h1>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Digite o CPF..."
            className="w-full pl-10 pr-4 py-2 bg-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cpf}
            onChange={(e) => setCpf(formatCPF(e.target.value))}
            maxLength={14}
          />
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "Consultando..." : "Consultar CPF"}
        </button>
      </form>

      {consultationResult && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Dados Pessoais">
            <p>
              <strong>Nome:</strong>{" "}
              {consultationResult.pessoal.records[0].nome}
            </p>
            <p>
              <strong>CPF:</strong>{" "}
              {formatCPF(consultationResult.pessoal.records[0].cpf)}
            </p>
            <p>
              <strong>Data de Nascimento:</strong>{" "}
              {formatDate(consultationResult.pessoal.records[0].dataNascimento)}
            </p>
            <p>
              <strong>Sexo:</strong>{" "}
              {consultationResult.pessoal.records[0].sexo === "M"
                ? "Masculino"
                : "Feminino"}
            </p>
            <p>
              <strong>Nome da Mãe:</strong>{" "}
              {consultationResult.pessoal.records[0].nomeMae}
            </p>
            <p>
              <strong>Nome do Pai:</strong>{" "}
              {consultationResult.pessoal.records[0].nomePai}
            </p>
          </Card>

          <Card title="Informações Adicionais">
            <p>
              <strong>CNS Definitivo:</strong>{" "}
              {consultationResult.pessoal.records[0].cnsDefinitivo}
            </p>
            <p>
              <strong>CNS Provisório:</strong>{" "}
              {consultationResult.pessoal.records[0].cnsProvisorio.join(", ")}
            </p>
            <p>
              <strong>Grau de Qualidade:</strong>{" "}
              {consultationResult.pessoal.records[0].grauQualidade}
            </p>
            <p>
              <strong>Ativo:</strong>{" "}
              {consultationResult.pessoal.records[0].ativo ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Óbito:</strong>{" "}
              {consultationResult.pessoal.records[0].obito ? "Sim" : "Não"}
            </p>
            <p>
              <strong>Parto Gemelar:</strong>{" "}
              {consultationResult.pessoal.records[0].partoGemelar
                ? "Sim"
                : "Não"}
            </p>
          </Card>

          <Card title="Contato e Nacionalidade">
            <p>
              <strong>Telefone:</strong> +
              {consultationResult.pessoal.records[0].telefone[0].ddi} (
              {consultationResult.pessoal.records[0].telefone[0].ddd}){" "}
              {consultationResult.pessoal.records[0].telefone[0].numero}
            </p>
            <p>
              <strong>Nacionalidade:</strong>{" "}
              {consultationResult.pessoal.records[0].nacionalidade
                .nacionalidade === 1
                ? "Brasileiro"
                : "Estrangeiro"}
            </p>
            <p>
              <strong>Município de Nascimento:</strong>{" "}
              {
                consultationResult.pessoal.records[0].nacionalidade
                  .municipioNascimento
              }
            </p>
            <p>
              <strong>País de Nascimento:</strong>{" "}
              {consultationResult.pessoal.records[0].nacionalidade
                .paisNascimento === "1"
                ? "Brasil"
                : "Outro"}
            </p>
          </Card>

          <Card title="Endereço">
            <p>
              <strong>Logradouro:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.logradouro}
            </p>
            <p>
              <strong>Número:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.numero}
            </p>
            <p>
              <strong>Complemento:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.complemento}
            </p>
            <p>
              <strong>Bairro:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.bairro}
            </p>
            <p>
              <strong>Município:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.municipio}
            </p>
            <p>
              <strong>UF:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.siglaUf}
            </p>
            <p>
              <strong>CEP:</strong>{" "}
              {consultationResult.pessoal.records[0].endereco.cep}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CPFConsultationPage;
