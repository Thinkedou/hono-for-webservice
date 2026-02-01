import { Hono } from "hono";
import { queryBuilder } from "@/lib/query-builder";
import { Book } from "@/models/books";

const api = new Hono().basePath("/books");

api.get("/", async (c) => {
  const query = c.req.query();
  const {
    filter,
    projection,
    options,
  } = queryBuilder.getFindOptions({ query });

  const allB = await Book.find(filter, projection, options);

  return c.json(allB);
});
api.get("/:id", (c) => {
  const { id } = c.req.param();
  return c.json({ msg: `get ${id}` });
});
api.post("/", async (c) => {
  return c.json({ msg: "post route!" }, 201);
});

export default api;
