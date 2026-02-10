import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderTotaisTributos(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
): void {
  const colW = 65;
  const col1X = LAYOUT_CONSTANTS.columns.col1X;
  const col2X = col1X + colW;
  const col3X = col2X + colW + 4;

  const val = data.valores;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("TOTAIS APROXIMADOS DOS TRIBUTOS", mm(col1X), mm(y0), {
    width: mm(200),
  });

  const y1 = y0 + 5;
  pdf.text("Federais", mm(col1X), mm(y1), {
    width: mm(colW),
    align: "center",
  });
  pdf.text("Estaduais", mm(col2X), mm(y1), {
    width: mm(colW + 4),
    align: "center",
  });
  pdf.text("Municípios", mm(col3X), mm(y1), {
    width: mm(colW),
    align: "center",
  });

  const y2 = y1 + 4;
  pdf.font("Arial").fontSize(8);
  pdf.text(val.totalTributosFederais, mm(col1X), mm(y2), {
    width: mm(colW),
    align: "center",
  });
  pdf.text(val.totalTributosEstaduais, mm(col2X), mm(y2), {
    width: mm(colW + 4),
    align: "center",
  });
  pdf.text(val.totalTributosMunicipais, mm(col3X), mm(y2), {
    width: mm(colW),
    align: "center",
  });

  pdf.y = mm(y2 + 6);
}
