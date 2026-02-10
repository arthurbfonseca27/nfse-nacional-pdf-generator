import fs from "fs";
import path from "path";
import { XMLParser } from "fast-xml-parser";
import { NfseCoreData } from "../types";
import {
  formatDateTime,
  formatDate,
  formatCnpjCpf,
  formatPhone,
  formatCep,
  formatMoney,
} from "./formatters";

/**
 * Faz parse do conteúdo XML da NFS-e
 */
export function parseXmlContent(xmlContent: string): NfseCoreData {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    removeNSPrefix: true,
    parseTagValue: true,
    parseAttributeValue: true,
    trimValues: true,
  });

  const obj = parser.parse(xmlContent);

  const infNFSe =
    obj?.NFSe?.infNFSe ??
    obj?.Nfse?.infNFSe ??
    obj?.nfse?.infNFSe ??
    obj?.infNFSe;

  if (!infNFSe) throw new Error("XML inválido: infNFSe não encontrado");

  const infDPS =
    infNFSe?.DPS?.infDPS ??
    infNFSe?.DPS?.InfDPS ??
    infNFSe?.dps?.infDPS ??
    infNFSe?.dps?.InfDPS;

  if (!infDPS) throw new Error("XML inválido: DPS/infDPS não encontrado");

  const id = String(infNFSe?.["@_Id"] ?? "");
  const chaveAcesso = id.replace(/^NFS/, "");

  const data: NfseCoreData = {
    chaveAcesso,
    numeroNfse: String(infNFSe?.nNFSe ?? ""),
    localEmissao: String(infNFSe?.xLocEmi ?? ""),
    localPrestacao: String(infNFSe?.xLocPrestacao ?? ""),
    localIncidencia: String(infNFSe?.xLocIncid ?? ""),
    tribNac: String(infNFSe?.xTribNac ?? ""),
    dataProcessamento: formatDateTime(String(infNFSe?.dhProc ?? "")),
    numeroDFSe: String(infNFSe?.nDFSe ?? ""),
    competenciaDps: formatDate(String(infDPS?.dCompet ?? "")),
    dataEmissaoNfse: formatDateTime(String(infNFSe?.dhProc ?? "")),
    numeroDps: String(infDPS?.nDPS ?? ""),
    serieDps: String(infDPS?.serie ?? ""),
    dataEmissaoDps: formatDateTime(String(infDPS?.dhEmi ?? "")),
    emitente: {
      cnpj: formatCnpjCpf(String(infNFSe?.emit?.CNPJ ?? "")),
      inscricaoMunicipal: String(infNFSe?.emit?.IM || "-"),
      nome: String(infNFSe?.emit?.xNome ?? ""),
      email: String(infNFSe?.emit?.email ?? ""),
      fone: formatPhone(String(infNFSe?.emit?.fone ?? "")),
      logradouro: String(infNFSe?.emit?.enderNac?.xLgr ?? ""),
      numero: String(infNFSe?.emit?.enderNac?.nro ?? ""),
      bairro: String(infNFSe?.emit?.enderNac?.xBairro ?? ""),
      municipio: String(infNFSe?.emit?.enderNac?.cMun ?? ""),
      uf: String(infNFSe?.emit?.enderNac?.UF ?? ""),
      cep: formatCep(String(infNFSe?.emit?.enderNac?.CEP ?? "")),
      optanteSimplesNacional: String(infDPS?.prest?.regTrib?.opSimpNac ?? ""),
      regimeApuracaoTributariaSN: String(
        infDPS?.prest?.regTrib?.regApTribSN ?? "",
      ),
    },
    tomador: {
      doc: formatCnpjCpf(
        String(infDPS?.toma?.CPF || infDPS?.toma?.CNPJ || ""),
      ),
      inscricaoMunicipal: String(infDPS?.toma?.IM || "-"),
      nome: String(infDPS?.toma?.xNome ?? ""),
      email: String(infDPS?.toma?.email ?? ""),
      fone: formatPhone(String(infDPS?.toma?.fone ?? "")),
      logradouro: String(infDPS?.toma?.end?.xLgr ?? ""),
      numero: String(infDPS?.toma?.end?.nro ?? ""),
      complemento: String(infDPS?.toma?.end?.xCpl ?? ""),
      bairro: String(infDPS?.toma?.end?.xBairro ?? ""),
      ibgeMunicipio: String(infDPS?.toma?.end?.endNac?.cMun ?? ""),
      cep: formatCep(String(infDPS?.toma?.end?.endNac?.CEP ?? "")),
    },
    servico: {
      codTribNac: String(infDPS?.serv?.cServ?.cTribNac ?? ""),
      codTribMun: String(infDPS?.serv?.cServ?.cTribMun || "-"),
      descricao: String(infDPS?.serv?.cServ?.xDescServ ?? ""),
      nbs: String(infDPS?.serv?.cServ?.cNBS ?? ""),
      infoComp: String(infDPS?.serv?.infoCompl?.xInfComp ?? ""),
    },
    valores: {
      servico: formatMoney(Number(infDPS?.valores?.vServPrest?.vServ ?? 0)),
      descontoIncondicionado: formatMoney(
        Number(infDPS?.valores?.vDescCondIncond?.vDescIncond ?? 0) || "-",
      ),
      totalDeducaoReducao: formatMoney(
        Number(infNFSe?.valores?.vCalcDR ?? 0) || "-",
      ),
      calculoBeneficioMunicipal: formatMoney(
        Number(infNFSe?.valores?.vCalcBM ?? 0) || "-",
      ),
      baseCalculoISSQN: formatMoney(Number(infNFSe?.valores?.vBC ?? 0) || "-"),
      ISSQN: formatMoney(Number(infNFSe?.valores?.vISSQN ?? 0) || "-"),
      IRRF: formatMoney(
        Number(infDPS?.valores?.trib?.tribFed?.vRetIRRF ?? 0) || "-",
      ),
      CP: formatMoney(
        Number(infDPS?.valores?.trib?.tribFed?.vRetCP ?? 0) || "-",
      ),
      CSLL: formatMoney(
        Number(infDPS?.valores?.trib?.tribFed?.vRetCSLL ?? 0) || "-",
      ),
      PIS: formatMoney(
        Number(infDPS?.valores?.trib?.tribFed?.piscofins?.vPis ?? 0) || "-",
      ),
      COFINS: formatMoney(
        Number(infDPS?.valores?.trib?.tribFed?.piscofins?.vCofins ?? 0) || "-",
      ),
      liquido: formatMoney(Number(infNFSe?.valores?.vLiq ?? 0)),
      totalTributosFederais: formatMoney(
        Number(infDPS?.valores?.trib?.totTrib?.vTotTrib?.vTotTribFed ?? 0),
      ),
      totalTributosEstaduais: formatMoney(
        Number(infDPS?.valores?.trib?.totTrib?.vTotTrib?.vTotTribEst ?? 0),
      ),
      totalTributosMunicipais: formatMoney(
        Number(infDPS?.valores?.trib?.totTrib?.vTotTrib?.vTotTribMun ?? 0),
      ),
      IrrfCpCsllRetidos: "",
      PisCofinsRetidos: "",
    },
    dps: {
      numero: String(infDPS?.nDPS ?? ""),
      serie: String(infDPS?.serie ?? ""),
      competencia: formatDate(String(infDPS?.dCompet ?? "")),
      dataEmissao: formatDateTime(String(infDPS?.dhEmi ?? "")),
    },
    tributacao: {
      tipoTributacaoISSQN: String(
        infDPS?.valores?.trib?.tribMun?.tribISSQN ?? "",
      ),
      regimeEspecialTributacao: String(
        infDPS?.prest?.regTrib?.regEspTrib ?? "",
      ),
      tipoImunidade: String(infDPS?.valores?.trib?.tribMun?.tpImunidade || "-"),
      tipoSuspensao: String(
        infDPS?.valores?.trib?.tribMun?.exigSusp?.tpSusp || "-",
      ),
      nProcessoSuspensao: String(
        infDPS?.valores?.trib?.tribMun?.exigSusp?.nProcesso || "-",
      ),
      nBeneficioMunicipal: String(
        infDPS?.valores?.trib?.tribMun?.BM?.nBM || "-",
      ),
      percentualAliquotaAplicadaISSQN: formatMoney(
        Number(infNFSe?.valores?.pAliqAplic ?? 0) || "-",
        2,
        true,
      ),
      tipoRetencaoISSQN: String(
        infDPS?.valores?.trib?.tribMun?.tpRetISSQN ?? "",
      ),
      tipoRetencaoPisCofins: String(
        infDPS?.valores?.trib?.tribFed?.piscofins?.tpRetPisCofins || "-",
      ),
    },
  };

  // Calculate PIS/COFINS Retidos
  let pisCofinsRetidos = 0;
  const tipoRetPisCofins = data.tributacao.tipoRetencaoPisCofins;
  if (["1", "3"].includes(tipoRetPisCofins)) {
    pisCofinsRetidos += Number(
      infDPS?.valores?.trib?.tribFed?.piscofins?.vPis ?? 0,
    );
  }
  if (["1", "4"].includes(tipoRetPisCofins)) {
    pisCofinsRetidos += Number(
      infDPS?.valores?.trib?.tribFed?.piscofins?.vCofins ?? 0,
    );
  }
  data.valores.PisCofinsRetidos = formatMoney(pisCofinsRetidos);

  // Calculate IRRF + CP + CSLL Retidos
  const irrfCpCsllRetidos =
    Number(infDPS?.valores?.trib?.tribFed?.vRetIRRF ?? 0) +
    Number(infDPS?.valores?.trib?.tribFed?.vRetCP ?? 0) +
    Number(infDPS?.valores?.trib?.tribFed?.vRetCSLL ?? 0);
  data.valores.IrrfCpCsllRetidos = formatMoney(irrfCpCsllRetidos);

  return data;
}

/**
 * Faz parse de um arquivo XML da NFS-e
 */
export function parseXmlFile(xmlFilePath: string): NfseCoreData {
  const xmlAbs = path.resolve(xmlFilePath);
  const xml = fs.readFileSync(xmlAbs, "utf-8");
  return parseXmlContent(xml);
}
