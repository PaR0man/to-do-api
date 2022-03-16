module.exports = (app) => {
  const todos = require("../controllers/todo.controller");
  const router = require("express").Router();

  router.post("/", todos.create);

  router.get("/", todos.findAll);

  router.put("/update/:id", todos.update);

  router.put("/check/:id", todos.check);

  router.delete('/', todos.deleteAll);

  router.delete('/:id', todos.removeOne);

  app.use("/api/todos", router);
};