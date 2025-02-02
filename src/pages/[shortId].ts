import type { APIRoute } from "astro";
import { connectDB } from "../lib/mongo";
import { shortenerURL } from "./api/shortener";
export const GET: APIRoute = async ({ params, redirect }) => {
  await connectDB();
  const { shortId } = params;
  if (shortId) {
    try {
      const response = await shortenerURL.findOne({ shortUrl: shortId });
      let url = response.url;
      if (response) {
        if (
          !response.url.startsWith("http") ||
          !response.url.startsWith("https")
        ) {
          url = "https://" + url;
        }

        return redirect(url);
      } else {
        return new Response("Not found", { status: 404 });
      }
    } catch (err) {
      console.log(err);
      return new Response(null, { status: 500 });
    }
  } else {
    return new Response("Not found", { status: 404 });
  }
};
