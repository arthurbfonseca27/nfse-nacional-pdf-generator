import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import {
  optanteSimplesNacional,
  regimeApuracaoTributariaSN,
} from "../utils/code-mappings";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderEmitente(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const emit = data.emitente;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("EMITENTE DA NFS-e", mm(col1X), mm(y0), { width: mm(col1W) });
  pdf.text("CNPJ / CPF / NIF", mm(col2X), mm(y0), { width: mm(col2W) });
  pdf.text("Inscrição Municipal", mm(col3X), mm(y0), { width: mm(col3W) });
  pdf.text("Telefone", mm(col4X), mm(y0), { width: mm(col4W) });

  const y1 = y0 + 5;
  pdf.font(font).fontSize(8);
  pdf.text("Prestador do Serviço", mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text(emit.cnpj, mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text(emit.inscricaoMunicipal, mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text(emit.fone, mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Nome / Nome Empresarial", mm(col1X), mm(y2), {
    width: mm(col1W),
  });
  pdf.text("E-mail", mm(col3X), mm(y2), { width: mm(col3W) });

  const y3 = y2 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(emit.nome, mm(col1X), mm(y3), { width: mm(col1W + col2W) });
  pdf.text(emit.email, mm(col3X), mm(y3), { width: mm(col3W) });

  const y4 = y3 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Endereço", mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text("Município", mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text("CEP", mm(col4X), mm(y4), { width: mm(col4W) });

  const endereco = `${emit.logradouro}, ${emit.numero}, ${emit.bairro}`;
  const y5 = y4 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(endereco, mm(col1X), mm(y5), { width: mm(col1W + col2W) });
  pdf.text(`${data.localEmissao} - ${emit.uf}`, mm(col3X), mm(y5), {
    width: mm(col3W),
  });
  pdf.text(emit.cep, mm(col4X), mm(y5), { width: mm(col4W) });

  const y6 = y5 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Simples Nacional na Data de Competência", mm(col1X), mm(y6), {
    width: mm(col1W + 10),
  });
  pdf.text("Regime de Apuração Tributária pelo SN", mm(col3X), mm(y6), {
    width: mm(col3W + col4W),
  });

  const y7 = y6 + 3;
  pdf.font(font).fontSize(8);
  pdf.text(optanteSimplesNacional(emit.optanteSimplesNacional), mm(col1X), mm(y7), {
    width: mm(col1W),
  });
  pdf.text(
    regimeApuracaoTributariaSN(emit.regimeApuracaoTributariaSN),
    mm(col3X),
    mm(y7),
    { width: mm(col3W + col4W) },
  );

  pdf.y = mm(y7 + 6);
}
