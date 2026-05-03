const Toast = ({ toast }) => {
  if (!toast) return null;

  return (
    <div className={`fixed top-6 right-6 px-5 py-3 rounded-xl
      text-white shadow-lg animate-fadeIn
      ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
      
      {toast.message}
    </div>
  );
};

export default Toast;