/**
 * Converte base64 para Buffer ou retorna o Data URI diretamente
 * O PDFKit aceita ambos os formatos
 */
export function processImageBase64(base64: string): string | Buffer {
  // Se já está no formato Data URI, retorna direto
  if (base64.startsWith('data:image/')) {
    return base64;
  }
  
  // Se é base64 puro, converte para Buffer
  try {
    return Buffer.from(base64, 'base64');
  } catch (error) {
    throw new Error('Formato de imagem base64 inválido');
  }
}
