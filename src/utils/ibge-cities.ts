import data from "./brazilian_cities.json";

type MunicipioInfo = { nome: string; uf: string };

const index: Record<string, MunicipioInfo> = {};
for (const city of data.cities) {
  index[city.ibge_code] = { nome: city.name, uf: city.state };
}

export function getMunicipioByIbgeCode(
  codigo: string,
): MunicipioInfo | undefined {
  return index[String(codigo)];
}
