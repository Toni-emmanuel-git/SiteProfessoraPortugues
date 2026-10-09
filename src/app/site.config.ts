/**
 * Conteúdo e links do site da Luiza Claure.
 * Para trocar textos, números ou links, edite SOMENTE este arquivo.
 */

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}
export interface Servico {
  tag: string;
  titulo: string;
  texto: string;
  destaque?: boolean;
}
export interface Passo {
  titulo: string;
  texto: string;
}
export interface Competencia {
  codigo: string;
  nome: string;
  texto: string;
}
export interface Depoimento {
  nome: string;
  contexto?: string;
  texto: string;
}

export const SITE = {
  nome: 'Luiza Claure',
  instagram: 'https://www.instagram.com/luizaclaureprof/',
  linkedin: 'https://www.linkedin.com/in/luiza-lara-do-val-claure/',
  /**
   * TODO: cole aqui o link do Google Forms de agendamento.
   * Enquanto estiver vazio, os botões "Agendar" levam à seção de contato.
   */
  agendamento: '',
  inicioCarreira: 2018,
};

export const agendar = {
  href: SITE.agendamento || '#contato',
  external: SITE.agendamento !== '',
};

const ANOS_DE_EXPERIENCIA = new Date().getFullYear() - SITE.inicioCarreira;

/**
 * Números em destaque (com contador animado).
 * TODO: quando souber, adicione "alunos atendidos" aqui, por exemplo:
 * { value: 150, prefix: '+', label: 'Alunos atendidos' }
 */
export const STATS: Stat[] = [
  { value: 980, label: 'Nota na redação do ENEM' },
  { value: 5, label: 'Competências da banca que você aprende a dominar' },
  { value: ANOS_DE_EXPERIENCIA, prefix: '+', label: 'Anos ensinando redação e linguagens' },
];

export const SERVICOS: Servico[] = [
  {
    tag: 'ENEM',
    titulo: 'Redação para o ENEM',
    texto:
      'Estrutura dissertativo-argumentativa, repertório, argumentação e proposta de intervenção. Você treina cada competência com texto na mão e sabe exatamente onde ganhar pontos.',
    destaque: true,
  },
  {
    tag: 'Feedback',
    titulo: 'Correção detalhada e construtiva',
    texto:
      'Cada redação volta com apontamentos claros do que melhorar, escritos por quem corrige redações profissionalmente.',
  },
  {
    tag: 'Linguagens',
    titulo: 'Leitura, escrita e norma padrão',
    texto:
      'Coesão, coerência e domínio da norma padrão para escrever e interpretar textos com segurança.',
  },
  {
    tag: 'Sob medida',
    titulo: 'Aulas personalizadas',
    texto:
      'O planejamento parte do seu perfil, do seu prazo e do seu objetivo, de adolescentes a adultos.',
  },
  {
    tag: 'Material',
    titulo: 'Materiais e avaliações próprios',
    texto:
      'Atividades e avaliações elaboradas a partir de gêneros textuais, pensadas para a sua rotina de estudo.',
  },
];

/** TODO: rascunho do método. A Luiza deve revisar e ajustar à realidade das aulas dela. */
export const PASSOS: Passo[] = [
  {
    titulo: 'Diagnóstico',
    texto:
      'Começamos com uma redação sua. Mapeio o que já funciona e onde estão os pontos perdidos em cada competência.',
  },
  {
    titulo: 'Plano sob medida',
    texto: 'Metas e cronograma de acordo com o seu perfil, o seu prazo e a prova que você vai fazer.',
  },
  {
    titulo: 'Técnica na prática',
    texto:
      'Aulas online com foco em estrutura, repertório, coesão e proposta de intervenção, sempre com texto na mão.',
  },
  {
    titulo: 'Correção e reescrita',
    texto:
      'Feedback detalhado e construtivo. Você reescreve, compara e enxerga a evolução da sua nota.',
  },
  {
    titulo: 'Acompanhamento',
    texto:
      'O plano é ajustado conforme você evolui e conforme o que a banca vem avaliando. Sigo sempre atualizada.',
  },
];

/** As 5 competências oficiais da redação do ENEM (200 pontos cada). */
export const COMPETENCIAS: Competencia[] = [
  {
    codigo: 'C1',
    nome: 'Norma culta',
    texto: 'Domínio da modalidade escrita formal da língua portuguesa.',
  },
  {
    codigo: 'C2',
    nome: 'Tema e estrutura',
    texto: 'Compreensão da proposta e desenvolvimento do tema no texto dissertativo-argumentativo.',
  },
  {
    codigo: 'C3',
    nome: 'Argumentação',
    texto: 'Seleção, organização e interpretação de informações e argumentos em defesa de um ponto de vista.',
  },
  {
    codigo: 'C4',
    nome: 'Coesão',
    texto: 'Uso dos mecanismos linguísticos que constroem a argumentação.',
  },
  {
    codigo: 'C5',
    nome: 'Proposta de intervenção',
    texto: 'Proposta de solução para o problema, respeitando os direitos humanos.',
  },
];

/**
 * Cartão dividido "Conheça a Luiza" (foto de um lado, texto do outro).
 * Ao passar o mouse, foto e painel trocam de lado e o texto muda de "a" para "b".
 */
export const CARTAO = {
  a: {
    rotulo: '01 · Trajetória',
    titulo: 'De aluna nota 980 a corretora de redações.',
    texto:
      'Graduada em Letras pela UFMG e cursando Bacharelado em Estudos Linguísticos, Luiza ensina desde 2018. Foi professora regente de redação no Ensino Médio e hoje corrige redações na Bernoulli.',
    fatos: ['UFMG · Letras', 'Bernoulli · Corretora', 'Desde 2018'],
  },
  b: {
    rotulo: '02 · Filosofia',
    titulo: 'Exigir mais do que a prova exige.',
    texto:
      'Luiza exige dos alunos mais do que o próprio ENEM, mas se mantém atualizada sobre o que a banca avalia. Fora da sala de aula, atuou em um projeto de letramento de adultos e no “Mãos Literárias”, que aproxima a literatura surda da ouvinte.',
    fatos: ['Letramento de adultos', 'Mãos Literárias', 'Adolescentes a adultos'],
  },
};

/**
 * TODO: depoimentos de alunos (com autorização para publicar).
 * Enquanto a lista estiver vazia, a seção e o link de menu não aparecem.
 * Exemplo: { nome: 'Maria S.', contexto: 'Aluna de redação ENEM', texto: '...' }
 */
export const DEPOIMENTOS: Depoimento[] = [];
