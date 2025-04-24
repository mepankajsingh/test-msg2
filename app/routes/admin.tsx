import { json, redirect, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin - Supabase SSR Demo" },
    { name: "description", content: "Admin panel for Supabase SSR demo" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const message = formData.get("message") as string;
  
  if (!message || message.trim() === "") {
    return json({ error: "Message cannot be empty" });
  }

  try {
    const { error } = await supabase
      .from('messages')
      .insert([{ message }]);

    if (error) throw error;
    
    return redirect("/");
  } catch (error) {
    console.error("Error adding message:", error);
    return json({ error: "Failed to add message" });
  }
}

export default function Admin() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Panel
        </h1>
        
        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              New Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              placeholder="Enter a new message to display"
            />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Message
            </button>
          </div>
          
          {actionData?.error && (
            <div className="text-red-600 text-sm mt-2">
              {actionData.error}
            </div>
          )}
        </Form>
      </div>
    </div>
  );
}
