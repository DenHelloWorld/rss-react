const LoadingIndicator = () => {
  return (
    <div className="relative h-12 w-12">
      <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
      <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
};

export default LoadingIndicator;
