import { User } from "../user/userSlice";

export interface Review {
  id: number;
  review: string;
  rating: number;
  created_at: Date;
  updated_at: Date;
  user: User;
}
