const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repository);
  response.json(repository);
});

app.get("/repositories", (request, response) => {
  // TODO
  response.json(repositories);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not Found" });
  }
  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  };

  repositories[repositoryIndex] = repository;
  response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex <= 0) {
    return response.status(400).json({ error: "Repository not Found" });
  }
  repositories.splice(repositoryIndex, 1);
  response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not Found" });
  }

  repositories[repositoryIndex].likes += 1;
  const repository = repositories.find((repository) => repository.id === id);
  response.send(repository);
});

module.exports = app;
