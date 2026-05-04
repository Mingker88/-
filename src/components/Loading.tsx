export function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-gray-100" />
          <div className="mt-3 h-4 bg-gray-100 rounded w-3/4" />
          <div className="mt-2 h-3 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
    </div>
  );
}

export function LoadingFull() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
    </div>
  );
}
