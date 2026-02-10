import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import {
  tributacaoISSQN,
  regimeEspecialTributacao,
  tipoImunidade,
  suspensaoExigibilidadeISSQN,
  tipoRetencaoISSQN,
} from "../utils/code-mappings";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderTributacaoMunicipal(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const trib = data.tributacao;
  const val = data.valores;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("TRIBUTAÇÃO MUNICIPAL", mm(col1X), mm(y0), { width: mm(200) });

  const y1 = y0 + 5;
  pdf.text("Tributação do ISSQN", mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text("País Resultado da Prestação do Serviço", mm(col2X), mm(y1), {
    width: mm(col2W),
  });
  pdf.text("Município de Incidência do ISSQN", mm(col3X), mm(y1), {
    width: mm(col3W),
  });
  pdf.text("Regime Especial de Tributação", mm(col4X), mm(y1), {
    width: mm(col4W),
  });

  const y2 = y1 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(tributacaoISSQN(trib.tipoTributacaoISSQN), mm(col1X), mm(y2), {
    width: mm(col1W),
  });
  pdf.text("-", mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text(data.localIncidencia, mm(col3X), mm(y2), { width: mm(col3W) });
  pdf.text(
    regimeEspecialTributacao(trib.regimeEspecialTributacao),
    mm(col4X),
    mm(y2),
    { width: mm(col4W) },
  );

  const y3 = y2 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Tipo de Imunidade", mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text("Suspensão da Exigibilidade do ISSQN", mm(col2X), mm(y3), {
    width: mm(col2W),
  });
  pdf.text("Número Processo Suspensão", mm(col3X), mm(y3), {
    width: mm(col3W),
  });
  pdf.text("Benefício Municipal", mm(col4X), mm(y3), { width: mm(col4W) });

  const y4 = y3 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(tipoImunidade(trib.tipoImunidade), mm(col1X), mm(y4), {
    width: mm(col1W),
  });
  pdf.text(
    suspensaoExigibilidadeISSQN(trib.tipoSuspensao),
    mm(col2X),
    mm(y4),
    { width: mm(col2W) },
  );
  pdf.text(trib.nProcessoSuspensao, mm(col3X), mm(y4), { width: mm(col3W) });
  pdf.text(trib.nBeneficioMunicipal, mm(col4X), mm(y4), { width: mm(col4W) });

  const y5 = y4 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Valor do Serviço", mm(col1X), mm(y5), { width: mm(col1W) });
  pdf.text("Desconto Incondicionado", mm(col2X), mm(y5), {
    width: mm(col2W),
  });
  pdf.text("Total Deduções/Reduções", mm(col3X), mm(y5), {
    width: mm(col3W),
  });
  pdf.text("Cálculo do BM", mm(col4X), mm(y5), { width: mm(col4W) });

  const y6 = y5 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.servico, mm(col1X), mm(y6), { width: mm(col1W) });
  pdf.text(val.descontoIncondicionado, mm(col2X), mm(y6), {
    width: mm(col2W),
  });
  pdf.text(val.totalDeducaoReducao, mm(col3X), mm(y6), { width: mm(col3W) });
  pdf.text(val.calculoBeneficioMunicipal, mm(col4X), mm(y6), {
    width: mm(col4W),
  });

  const y7 = y6 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("BC ISSQN", mm(col1X), mm(y7), { width: mm(col1W) });
  pdf.text("Alíquota Aplicada", mm(col2X), mm(y7), { width: mm(col2W) });
  pdf.text("Retenção do ISSQN", mm(col3X), mm(y7), { width: mm(col3W) });
  pdf.text("ISSQN Apurado", mm(col4X), mm(y7), { width: mm(col4W) });

  const y8 = y7 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.baseCalculoISSQN, mm(col1X), mm(y8), { width: mm(col1W) });
  pdf.text(trib.percentualAliquotaAplicadaISSQN, mm(col2X), mm(y8), {
    width: mm(col2W),
  });
  pdf.text(tipoRetencaoISSQN(trib.tipoRetencaoISSQN), mm(col3X), mm(y8), {
    width: mm(col3W),
  });
  pdf.text(val.ISSQN, mm(col4X), mm(y8), { width: mm(col4W) });

  pdf.y = mm(y8 + 6);
}
