export default interface Gif {
  id: string;
  title: string;
  description: string | null;
  fileName: string;
  dateCreated: string;
  upVotes: number;
  downVotes: number;
  hasVoted: Boolean;
}
