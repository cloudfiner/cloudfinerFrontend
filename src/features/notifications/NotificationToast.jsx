import "../../style/Notification.css";







const NotificationToast = ({ message, priority }) => {
  return (
    <div className={`toast ${priority.toLowerCase()}`}>
      {message}
    </div>
  );
};

export default NotificationToast;