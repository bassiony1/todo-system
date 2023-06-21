const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080 || process.env.PORT;

app.use(express.json());
app.use(cors({ origin: "*" }));
const todos = [
  { id: 1, title: "todo1", description: "description1", completed: false },
  { id: 2, title: "todo2", description: "description2", completed: false },
  { id: 3, title: "todo3", description: "description3", completed: false },
  { id: 4, title: "todo4", description: "description4", completed: true },
  { id: 5, title: "todo5", description: "description5", completed: false },
  { id: 6, title: "todo6", description: "description6", completed: false },
  { id: 7, title: "todo7", description: "description7", completed: true },
  { id: 8, title: "todo8", description: "description8", completed: false },
  { id: 9, title: "todo9", description: "description9", completed: false },
];

app.get("/", (req, res) => {
  res.json(todos);
});
app.get("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("The todo with the given ID was not found.");
  res.json(todo);
});

app.post("/", (req, res) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  };
  todos.push(todo);
  res.json(todo);
});

app.put("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("The todo with the given ID was not found.");
  todo.title = req.body.title;
  todo.description = req.body.description;
  todo.completed = req.body.completed;
  res.json(todo);
});

app.patch("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("The todo with the given ID was not found.");
  todo.completed = req.body.completed;
  res.json(todo);
});

app.delete("/:id", (req, res) => {
  const todo = todos.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("The todo with the given ID was not found.");
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.json(todo);
});

app.listen(port, () => {
  console.log(`app listening on Port ${port}`);
});
