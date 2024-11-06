import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";

// Load environment variables from .env
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error(
        "No ATLAS_URI environment variable has been defined in config.env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
        const port = 3000;
        
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}...`);
        });
    })
    .catch((error) => console.error(error));