import { useEffect, useState } from "react";
import { getAlerts } from "./alertService";
import AlertForm from "./AlertForm";
import AlertList from "./AlertList";

const AlertPage = () => {

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const data = await getAlerts();
      setAlerts(data || []);
    } catch (error) {
      console.error("Failed to load alerts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  return (
    <div className="bg-white/5 p-6 rounded-xl border border-white/10">

      <h2 className="text-lg font-semibold mb-4">🚨 Alert Settings</h2>

      {/* FORM */}
      <AlertForm onCreated={loadAlerts} />

      {/* LOADING */}
      {loading ? (
        <p className="text-gray-400 mt-4">Loading alerts...</p>
      ) : (
        <AlertList alerts={alerts} onUpdate={loadAlerts} />
      )}

    </div>
  );
};

export default AlertPage;