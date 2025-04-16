import mongoose from "mongoose";

const DB_connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Created Successfully. ", conn.connection.host);
  } catch (error) {
    console.log("Error in database connection. ", error.message);
    throw new Error("Database connection failed.");
  }
};

export default DB_connection;
