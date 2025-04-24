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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
              Messages
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover thoughts and ideas shared by our community
            </p>
          </div>
          
          <Link 
            to="/admin" 
            className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:scale-105"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">Add New Message</span>
            <span className="relative invisible">Add New Message</span>
          </Link>
        </div>
        
        {/* Message List */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No messages yet</h2>
            <p className="text-gray-600 max-w-md mb-8">Be the first to share your thoughts with our community by creating a new message.</p>
            <Link 
              to="/admin" 
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create First Message
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {messages.map((message, index) => {
              // Generate a unique gradient for each card
              const gradients = [
                'from-blue-50 to-indigo-50 border-blue-200',
                'from-indigo-50 to-purple-50 border-indigo-200',
                'from-purple-50 to-pink-50 border-purple-200',
                'from-pink-50 to-rose-50 border-pink-200',
                'from-rose-50 to-orange-50 border-rose-200'
              ];
              const gradient = gradients[index % gradients.length];
              
              return (
                <Link 
                  key={message.id} 
                  to={`/messages/${message.id}`}
                  className="group block"
                >
                  <div className={`h-full bg-gradient-to-br ${gradient} border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1`}>
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-2 w-2 rounded-full bg-indigo-400 mr-2"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-400 mr-2"></div>
                        <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-gray-800 font-medium text-lg line-clamp-3 group-hover:text-indigo-700 transition-colors">
                          {message.message.length > 120 
                            ? `${message.message.substring(0, 120)}...` 
                            : message.message}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                        <div className="flex items-center text-gray-500 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{new Date(message.created_at).toLocaleDateString()}</span>
                        </div>
                        
                        <span className="inline-flex items-center text-indigo-600 text-sm font-medium group-hover:translate-x-1 transition-transform duration-200">
                          Read more
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
