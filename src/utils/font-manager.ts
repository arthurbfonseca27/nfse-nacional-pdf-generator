import path from "path";

export const FONTS = {
  arial: {
    normal: path.resolve(__dirname, "../../assets/fonts/arial/ARIAL.TTF"),
    semibold: path.resolve(__dirname, "../../assets/fonts/arial/ArialMdm.ttf"),
    bold: path.resolve(__dirname, "../../assets/fonts/arial/ARIALBD.TTF"),
    italic: path.resolve(__dirname, "../../assets/fonts/arial/ARIALI 1.TTF"),
    semiboldItalic: path.resolve(__dirname, "../../assets/fonts/arial/ArialMdmItl.ttf"),
    boldItalic: path.resolve(__dirname, "../../assets/fonts/arial/ARIALBI.TTF"),
  },
} as const;

export function registerFonts(pdf: PDFKit.PDFDocument): void {
  pdf.registerFont("Arial", FONTS.arial.normal);
  pdf.registerFont("Arial-Semibold", FONTS.arial.semibold);
  pdf.registerFont("Arial-Bold", FONTS.arial.bold);
  pdf.registerFont("Arial-Italic", FONTS.arial.italic);
  pdf.registerFont("Arial-SemiboldItalic", FONTS.arial.semiboldItalic);
  pdf.registerFont("Arial-BoldItalic", FONTS.arial.boldItalic);
}
