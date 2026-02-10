# NFS-e Nacional PDF Generator

Gerador de PDF para NFS-e Nacional (Nota Fiscal de Serviços Eletrônica) seguindo o padrão da Nota Fiscal Nacional.

## 📦 Instalação

```bash
npm install nfse-nacional-pdf-generator
```

## 🚀 Uso Básico

```typescript
import { NfsePdfGenerator } from 'nfse-nacional-pdf-generator';
import fs from 'fs';

async function gerarPDF() {
  // Criar instância do gerador
  const generator = new NfsePdfGenerator();
  
  // Configurar cabeçalho (opcional)
  generator.setHeader({
    danfseVersionText: 'DANFSE - Documento Auxiliar da Nota Fiscal de Serviços Eletrônica',
    titleText: 'NFS-e Nacional',
    nfseLogoPath: './assets/logo-nfse.png' // opcional
  });
  
  // Configurar dados do município (opcional)
  generator.setMunicipality({
    name: 'Prefeitura Municipal',
    department: 'Secretaria de Fazenda',
    phone: '(11) 1234-5678',
    email: 'contato@prefeitura.gov.br',
    imagePath: './assets/brasao.png' // opcional
  });
  
  // Fazer parse do XML
  generator.parseXml('./caminho/para/nfse.xml');
  
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
import { NfsePdfGenerator } from 'nfse-nacional-pdf-generator';
import fs from 'fs';
import path from 'path';

async function main() {
  try {
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
        nfseLogoPath: path.resolve(__dirname, '../assets/logo-nfse.png')
      })
      .setMunicipality({
        name: 'Prefeitura de São Paulo',
        department: 'Secretaria Municipal de Fazenda',
        phone: '(11) 3113-9000',
        email: 'atendimento@prefeitura.sp.gov.br',
        imagePath: path.resolve(__dirname, '../assets/brasao-sp.png')
      });
    
    // Parse do XML da NFS-e
    generator.parseXml('./nfse-exemplo.xml');
    
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
  danfseVersionText: string,  // Texto da versão do DANFSE
  titleText: string,           // Título principal
  nfseLogoPath: string         // Caminho para logo da NFS-e (opcional)
});
```

### Dados do Município

```typescript
generator.setMunicipality({
  name: string,         // Nome do município/prefeitura
  department: string,   // Departamento/secretaria
  phone: string,        // Telefone de contato
  email: string,        // Email de contato
  imagePath: string     // Caminho para brasão/logo (opcional)
});
```

## 📋 Requisitos

- Node.js >= 14
- TypeScript >= 4.5 (se usar TypeScript)

## 📝 Licença

ISC
