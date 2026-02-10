import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import { retencaoPisCofins } from "../utils/code-mappings";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderTributacaoFederal(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const val = data.valores;
  const trib = data.tributacao;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("TRIBUTAÇÃO FEDERAL", mm(col1X), mm(y0), { width: mm(200) });

  const y1 = y0 + 5;
  pdf.text("IRRF", mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text("CP", mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text("CSLL", mm(col3X), mm(y1), { width: mm(col3W) });

  const y2 = y1 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.IRRF, mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text(val.CP, mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text(val.CSLL, mm(col3X), mm(y2), { width: mm(col3W) });

  const y3 = y2 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("PIS", mm(col1X), mm(y3), { width: mm(col1W) });
  pdf.text("COFINS", mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text("Retenção do PIS/COFINS", mm(col3X), mm(y3), { width: mm(col3W) });
  pdf.text("TOTAL TRIBUTAÇÃO FEDERAL", mm(col4X), mm(y3), {
    width: mm(col4W),
  });

  const y4 = y3 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.PIS, mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text(val.COFINS, mm(col2X), mm(y4), { width: mm(col2W) });
  pdf.text(retencaoPisCofins(trib.tipoRetencaoPisCofins), mm(col3X), mm(y4), {
    width: mm(col3W),
  });
  pdf.text(val.totalTributosFederais, mm(col4X), mm(y4), {
    width: mm(col4W),
  });

  pdf.y = mm(y4 + 6);
}
