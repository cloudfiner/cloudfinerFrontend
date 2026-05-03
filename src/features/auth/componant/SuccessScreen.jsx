const SuccessScreen = ({ message }) => {
  return (
    <div className="text-center py-10 animate-fadeIn">

      <div className="w-16 h-16 mx-auto mb-4 rounded-full
        bg-green-500/20 flex items-center justify-center
        text-green-400 text-2xl">
        ✓
      </div>

      <h2 className="text-xl font-semibold">{message}</h2>

      <p className="text-gray-400 text-sm mt-2">
        Redirecting...
      </p>
    </div>
  );
};

export default SuccessScreen;