import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderInformacoesComplementares(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text(
    "INFORMAÇÕES COMPLEMENTARES",
    mm(LAYOUT_CONSTANTS.columns.col1X),
    mm(y0),
    { width: mm(200) },
  );

  const y1 = y0 + 5;
  if (data.servico.infoComp || data.servico.nbs) {
    let infoComp = data.servico.infoComp || "";
    if (infoComp) infoComp += "\n";
    infoComp += `NBS: ${data.servico.nbs}`;

    pdf.font(font).fontSize(8);
    pdf.text(infoComp, mm(LAYOUT_CONSTANTS.columns.col1X), mm(y1), {
      width: mm(200),
    });
  }

  pdf.y = mm(y1 + 5);
}
