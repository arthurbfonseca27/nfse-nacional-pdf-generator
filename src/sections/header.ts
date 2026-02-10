import fs from "fs";
import path from "path";
import { HeaderData, MunicipalityHeaderData } from "../types";
import { mm } from "../utils/formatters";

export function renderHeader(
  pdf: PDFKit.PDFDocument,
  header: HeaderData,
  municipality: MunicipalityHeaderData,
  margin: number,
  font: string,
): void {
  const startYmm = margin + 0.2;
  const startXmm = margin + 0.8;
  const centerXmm = 64;
  const col4Xmm = 147;

  if (header.nfseLogoPath) {
    const nfseLogo = path.resolve(header.nfseLogoPath);
    if (fs.existsSync(nfseLogo)) {
      pdf.image(nfseLogo, mm(startXmm), mm(startYmm), {
        width: mm(40),
        height: mm(7.8),
      });
    }
  }

  if (header.danfseVersionText) {
    pdf
      .font("Arial-Semibold")
      .fontSize(10)
      .text(header.danfseVersionText, mm(centerXmm), mm(startYmm + 0.5), {
        width: mm(50),
        align: "center",
      });
  }

  if (header.titleText) {
    pdf
      .font("Arial-Semibold")
      .fontSize(10)
      .text(header.titleText, mm(centerXmm), mm(startYmm + 4), {
        width: mm(50),
        align: "center",
      });
  }

  if (municipality.imagePath) {
    const munLogo = path.resolve(municipality.imagePath);
    if (fs.existsSync(munLogo)) {
      pdf.image(munLogo, mm(col4Xmm - 15), mm(startYmm), {
        fit: [mm(14), mm(8)],
        align: "center",
        valign: "center",
      });
    }
  }

  let rowYmm = startYmm;

  if (municipality.name) {
    pdf
      .font(`${font}-Bold`)
      .fontSize(8)
      .text(municipality.name, mm(col4Xmm), mm(rowYmm), {
        width: mm(57),
        align: "left",
      });
    rowYmm += 3;
  }

  pdf.font(font).fontSize(6);

  if (municipality.department) {
    pdf.text(municipality.department, mm(col4Xmm), mm(rowYmm), {
      width: mm(57),
      align: "left",
    });
    rowYmm += 2.5;
  }

  if (municipality.phone) {
    pdf.text(municipality.phone, mm(col4Xmm), mm(rowYmm), {
      width: mm(57),
      align: "left",
    });
    rowYmm += 2.5;
  }

  if (municipality.email) {
    pdf.text(municipality.email, mm(col4Xmm), mm(rowYmm), {
      width: mm(57),
      align: "left",
    });
  }

  pdf.y = mm(startYmm + 13);
}
