import { createServer } from "http";
import { readFileSync } from "fs";
import { resolve } from "path";

const e02Path = resolve("./e02.json");
const e02 = JSON.parse(readFileSync(e02Path, "utf8"));

const server = createServer((request, response) => {
  console.log("request received");

  response.statusCode = 200;
  response.setHeader("Content-Type", "application/json");

  const jsonResponseBody = JSON.stringify(e02);

  response.end(jsonResponseBody);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000`);
});
