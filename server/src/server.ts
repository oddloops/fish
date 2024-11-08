import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import { connectToDatabase } from "./database";

// Load environment variables from .env
dotenv.config();

const { ATLAS_URI, PORT, SESSION_KEY } = process.env;

// Type Gates
if (!ATLAS_URI) {
    console.error(
        "No ATLAS_URI environment variable has been defined in config.env"
    );
    process.exit(1);
}

if (!SESSION_KEY) {
    console.error(
        "No SESSON_KEY environment variable has been defined in config.env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());

        // parse requests of content-type application/json & application/x-www-form-urlencoded
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.use(
            cookieSession({
                name: 'puffer-session',
                keys: [SESSION_KEY],
                httpOnly: true
            })
        )

        app.get("/", (req, res) => {
            res.json({ message: "This is a test"});
        })

        const port = PORT || 8080;
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}...`);
        });
    })
    .catch((error) => console.error(error));