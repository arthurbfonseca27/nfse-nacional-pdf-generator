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
  
  // Configurar cabeçalho (opcional)
  generator.setHeader({
    danfseVersionText: 'DANFSE - Documento Auxiliar da Nota Fiscal de Serviços Eletrônica',
    titleText: 'NFS-e Nacional',
    nfseLogoBase64: 'data:image/png;base64,iVBORw0KGgoAAAANS...' // opcional
  });
  
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
    
    // Converter imagens para base64 (opcional)
    const nfseLogo = fs.readFileSync('./logo-nfse.png').toString('base64');
    const brasaoMunicipio = fs.readFileSync('./brasao-sp.png').toString('base64');
    
    const generator = new NfsePdfGenerator(
      'Minha Empresa', // author
      'Sistema de NFS-e', // creator
      'Documento Auxiliar da NFS-e' // subject
    );
    
    // Configurações opcionais
    generator
      .setHeader({
        danfseVersionText: 'DANFSE - Versão 1.0',
        titleText: 'Nota Fiscal de Serviços Eletrônica',
        nfseLogoBase64: `data:image/png;base64,${nfseLogo}`
      })
      .setMunicipality({
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

```typescript
generator.setHeader({
  danfseVersionText?: string,  // Texto da versão do DANFSE
  titleText?: string,          // Título principal
  nfseLogoBase64?: string      // Logo da NFS-e em base64 (opcional)
                               // Formato: 'data:image/png;base64,iVBORw0KGg...'
});
```

### Dados do Município

```typescript
generator.setMunicipality({
  name?: string,         // Nome do município/prefeitura
  department?: string,   // Departamento/secretaria
  phone?: string,        // Telefone de contato
  email?: string,        // Email de contato
  imageBase64?: string   // Brasão/logo em base64 (opcional)
                         // Formato: 'data:image/png;base64,iVBORw0KGg...'
});
```

### 🖼️ Formato de Imagens Base64

As imagens devem estar no formato Data URI:

```typescript
// Exemplo de conversão
import fs from 'fs';

const imageBuffer = fs.readFileSync('./imagem.png');
const base64 = imageBuffer.toString('base64');
const dataUri = `data:image/png;base64,${base64}`;

generator.setHeader({
  nfseLogoBase64: dataUri
});
```

Formatos suportados: `png`, `jpg`, `jpeg`

## 📋 Requisitos

- Node.js >= 14
- TypeScript >= 4.5 (se usar TypeScript)

## 📝 Licença

ISC
