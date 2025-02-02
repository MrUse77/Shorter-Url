import mongoose from "mongoose";

const MONGO_URL =
  "mongodb+srv://MrUse:1120712@cluster0.sly6r5g.mongodb.net/ejemplos?retryWrites=true&w=majority";

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection; // Evita conexiones duplicadas

  await mongoose.connect(MONGO_URL);
  console.log("📡 Conectado a MongoDB con Mongoose");

  return mongoose.connection;
}
