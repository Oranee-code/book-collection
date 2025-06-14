// server/server.ts
import * as Path2 from "node:path";

// server/routes/books.ts
import express from "express";

// server/db/knexfile.js
import * as Path from "node:path";
import * as URL from "node:url";
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var knexfile_default = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, "dev.sqlite3")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:"
    },
    migrations: {
      directory: Path.join(__dirname, "migrations")
    },
    seeds: {
      directory: Path.join(__dirname, "seeds")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "/app/storage/prod.sqlite3"
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  }
};

// server/db/connection.ts
import knex from "knex";
var environment = process.env.NODE_ENV || "development";
var config = knexfile_default[environment];
var connection = knex(config);
var connection_default = connection;

// server/db/books.ts
async function getBook(db = connection_default) {
  return db("books").select();
}
async function addBook(book, db = connection_default) {
  return db("books").insert(book).returning("*").then((insertedEntries) => insertedEntries[0]);
}
async function updateBook(id, updatedBook, db = connection_default) {
  return db("books").where({ id }).update(updatedBook).returning("*").then((updatedEntries) => updatedEntries[0]);
}
async function deleteBook(id, db = connection_default) {
  return db("books").where({ id }).delete();
}

// server/routes/books.ts
var router = express.Router();
router.get("/", async (req, res) => {
  try {
    const books = await getBook();
    res.json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
router.post("/", async (req, res) => {
  const { book } = req.body;
  if (!book) {
    console.error("No books provided");
    return res.status(400).send("Bad request");
  }
  try {
    const newBook = await addBook(book);
    res.status(201).json({ book: newBook });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
router.put("/:id", async (req, res) => {
  const { book } = req.body;
  const id = Number(req.params.id);
  if (!book || !id) {
    console.error("Bad Request - no book or id");
    return res.status(400).send("Bad request");
  }
  try {
    const updatedBook = await updateBook(id, book);
    res.status(200).json({ appliance: updatedBook });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      if (error instanceof Error) {
        return res.status(500).send(error.message);
      }
      res.status(500).send("Something went wrong");
    }
  }
});
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    console.error("Invalid book id");
    return res.status(400).send("Bad request");
  }
  try {
    await deleteBook(id);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
    res.status(500).send("Something went wrong");
  }
});
router.patch("/:id", async (req, res) => {
  const { book } = req.body;
  const id = Number(req.params.id);
  if (!book || !id) {
    console.error("Bad Request - no book or id");
    return res.status(400).send("Bad request");
  }
  try {
    const updatedBook = await updateBook(id, book);
    res.status(200).json({ book: updatedBook });
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
});
var books_default = router;

// server/server.ts
import express2 from "express";
var server = express2();
server.use(express2.json());
server.use("/api/v1/books", books_default);
server.use(express2.static(Path2.resolve("public")));
server.use("/assets", express2.static(Path2.resolve("./dist/assets")));
server.get("*", (req, res) => {
  res.sendFile(Path2.resolve("./dist/index.html"));
});
var server_default = server;

// server/index.ts
var PORT = process.env.PORT || 3e3;
server_default.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
