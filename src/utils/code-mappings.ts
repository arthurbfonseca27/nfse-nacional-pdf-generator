export function optanteSimplesNacional(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Não Optante",
    "2": "Optante - Microempreendedor Individual (MEI)",
    "3": "Optante - Microempresa ou Empresa de Pequeno Porte (ME/EPP)",
  };
  return map[codigo] || "-";
}

export function regimeApuracaoTributariaSN(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Regime de apuração dos tributos federais e municipal pelo SN",
    "2": "Regime de apuração dos tributos federais pelo SN e o ISSQN pela NFS-e conforme respectiva legislação municipal do tributo",
    "3": "Regime de apuração dos tributos federais e municipal pela NFS-e conforme respectivas legislações federal e municipal de cada tributo",
  };
  return map[codigo] || "-";
}

export function regimeEspecialTributacao(codigo: string): string {
  const map: Record<string, string> = {
    "0": "Nenhum",
    "1": "Ato Cooperado (Cooperativa)",
    "2": "Estimativa",
    "3": "Microempresa Municipal",
    "4": "Notário ou Registrador",
    "5": "Profissional Autônomo",
    "6": "Sociedade de Profissionais",
  };
  return map[codigo] || "-";
}

export function tributacaoISSQN(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Operação tributável",
    "2": "Imunidade",
    "3": "Exportação de serviço",
    "4": "Não Incidência",
  };
  return map[codigo] || "-";
}

export function tipoImunidade(codigo: string): string {
  const map: Record<string, string> = {
    "0": "Imunidade (tipo não informado na nota de origem)",
    "1": "Patrimônio, renda ou serviços, uns dos outros (CF88, Art 150, VI, a)",
    "2": "Entidades religiosas e templos de qualquer culto, inclusive suas organizações assistenciais e beneficentes (CF88, Art 150, VI, b)",
    "3": "Patrimônio, renda ou serviços dos partidos políticos, inclusive suas fundações, das entidades sindicais dos trabalhadores, das instituições de educação e de assistência social, sem fins lucrativos, atendidos os requisitos da lei (CF88, Art 150, VI, c)",
    "4": "Livros, jornais, periódicos e o papel destinado a sua impressão (CF88, Art 150, VI, d)",
    "5": "Fonogramas e videofonogramas musicais produzidos no Brasil contendo obras musicais ou literomusicais de autores brasileiros e/ou obras em geral interpretadas por artistas brasileiros bem como os suportes materiais ou arquivos digitais que os contenham, salvo na etapa de replicação industrial de mídias ópticas de leitura a laser. (CF88, Art 150, VI, e)",
  };
  return map[codigo] || "-";
}

export function suspensaoExigibilidadeISSQN(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Exigibilidade do ISSQN Suspensa por Decisão Judicial",
    "2": "Exigibilidade do ISSQN Suspensa por Processo Administrativo",
  };
  return map[codigo] || "-";
}

export function tipoRetencaoISSQN(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Não Retido",
    "2": "Retido pelo Tomador",
    "3": "Retido pelo Intermediario",
  };
  return map[codigo] || "-";
}

export function retencaoPisCofins(codigo: string): string {
  const map: Record<string, string> = {
    "1": "Retido",
    "2": "Não Retido",
    "3": "PIS Retido/COFINS Não Retido",
    "4": "PIS Não Retido/COFINS Retido",
  };
  return map[codigo] || "-";
}
