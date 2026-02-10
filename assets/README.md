# Assets

Esta pasta contém os recursos estáticos utilizados pelo gerador de PDF da NFS-e.

## Estrutura

```
assets/
├── fonts/           # Fontes utilizadas no PDF
│   └── arial/       # Família de fontes Arial
│       └── *.TTF    # Arquivos de fonte
└── logo-nfse.png    # Logo oficial da NFS-e Nacional
```

## Logo NFS-e Nacional

**Arquivo:** `logo-nfse.png`
- Formato: PNG
- Dimensões: Proporcional para 40mm x 7.8mm no PDF
- Uso: Aparece automaticamente no cabeçalho de todas as notas fiscais

## Fontes Arial

As fontes Arial são necessárias para renderizar o PDF conforme o padrão da NFS-e Nacional.

**Arquivos necessários:**
- `ARIAL.TTF` - Normal
- `ArialMdm.ttf` - Semi-bold
- `ARIALBD.TTF` - Bold
- `ARIALI 1.TTF` - Italic
- `ArialMdmItl.ttf` - Semi-bold Italic
- `ARIALBI.TTF` - Bold Italic

## Notas

- Esta pasta é publicada junto com o pacote npm
- Os arquivos são carregados automaticamente pelo gerador
- Não é necessário configuração manual pelo usuário
