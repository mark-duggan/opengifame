export default interface Gif {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  fileName: string;
  searchTerms: string[];
  dateCreated: string;
  upVotes: number;
  downVotes: number;
  hasVoted: Boolean;
  fixedEmbedCode: string;
  responsiveEmbedCode: string;
}
