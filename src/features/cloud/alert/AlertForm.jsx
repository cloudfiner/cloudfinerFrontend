import { useState } from "react";
import { createAlert } from "./alertService";

const AlertForm = ({ onCreated }) => {

  const [threshold, setThreshold] = useState("");

  const handleSubmit = async () => {
    if (!threshold || threshold <= 0) return;

    await createAlert(threshold);
    setThreshold("");
    onCreated();
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter threshold ₹"
        value={threshold}
        onChange={(e) => setThreshold(e.target.value)}
      />

      <button onClick={handleSubmit}>Add Alert</button>
    </div>
  );
};

export default AlertForm;