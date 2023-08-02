export interface Post {
  id: string;
  image?: string;
  description: string;
  createdAt: Date;
  user: User;
  userLikes: User[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
}
