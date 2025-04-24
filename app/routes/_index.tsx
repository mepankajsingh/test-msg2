import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getMessage } from "~/utils/supabase.server";

export const meta: MetaFunction = ({ data }) => {
  return [
    { title: data?.message || "Supabase SSR Demo" },
    { name: "description", content: "A demo of Supabase with SSR in Remix" },
    { property: "og:title", content: data?.message || "Supabase SSR Demo" },
    { property: "og:description", content: "A demo of Supabase with SSR in Remix" },
  ];
};

export async function loader() {
  const data = await getMessage();
  return json(data);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Supabase SSR Demo
        </h1>
        
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Message from Supabase:</h2>
          <p className="text-gray-800 text-xl">
            {data?.message || "No message found"}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            ID: {data?.id || "N/A"}
          </p>
          <p className="text-gray-500 text-sm">
            Created: {data?.created_at ? new Date(data.created_at).toLocaleString() : "N/A"}
          </p>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>This message was rendered server-side for SEO optimization</p>
        </div>
      </div>
    </div>
  );
}
