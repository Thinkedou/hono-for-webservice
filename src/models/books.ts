import { model, Schema } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface IBook {
  title: string;
  originalTitle: string;
  coverUri: string;
  recap: string;
  createdAt: Date;
  publicationYear: number;
  genre?: string;
}

// 2. Create a Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  originalTitle: { type: String },
  coverUri: { type: String },
  recap: { type: String },
  createdAt: { type: Date, default: Date.now },
  publicationYear: { type: Number },
  genre: { type: String },
});

// Query middlewares
bookSchema.post<IBook>("save", async (doc) => {
  console.log(doc);
});

// 3. Create a Model.
const Book = model<IBook>("books", bookSchema);

console.log(Object.keys(Book.schema.obj));

export { Book };
