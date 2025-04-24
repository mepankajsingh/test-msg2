import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <nav className="mb-8">
          <Link 
            to="/messages" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all messages
          </Link>
        </nav>
        
        {/* Message Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-8 py-6 text-white">
            <h1 className="text-2xl font-bold">Message Details</h1>
            <div className="flex items-center mt-2 text-indigo-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
              </svg>
              <span className="text-sm">ID: {data.id}</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border border-indigo-100 shadow-inner mb-8">
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                {data.message}
              </p>
            </div>
            
            {/* Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="text-gray-800 font-medium">{new Date(data.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              {data.updated_at && data.updated_at !== data.created_at && (
                <div className="bg-gray-50 rounded-xl p-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Updated</p>
                    <p className="text-gray-800 font-medium">{new Date(data.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
