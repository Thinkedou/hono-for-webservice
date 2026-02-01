import { connect } from "mongoose";
import env from "../env";

// or any ORM and connection string/method according to your database

const CONNECTION_STRING = `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PWD}@${env.MONGODB_CLUSTER}/${env.MONGODB_DATABASE}`;

export async function DbConnect() {
  try {
    const _db = await connect(CONNECTION_STRING);
    console.log(`🟢 connected to Atlas Cluster: ${env.MONGODB_CLUSTER}`);
    return _db;
  }
  catch (e) {
    console.warn(e.errorResponse);
    return e;
  }
}
