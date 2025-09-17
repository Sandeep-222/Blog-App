const MinimalLoginSkeleton = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-gray-200 rounded mx-auto mb-3 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
        </div>
        
        {/* Form fields */}
        <div className="space-y-4">
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>
        
        {/* Links */}
        <div className="mt-4 space-y-2">
          <div className="h-3 bg-gray-200 rounded w-32 mx-auto animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded w-28 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);


export default MinimalLoginSkeleton;
