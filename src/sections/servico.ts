import { NfseCoreData } from "../types";
import { mm, pxToMm, formatCodTribNac, truncateText } from "../utils/formatters";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export function renderServico(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): void {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const serv = data.servico;
  const y0 = pxToMm(pdf.y - 8);

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("SERVIÇO PRESTADO", mm(col1X), mm(y0), { width: mm(200) });

  const y1 = y0 + 5;
  pdf.text("Código de Tributação Nacional", mm(col1X), mm(y1), {
    width: mm(col1W),
  });
  pdf.text("Código de Tributação Municipal", mm(col2X), mm(y1), {
    width: mm(col2W),
  });
  pdf.text("Local da Prestação", mm(col3X), mm(y1), { width: mm(col3W) });
  pdf.text("País da Prestação", mm(col4X), mm(y1), { width: mm(col4W) });

  const tribNacTruncated = truncateText(data.tribNac, 60);
  const codTribNac = `${formatCodTribNac(serv.codTribNac)} - ${tribNacTruncated}`;
  const y2 = y1 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(codTribNac, mm(col1X), mm(y2 - 0.7), { width: mm(col1W - 5) });
  pdf.text(serv.codTribMun, mm(col2X), mm(y2), { width: mm(col2W) });
  pdf.text(data.localPrestacao, mm(col3X), mm(y2), { width: mm(col3W) });
  pdf.text("-", mm(col4X), mm(y2), { width: mm(col4W) });

  const y3 = y2 + 8;
  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Descrição do Serviço", mm(col1X), mm(y3 + 1), { width: mm(col1W) });

  const y4 = y3 + 4;
  pdf.font(font).fontSize(8);
  pdf.text(serv.descricao, mm(col1X), mm(y4), {
    width: mm(col2W + col3W + col4W),
  });

  pdf.y = mm(y4 + 6);
}
