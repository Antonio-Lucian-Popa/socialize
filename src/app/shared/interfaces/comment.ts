import { User } from "./post";

export interface Comment {
  id: string;
  value: string;
  createdAt: string;
  user: User;
}
