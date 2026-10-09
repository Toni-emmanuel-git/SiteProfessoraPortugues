/**
 * Linha do tempo da cena "cachorrinha e passarinho" do rodapé.
 * Funções puras: dado o tempo (em segundos) e a largura do palco, devolvem
 * posição e estado de cada personagem. Para mudar o ritmo da cena, edite as tabelas.
 */

export const DOG_W = 92;
export const BIRD_W = 40;
/** Duração total da cena, em segundos. Depois disso a cachorrinha fica parada, abanando o rabo. */
export const DURATION = 9.5;

/** Cada linha: [tempo, posição horizontal (0 a 1, fração do trajeto), altura em px]. */
const DOG_X: number[][] = [
  [0, 0.04, 0],
  [1.6, 0.04, 0], // fica olhando o passarinho pousar
  [3.7, 0.5, 0], // corre até ele
  [4.1, 0.5, 0], // ele voa; ela hesita
  [6.1, 0.76, 0], // corre de novo
  [6.8, 0.8, 0], // freia
  [99, 0.8, 0],
];

const BIRD: number[][] = [
  [0, 0.7, 170], // entra de cima, fora do palco
  [0.9, 0.57, 0], // pousa
  [3.3, 0.57, 0], // bica o chão
  [3.9, 0.68, 52], // voa quando a cachorrinha chega perto
  [4.5, 0.76, 0], // pousa mais adiante
  [5.6, 0.76, 0],
  [6.2, 0.9, 74], // foge de novo
  [7.4, 1.1, 210], // some pelo alto
  [99, 1.1, 210],
];

export type DogState = 'idle' | 'look' | 'run';
export type BirdState = 'fly' | 'peck';

const DOG_STATES: [number, DogState][] = [
  [0, 'idle'],
  [1.0, 'look'],
  [1.6, 'run'],
  [3.7, 'look'],
  [4.1, 'run'],
  [6.5, 'look'],
  [9.2, 'idle'],
];

/** Interpolação suave (ease-in-out) entre as linhas da tabela. */
function sample(keys: number[][], t: number, col: number): number {
  if (t <= keys[0][0]) return keys[0][col];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i];
    const b = keys[i + 1];
    if (t < b[0]) {
      const u = (t - a[0]) / (b[0] - a[0]);
      const e = 0.5 - 0.5 * Math.cos(Math.PI * u);
      return a[col] + (b[col] - a[col]) * e;
    }
  }
  return keys[keys.length - 1][col];
}

export function dogAt(t: number, stageWidth: number): { x: number; state: DogState } {
  const travel = Math.max(0, stageWidth - DOG_W);
  let state: DogState = 'idle';
  for (const [from, s] of DOG_STATES) if (t >= from) state = s;
  return { x: sample(DOG_X, t, 1) * travel, state };
}

export function birdAt(
  t: number,
  stageWidth: number,
): { x: number; y: number; state: BirdState; facing: 1 | -1; visible: boolean } {
  const flying = t < 0.9 || (t >= 3.3 && t < 4.5) || t >= 5.6;
  const state: BirdState = flying ? 'fly' : 'peck';
  const baseY = sample(BIRD, t, 2);
  const wobble = flying && baseY > 4 ? Math.sin(t * 16) * 2.5 : 0;
  return {
    x: sample(BIRD, t, 1) * stageWidth - BIRD_W / 2,
    y: Math.max(0, baseY + wobble),
    state,
    facing: t < 3.3 ? -1 : 1,
    visible: t > 0 && t < 7.4,
  };
}
