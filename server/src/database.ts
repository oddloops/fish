import * as mongodb from "mongodb";

export async function connectToDatabase (uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const database = client.db("puffer");
}