interface RefeicoesProps {
  horario: string;
  nome: string;
  alimentos: string[];
}

export interface Data {
  nome: string;
  sexo: string;
  idade: string;
  altura: string;
  peso: string;
  objetivo: string;
  refeicoes: RefeicoesProps[];
  suplementos: string[];
}
