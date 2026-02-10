export type MunicipalityHeaderData = {
  name?: string;
  department?: string;
  phone?: string;
  email?: string;
  imageBase64?: string; // Data URI (data:image/png;base64,...) ou base64 puro
};

export type NfseCoreData = {
  chaveAcesso: string;
  numeroNfse: string;
  localEmissao: string;
  localPrestacao: string;
  localIncidencia: string;
  tribNac: string;
  dataProcessamento: string;
  numeroDFSe: string;
  competenciaDps: string;
  dataEmissaoNfse: string;
  numeroDps: string;
  serieDps: string;
  dataEmissaoDps: string;
  emitente: {
    cnpj: string;
    inscricaoMunicipal: string;
    nome: string;
    email: string;
    fone: string;
    logradouro: string;
    numero: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    optanteSimplesNacional: string;
    regimeApuracaoTributariaSN: string;
  };
  tomador: {
    doc: string;
    inscricaoMunicipal: string;
    nome: string;
    email: string;
    fone: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    ibgeMunicipio: string;
    municipio?: string;
    uf?: string;
    cep: string;
  };
  servico: {
    codTribNac: string;
    codTribMun: string;
    descricao: string;
    nbs: string;
    infoComp: string;
  };
  valores: {
    servico: string;
    descontoIncondicionado: string;
    totalDeducaoReducao: string;
    calculoBeneficioMunicipal: string;
    baseCalculoISSQN: string;
    ISSQN: string;
    IRRF: string;
    CP: string;
    CSLL: string;
    PIS: string;
    COFINS: string;
    liquido: string;
    totalTributosFederais: string;
    totalTributosEstaduais: string;
    totalTributosMunicipais: string;
    IrrfCpCsllRetidos: string;
    PisCofinsRetidos: string;
  };
  dps: {
    numero: string;
    serie: string;
    competencia: string;
    dataEmissao: string;
  };
  tributacao: {
    tipoTributacaoISSQN: string;
    regimeEspecialTributacao: string;
    tipoImunidade: string;
    tipoSuspensao: string;
    nProcessoSuspensao: string;
    nBeneficioMunicipal: string;
    percentualAliquotaAplicadaISSQN: string;
    tipoRetencaoISSQN: string;
    tipoRetencaoPisCofins: string;
  };
};

export type MunicipalityInfo = {
  department?: string | null;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
};

export type NfseData = Record<string, any>;
