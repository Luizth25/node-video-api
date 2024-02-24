import { fastify } from "fastify";
import { DataBasePostgres } from "./data-base-postgres";

const server = fastify();

const dataBase = new DataBasePostgres();

server.post("/videos", async (request, response) => {
  const { title, description, duration } = request.body;

  await dataBase.create({
    title,
    description,
    duration,
  });

  return response.status(201).send();
});

server.get("/videos", async (request, response) => {
  const search = request.query.search;

  const videos = await dataBase.list(search);

  return videos;
});

server.put("/videos/:id", async (request, response) => {
  const videoId = request.params.id;
  const { title, description, duration } = request.body;

  const video = await dataBase.update(videoId, {
    title,
    description,
    duration,
  });

  return response.status(204).send();
});

server.delete("/videos/:id", async (request, response) => {
  const videoId = request.params.id;

  await dataBase.delete(videoId);

  return response.status(204).send();
});

server.listen({
  host: "0.0.0.0",
  port: process.env.PORT ?? 3333,
});
