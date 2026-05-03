import { useState } from "react";

const EditRuleModal = ({ rule, onClose, onSave }) => {

  const [form, setForm] = useState(rule);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <div className="bg-[#111] p-6 rounded-xl w-[400px]">

        <h2 className="text-xl mb-4">Edit Rule</h2>

        <input
          name="threshold"
          value={form.threshold}
          onChange={handleChange}
          className="w-full mb-2 p-2 bg-black rounded"
        />

        <select name="condition"
          value={form.condition}
          onChange={handleChange}
          className="w-full mb-2 p-2 bg-black rounded">

          <option value="GREATER_THAN"></option>
          <option value="LESS_THAN"></option>
          <option value="EQUAL">=</option>
        </select>

        <button onClick={() => onSave(form)}
          className="bg-purple-600 px-4 py-2 rounded mr-2">
          Save
        </button>

        <button onClick={onClose}
          className="bg-gray-600 px-4 py-2 rounded">
          Cancel
        </button>

      </div>
    </div>
  );
};

export default EditRuleModal;