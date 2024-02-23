import { Document } from 'mongoose';

export interface IBook extends Document {
   title: string;
   author: string;
   genre: string;
   publicationDate: Date;
   createdAt: Date;
   updatedAt: Date;
   reviews: string[];
}
