import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "All Messages - Supabase SSR Demo" },
    { name: "description", content: "View all messages from the Supabase database" },
  ];
};

export async function loader() {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error("Error fetching messages:", error);
    return json({ messages: [] });
  }
  
  return json({ messages: data || [] });
}

export default function Messages() {
  const { messages } = useLoaderData<typeof loader>();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            All Messages
          </h1>
          
          <Link 
            to="/admin" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Add New Message
          </Link>
        </div>
        
        {messages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No messages found. Add one from the admin panel.
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <Link to={`/messages/${message.id}`} className="block">
                  <p className="text-gray-800 font-medium">
                    {message.message.length > 100 
                      ? `${message.message.substring(0, 100)}...` 
                      : message.message}
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
