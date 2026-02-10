# NFS-e PDF Generator

Gerador de PDF para NFS-e Nacional (Nota Fiscal de Serviços Eletrônica) seguindo o padrão da Nota Fiscal Brasil.

## 📦 Instalação

```bash
npm install @ninepay/nfse-pdf-generator
```

## 🚀 Uso Básico

```typescript
import { NfsePdfGenerator } from '@ninepay/nfse-pdf-generator';
import fs from 'fs';

async function gerarPDF() {
  // Criar instância do gerador
  const generator = new NfsePdfGenerator();
  
  // Configurar dados do município (opcional)
  generator.setMunicipality({
    name: 'Prefeitura Municipal',
    department: 'Secretaria de Fazenda',
    phone: '(11) 1234-5678',
    email: 'contato@prefeitura.gov.br',
    imageBase64: 'data:image/png;base64,iVBORw0KGgoAAAANS...' // opcional
  });
  
  // Fazer parse do XML (string)
  const xmlContent = fs.readFileSync('./nfse.xml', 'utf-8');
  generator.parseXml(xmlContent);
  
  // Gerar PDF
  const pdfDoc = await generator.generate();
  
  // Salvar em arquivo
  pdfDoc.pipe(fs.createWriteStream('nota-fiscal.pdf'));
  pdfDoc.end();
}

gerarPDF();
```

## 📖 Exemplo Completo

```typescript
import { NfsePdfGenerator } from '@ninepay/nfse-pdf-generator';
import fs from 'fs';

async function main() {
  try {
    // Ler o conteúdo XML
    const xmlContent = fs.readFileSync('./nfse-exemplo.xml', 'utf-8');
    
    // Converter logo do município para base64
    const brasaoMunicipio = fs.readFileSync('./brasao-sp.png').toString('base64');
    
    const generator = new NfsePdfGenerator(
      'Minha Empresa', // author
      'Sistema de NFS-e', // creator
      'Documento Auxiliar da NFS-e' // subject
    );
    
    // Configurar dados do município (opcional)
    generator.setMunicipality({
      name: 'Prefeitura de São Paulo',
      department: 'Secretaria Municipal de Fazenda',
      phone: '(11) 3113-9000',
      email: 'atendimento@prefeitura.sp.gov.br',
      imageBase64: `data:image/png;base64,${brasaoMunicipio}`
    });
    
    // Parse do conteúdo XML da NFS-e
    generator.parseXml(xmlContent);
    
    // Gerar PDF
    const pdf = await generator.generate();
    
    // Salvar arquivo
    const outputPath = './output/nfse-gerada.pdf';
    pdf.pipe(fs.createWriteStream(outputPath));
    pdf.end();
    
    console.log(`✅ PDF gerado com sucesso: ${outputPath}`);
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error);
  }
}

main();
```

## 🎨 Personalização

### Cabeçalho (Header)

O cabeçalho da NFS-e possui valores **fixos e internos** que aparecem automaticamente em todas as notas:
- Logo da NFS-e Nacional
- Texto "DANFSE - Documento Auxiliar da Nota Fiscal de Serviços Eletrônica"
- Título "NFS-e Nacional"

Esses elementos não precisam (e não podem) ser configurados, garantindo padronização.

### Dados do Município

```typescript
generator.setMunicipality({
  name?: string,         // Nome do município/prefeitura
  department?: string,   // Departamento/secretaria
  phone?: string,        // Telefone de contato
  email?: string,        // Email de contato
  imageBase64?: string   // Brasão/logo em Data URI ou base64 puro (opcional)
                         // Formato: 'data:image/png;base64,iVBORw0KGg...' ou 'iVBORw0KGg...'
});
```

### 🖼️ Formato de Imagens

#### Logo NFS-e
A logo da NFS-e é **interna e fixa**, carregada automaticamente pelo gerador. Não é necessário fornecê-la.

#### Logo do Município
A logo do município aceita **Data URI ou base64 puro**:

```typescript
// Opção 1: Data URI
const imageBuffer = fs.readFileSync('./brasao.png');
const base64 = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64}`;

generator.setMunicipality({
  imageBase64: dataUri
});

// Opção 2: Base64 puro
generator.setMunicipality({
  imageBase64: base64
});
```

Formatos suportados: `png`, `jpg`, `jpeg`

## 📁 Estrutura do XML

O gerador aceita o conteúdo XML no padrão NFS-e Nacional como string. Exemplo de estrutura mínima:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<NFSe>
  <infNFSe Id="NFS12345678901234567890123456789012345678901234">
    <nNFSe>123456</nNFSe>
    <dhProc>2024-01-15T10:30:00-03:00</dhProc>
    <emit>
      <CNPJ>12345678000190</CNPJ>
      <xNome>Empresa Prestadora LTDA</xNome>
      <!-- mais campos do emitente -->
    </emit>
    <DPS>
      <infDPS>
        <toma>
          <CNPJ>98765432000100</CNPJ>
          <xNome>Cliente Tomador LTDA</xNome>
          <!-- mais campos do tomador -->
        </toma>
        <serv>
          <!-- dados do serviço -->
        </serv>
        <valores>
          <!-- valores da nota -->
        </valores>
      </infDPS>
    </DPS>
  </infNFSe>
</NFSe>
```

## 🔧 API

### `new NfsePdfGenerator(author?, creator?, subject?)`

Cria uma nova instância do gerador.


### `setMunicipality(data: MunicipalityHeaderData): this`

Define os dados do município.

**Parâmetros:**
```typescript
{
  name?: string;
  department?: string;
  phone?: string;
  email?: string;
  imageBase64?: string; // Data URI ou base64 puro
}
```

### `parseXml(xmlContent: string): this`

Faz o parse do conteúdo XML da NFS-e.

**Parâmetros:**
- `xmlContent`: String contendo o conteúdo XML da NFS-e

**Retorna:** `this` (para encadeamento)

**Lança:** Error se o XML for inválido

**Exemplo:**
```typescript
const xmlContent = fs.readFileSync('./nfse.xml', 'utf-8');
generator.parseXml(xmlContent);
```

### `async generate(): Promise<PDFKit.PDFDocument>`

Gera o documento PDF.

**Retorna:** Promise com o documento PDFKit

**Lança:** Error se `parseXml()` não foi chamado antes

**Exemplo:**
```typescript
const pdf = await generator.generate();
pdf.pipe(fs.createWriteStream('output.pdf'));
pdf.end();
```

## 📋 Requisitos

- Node.js >= 14
- TypeScript >= 4.5 (se usar TypeScript)

## 📝 Licença

MIT
