import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";
import { generateMetaTags } from "~/utils/seo";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.message) {
    return generateMetaTags({
      title: "Message Not Found",
      description: "The requested message could not be found."
    });
  }
  
  return generateMetaTags({
    title: `Message: ${data.message.substring(0, 50)}${data.message.length > 50 ? '...' : ''}`,
    description: data.message
  });
};

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  
  if (!id) {
    throw new Response("Message ID is required", { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error || !data) {
    throw new Response("Message not found", { status: 404 });
  }
  
  return json(data);
}

export default function MessageDetail() {
  const data = useLoaderData<typeof loader>();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Message Detail
        </h1>
        
        <div className="bg-blue-50 p-6 rounded-md border border-blue-200">
          <p className="text-gray-800 text-xl mb-4">
            {data.message}
          </p>
          
          <div className="mt-4 text-gray-500 text-sm">
            <p>ID: {data.id}</p>
            <p>Created: {new Date(data.created_at).toLocaleString()}</p>
            {data.updated_at && data.updated_at !== data.created_at && (
              <p>Updated: {new Date(data.updated_at).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
