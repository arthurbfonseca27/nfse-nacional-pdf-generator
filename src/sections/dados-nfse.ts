import { NfseCoreData } from "../types";
import { mm, pxToMm } from "../utils/formatters";
import { drawQrCode } from "../utils/drawing-utils";
import { LAYOUT_CONSTANTS } from "../utils/layout-constants";

export async function renderDadosNfse(
  pdf: PDFKit.PDFDocument,
  data: NfseCoreData,
  font: string,
): Promise<void> {
  const { col1X, col2X, col3X, col4X, col1W, col2W, col3W, col4W } =
    LAYOUT_CONSTANTS.columns;

  const y0 = pxToMm(pdf.y - 6);

  pdf
    .font("Arial-Semibold")
    .fontSize(8)
    .text("Chave de Acesso da NFS-e", mm(col1X), mm(y0), {
      width: mm(col1W + col2W + col3W + col4W),
      align: "left",
    });

  pdf
    .font(font)
    .fontSize(8)
    .text(data.chaveAcesso, mm(col1X), mm(y0 + 3), {
      width: mm(col1W + col2W + col3W + col4W),
      align: "left",
    });

  const y1 = y0 + 8;

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Número da NFS-e", mm(col1X), mm(y1), {
    width: mm(col1W),
    align: "left",
  });
  pdf.text("Competência da NFS-e", mm(col2X), mm(y1), {
    width: mm(col2W),
    align: "left",
  });
  pdf.text("Data e Hora da emissão da NFS-e", mm(col3X), mm(y1), {
    width: mm(col3W),
    align: "left",
  });

  const y2 = y1 + 3;

  pdf.font(font).fontSize(8);
  pdf.text(data.numeroNfse, mm(col1X), mm(y2), {
    width: mm(col1W),
    align: "left",
  });
  pdf.text(data.competenciaDps, mm(col2X), mm(y2), {
    width: mm(col2W),
    align: "left",
  });
  pdf.text(data.dataEmissaoNfse, mm(col3X), mm(y2), {
    width: mm(col3W),
    align: "left",
  });

  const y3 = y2 + 6;

  pdf.font("Arial-Semibold").fontSize(8);
  pdf.text("Número da DPS", mm(col1X), mm(y3), {
    width: mm(col1W),
    align: "left",
  });
  pdf.text("Série da DPS", mm(col2X), mm(y3), {
    width: mm(col2W),
    align: "left",
  });
  pdf.text("Data e Hora da emissão da DPS", mm(col3X), mm(y3), {
    width: mm(col3W),
    align: "left",
  });

  const y4 = y3 + 4;

  pdf.font(font).fontSize(8);
  pdf.text(data.numeroDps, mm(col1X), mm(y4), {
    width: mm(col1W),
    align: "left",
  });
  pdf.text(data.serieDps, mm(col2X), mm(y4), {
    width: mm(col2W),
    align: "left",
  });
  pdf.text(data.dataEmissaoDps, mm(col3X), mm(y4), {
    width: mm(col3W),
    align: "left",
  });

  pdf.font(font).fontSize(6);
  const msg =
    "A autenticidade desta NFS-e pode ser verificada pela leitura deste código QR ou pela consulta da chave de acesso no portal nacional da NFS-e";
  pdf.text(msg, mm(col4X), mm(y4 - 4), {
    width: mm(col4W - 1),
    align: "left",
  });

  pdf.y = mm(y4 + 8);

  const qrUrl = `https://www.nfse.gov.br/ConsultaPublica?tpc=1&chave=${data.chaveAcesso}`;

  const qrSize = 15;
  const qrX = col4X + col4W / 2 - qrSize / 2 - 1;
  const qrY = y0 + 0.8;

  await drawQrCode(pdf, qrUrl, qrX, qrY, qrSize);
}
