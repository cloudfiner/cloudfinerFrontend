import { deleteAlert, toggleAlert } from "./alertService";

const AlertList = ({ alerts = [], onUpdate }) => {

  // ✅ safety check
  if (!Array.isArray(alerts)) {
    console.log("Invalid alerts:", alerts);
    return <p>No alerts available</p>;
  }

  // ✅ empty state
  if (alerts.length === 0) {
    return <p>No alerts found</p>;
  }

  return (
    <div>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <p>Threshold: ₹{alert.threshold}</p>

          <p>
            Status: {alert.active ? "🟢 Active" : "🔴 Inactive"}
          </p>

          <button
            onClick={async () => {
              await toggleAlert(alert.id);
              onUpdate();
            }}
          >
            Toggle
          </button>

          <button
            onClick={async () => {
              await deleteAlert(alert.id);
              onUpdate();
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertList;