import { CommentSegment } from "./comment-segment";
import { User } from "./post";

export interface Comment {
  id: string;
  author: User;
  createdAt: string;
  formattedDate?: string;
  content: string;
  hasMoreSubcomments: boolean;
  segments: CommentSegment[];
  subcomments: Comment[];
}
