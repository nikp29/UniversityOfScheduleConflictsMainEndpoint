import express from "express";
// const routesApi = require('./api/routes/index');
import bodyParser from "body-parser";
import routes from "./routes.js";

import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
// import swaggerFile from "./swagger_output.json";

const server = express();
const port = process.env.PORT || 3000;
server.use(bodyParser.json());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api", routes);
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "University of Scehduling Conflicts Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes.js"],
};

const specs = swaggerJsdoc(options);
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

server.listen(port, () => console.log("server started on port " + port));
// app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default server;
