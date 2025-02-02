import type { APIRoute } from "astro";
import { connectDB } from "../../lib/mongo"; // Ensure this module exists or remove if not needed
import mongoose from "mongoose";

const shortenerSchema = new mongoose.Schema({
  nameUrl: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  shortUrl: { type: String, required: true, unique: true },
});

const headers = {
  "Access-Control-Allow-Origin": "*", // O especifica el origen: 'http://localhost:3000'
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
export const shortenerURL =
  mongoose.models.shortener || mongoose.model("shortener", shortenerSchema);

export const POST: APIRoute = async ({ request }) => {
  await connectDB();
  try {
    const body = await request.json();
    console.log(import.meta.env.KEY, body.key);
    if (import.meta.env.KEY !== body.key) {
      return new Response(JSON.stringify({ error: "Invalid key" }), {
        status: 401,
      });
    }
    const url = new shortenerURL({
      nameUrl: body.nameUrl,
      url: body.url,
      shortUrl: Math.random().toString(36).substring(7),
    });
    await url.save();
    return new Response(JSON.stringify({ url }));
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export const GET: APIRoute = async ({ params, redirect }) => {
  await connectDB();
  const { shortId } = params;
  console.log({ shortId });
  try {
    const response = await shortenerURL.find();
    return new Response(JSON.stringify(response), { headers });
  } catch (err) {
    console.log(err);
    return new Response(null, { status: 500 });
  }
};
