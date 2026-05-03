import { useNotification } from "./useNotification";
import NotificationToast from "./NotificationToast";

const ToastRenderer = () => {
  const { toasts } = useNotification();

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <NotificationToast
          key={t.id}
          message={t.message}
          priority={t.priority}
        />
      ))}
    </div>
  );
};

export default ToastRenderer;