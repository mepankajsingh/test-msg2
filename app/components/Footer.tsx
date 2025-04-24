export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Supabase SSR Demo</p>
        </div>
        <div className="mt-2 flex justify-center text-xs text-gray-400">
          <p>Built with Remix and Supabase</p>
        </div>
      </div>
    </footer>
  );
}
