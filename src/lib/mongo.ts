import mongoose from "mongoose";

const MONGO_URL =
  import.meta.env.MONGO_URI || "mongodb://localhost:27017/shortener"; // Cambia la URL de conexión según tu configuración

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose.connection; // Evita conexiones duplicadas

  await mongoose.connect(MONGO_URL);
  console.log("📡 Conectado a MongoDB con Mongoose");

  return mongoose.connection;
}
