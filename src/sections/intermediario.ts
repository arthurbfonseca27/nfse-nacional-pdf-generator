import { mm, pxToMm } from "../utils/formatters";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderIntermediario(
  pdf: PDFKit.PDFDocument,
): void {
  const y = pxToMm(pdf.y);
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text(
    "INTERMEDIÁRIO DO SERVIÇO NÃO IDENTIFICADO NA NFS-e",
    mm(LAYOUT_CONSTANTS.columns.col1X),
    mm(y - 3),
    { align: "center" },
  );
  pdf.y = mm(y + 3);
}
