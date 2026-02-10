import { HeaderData, MunicipalityHeaderData } from "../types";
import { mm } from "../utils/formatters";
import { processImageBase64 } from "../utils/image-helper";

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

  // Logo NFS-e
  if (header.nfseLogoBase64) {
    try {
      const imageData = processImageBase64(header.nfseLogoBase64);
      pdf.image(imageData, mm(startXmm), mm(startYmm), {
        width: mm(40),
        height: mm(7.8),
      });
    } catch (error) {
      // Ignora se a imagem for inválida
      console.warn('Erro ao processar logo NFS-e:', error);
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

  // Logo/Brasão do Município
  if (municipality.imageBase64) {
    try {
      const imageData = processImageBase64(municipality.imageBase64);
      pdf.image(imageData, mm(col4Xmm - 15), mm(startYmm), {
        fit: [mm(14), mm(8)],
        align: "center",
        valign: "center",
      });
    } catch (error) {
      // Ignora se a imagem for inválida
      console.warn('Erro ao processar logo do município:', error);
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
