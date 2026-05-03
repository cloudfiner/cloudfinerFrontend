import { useEffect, useState } from "react";

const AlertPanel = () => {

  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setAlerts(prev => [msg, ...prev]);
    };

  }, []);

  return (
    <div className="bg-white/5 p-4 rounded-xl">

      <h2 className="mb-3">Live Alerts</h2>

      {alerts.map((a, i) => (
        <div key={i} className="border-b py-2">
          <span className="text-red-400">{a.priority}</span> - {a.message}
        </div>
      ))}

    </div>
  );
};

export default AlertPanel;