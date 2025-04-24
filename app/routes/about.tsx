import { type MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "About - Supabase SSR Demo" },
    { name: "description", content: "About this Supabase SSR demo application" },
  ];
};

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          About This Demo
        </h1>
        
        <div className="prose prose-sm">
          <p className="mb-4">
            This is a demonstration of Server-Side Rendering (SSR) with Supabase and Remix.
          </p>
          
          <p className="mb-4">
            The application fetches data from Supabase on the server side, which means:
          </p>
          
          <ul className="list-disc pl-5 mb-4">
            <li>Better SEO as search engines see the full content</li>
            <li>Faster initial page load</li>
            <li>Works even if JavaScript is disabled</li>
            <li>Better user experience</li>
          </ul>
          
          <p>
            The data is fetched from a Supabase table called "messages" and rendered
            server-side before being sent to the browser.
          </p>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
