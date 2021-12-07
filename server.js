import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import bodyParser from "body-parser";
import routes from "./routes.js";

const server = express();
const port = process.env.PORT || 3001;
server.use(bodyParser.json());
server.use(
    cors({
        origin: `http://localhost:3000`, //react's address
        credentials: true,
    })
);
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api", routes);
server.listen(port, () => console.log("server started on port " + port));
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default server;
