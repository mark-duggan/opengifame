import Episode from './episode';

export default interface Season {
  id: string;
  number: number;
  episodes: Episode[];
}
