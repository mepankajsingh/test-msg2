import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { getMessage } from "~/utils/supabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // Add cache control headers for better performance
  const headers = new Headers({
    "Cache-Control": "public, max-age=60, s-maxage=60",
  });

  try {
    const data = await getMessage();
    return json(data, { headers });
  } catch (error) {
    console.error("API error:", error);
    return json({ error: "Failed to fetch message" }, { status: 500, headers });
  }
}
