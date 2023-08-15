export interface CommentSegment {
  type: 'text' | 'mention';
  content: string;
}
