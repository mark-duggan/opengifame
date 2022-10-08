import Season from "./season";

export default interface Episode {
  id: string;
  number: number;
  name: string;
  airDate: Date;
  season: Season;
}
