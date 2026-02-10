import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderValores(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const val = data.valores;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("VALOR TOTAL DA NFS-E", mm(col1X), mm(y0), { width: mm(200) });

  const y1 = y0 + 5;
  pdf.text("Valor do Serviço", mm(col1X), mm(y1), { width: mm(col1W) });
  pdf.text("Desconto Condicionado", mm(col2X), mm(y1), { width: mm(col2W) });
  pdf.text("Desconto Incondicionado", mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text("ISSQN Retido", mm(col4X), mm(y1), { width: mm(col4W) });

  const y2 = y1 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.servico, mm(col1X), mm(y2), { width: mm(col1W) });
  pdf.text("-", mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text("-", mm(col3X), mm(y2), { width: mm(col3W) });
  pdf.text("-", mm(col4X), mm(y2), { width: mm(col4W) });

  const y3 = y2 + 5;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("IRRF, CP, CSLL - Retidos", mm(col1X), mm(y3), {
    width: mm(col1W),
  });
  pdf.text("PIS/COFINS Retidos", mm(col2X), mm(y3), { width: mm(col2W) });
  pdf.text("Valor Líquido da NFS-e", mm(col4X), mm(y3), { width: mm(col4W) });

  const y4 = y3 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(val.IrrfCpCsllRetidos, mm(col1X), mm(y4), { width: mm(col1W) });
  pdf.text(val.PisCofinsRetidos, mm(col2X), mm(y4), { width: mm(col2W) });
  pdf.text(val.liquido, mm(col4X), mm(y4), { width: mm(col4W) });

  pdf.y = mm(y4 + 6);
}
