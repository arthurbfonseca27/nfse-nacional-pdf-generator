import PDFDocument from "pdfkit";
import { HeaderData, MunicipalityHeaderData, NfseCoreData } from "./types";
import { parseXmlContent } from "./utils/xml-parser";
import { mm } from "./utils/formatters";
import {
  addHorizontalLine,
  drawDocumentBorder,
} from "./utils/drawing-utils";
import { renderHeader } from "./sections/header";
import { renderDadosNfse } from "./sections/dados-nfse";
import { renderEmitente } from "./sections/emitente";
import { renderTomador } from "./sections/tomador";
import { renderIntermediario } from "./sections/intermediario";
import { renderServico } from "./sections/servico";
import { renderTributacaoMunicipal } from "./sections/tributacao-municipal";
import { renderTributacaoFederal } from "./sections/tributacao-federal";
import { renderValores } from "./sections/valores";
import { renderTotaisTributos } from "./sections/totais-tributos";
import { renderInformacoesComplementares } from "./sections/informacoes-complementares";
import { LAYOUT_CONSTANTS } from "./utils/layout-constants";
import { registerFonts } from "./utils/font-manager";

export class NfsePdfGenerator {
  private pdf: PDFKit.PDFDocument;
  private header: HeaderData = {};
  private municipality: MunicipalityHeaderData = {};
  private data?: NfseCoreData;
  private font = "Arial";

  constructor(
    author = "NFS-e System",
    creator = "NFS-e PDF Generator",
    subject = "Documento Auxiliar da NFS-e",
  ) {
    this.pdf = new PDFDocument({
      size: [
        mm(LAYOUT_CONSTANTS.pageWidthMm),
        mm(LAYOUT_CONSTANTS.pageHeightMm),
      ],
      layout: "portrait",
      autoFirstPage: false,
      margins: {
        top: mm(LAYOUT_CONSTANTS.margin),
        right: mm(LAYOUT_CONSTANTS.margin),
        bottom: mm(LAYOUT_CONSTANTS.margin),
        left: mm(LAYOUT_CONSTANTS.margin),
      },
    });

    this.pdf.info.Author = author;
    this.pdf.info.Creator = creator;
    this.pdf.info.Subject = subject;

    // Registrar fontes customizadas
    registerFonts(this.pdf);

    this.pdf.font(this.font).fontSize(8);
  }

  public setHeader(data: HeaderData) {
    this.header = { ...this.header, ...data };
    return this;
  }

  public setMunicipality(data: MunicipalityHeaderData) {
    this.municipality = { ...this.municipality, ...data };
    return this;
  }

  public parseXml(xmlContent: string) {
    this.data = parseXmlContent(xmlContent);
    return this;
  }

  public async generate(): Promise<PDFKit.PDFDocument> {
    if (!this.data) throw new Error("Chame parseXml() antes de generate()");

    this.pdf.addPage({
      size: [
        mm(LAYOUT_CONSTANTS.pageWidthMm),
        mm(LAYOUT_CONSTANTS.pageHeightMm),
      ],
      margins: {
        top: mm(LAYOUT_CONSTANTS.margin),
        right: mm(LAYOUT_CONSTANTS.margin),
        bottom: mm(LAYOUT_CONSTANTS.margin),
        left: mm(LAYOUT_CONSTANTS.margin),
      },
    });

    renderHeader(
      this.pdf,
      this.header,
      this.municipality,
      LAYOUT_CONSTANTS.margin,
      this.font,
    );
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    await renderDadosNfse(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderEmitente(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderTomador(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderIntermediario(this.pdf);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderServico(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderTributacaoMunicipal(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderTributacaoFederal(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderValores(this.pdf, this.data, this.font);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderTotaisTributos(this.pdf, this.data);
    addHorizontalLine(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.margin,
    );

    renderInformacoesComplementares(this.pdf, this.data, this.font);

    drawDocumentBorder(
      this.pdf,
      LAYOUT_CONSTANTS.pageWidthMm,
      LAYOUT_CONSTANTS.pageHeightMm,
      LAYOUT_CONSTANTS.margin,
    );

    return this.pdf;
  }
}
