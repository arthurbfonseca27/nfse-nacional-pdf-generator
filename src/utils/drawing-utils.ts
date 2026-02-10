import QRCode from "qrcode";
import { mm } from "./formatters";

export async function drawQrCode(
  pdf: PDFKit.PDFDocument,
  url: string,
  xMm: number,
  yMm: number,
  sizeMm: number,
): Promise<void> {
  const png = await QRCode.toBuffer(url, {
    type: "png",
    errorCorrectionLevel: "M",
    margin: 0,
    scale: 8,
  });

  pdf.image(png, mm(xMm), mm(yMm), {
    width: mm(sizeMm),
    height: mm(sizeMm),
  });
}

export function drawDocumentBorder(
  pdf: PDFKit.PDFDocument,
  pageWidthMm: number,
  pageHeightMm: number,
  margin: number,
): void {
  const x1 = margin - 2.5;
  const y1 = margin - 2.5;
  const width = pageWidthMm - (2 * margin - 5);
  const height = pageHeightMm - (2 * margin - 5);

  pdf.lineWidth(mm(0.35));
  pdf.rect(mm(x1), mm(y1), mm(width), mm(height)).stroke();
}

export function addHorizontalLine(
  pdf: PDFKit.PDFDocument,
  pageWidthMm: number,
  margin: number,
): void {
  const y = pdf.y - 6;
  const x1 = mm(margin - 0.5);
  const x2 = mm(pageWidthMm - margin);
  pdf.lineWidth(mm(0.1)).moveTo(x1, y).lineTo(x2, y).stroke();
  pdf.moveDown(0.5);
}
