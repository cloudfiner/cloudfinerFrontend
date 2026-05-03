import { useEffect, useRef, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import "@/style/BudgetSection.css";

const BudgetInput = ({ onSaved }) => {

  const { token } = useAuth();

  const [budget, setBudget] = useState("");
  const [isEdit, setIsEdit] = useState(false);     // existing budget?
  const [isEditing, setIsEditing] = useState(false); // user clicked update?

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const timerRef = useRef(null);

  // -------- FETCH BUDGET --------
  useEffect(() => {
    const fetchBudget = async () => {

      if (!token) {
        setInitialLoading(false);
        return;
      }

      try {
        const res = await api.get("/api/budgets/getbudget", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const existing = res?.data?.monthlyBudget;

        if (existing && Number(existing) > 0) {
          setIsEdit(true);        // budget exists
          setIsEditing(false);    // editing OFF
          setBudget("");          // ❗ empty input
        }

      } catch {
        setIsEdit(false);
        setIsEditing(true); // first time → allow typing
      } finally {
        setInitialLoading(false);
      }
    };

    fetchBudget();

  }, [token]);

  // -------- VALIDATION --------
  const validate = () => {
    const value = Number(budget);

    if (!budget || isNaN(value)) return "Budget is required";
    if (value <= 0) return "Budget must be greater than 0";

    return null;
  };

  // -------- SAVE --------
  const saveBudget = async () => {

    if (!isEditing) {
      // first click → enable editing
      setIsEditing(true);
      return;
    }

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await api.post(
        "/api/budgets/save",
        { monthlyBudget: Number(budget) },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess(res?.data?.message || "Success");

      setIsEdit(true);
      setIsEditing(false); // disable again
      setBudget("");

      if (onSaved) onSaved();

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setSuccess(""), 2500);

    } catch {
      setError("Failed to save");
    } finally {
      setLoading(false);
    }
  };

  // -------- UI --------
  if (initialLoading) {
    return <div className="soft-card">Loading...</div>;
  }

  return (
    <div className="soft-card budget-wrapper">

      <div className="budget-header">
        <p className="card-label">Set Monthly Budget</p>
        <span className="budget-sub">Control your spending limit</span>
      </div>

      <div className="budget-row">

        <div className="budget-input-box">
          <span className="currency">₹</span>

          <input
            type="number"
            placeholder={isEdit ? "Click update to edit" : "Enter amount"}
            value={budget}
            disabled={!isEditing}
            onChange={(e) => {
              setBudget(e.target.value);
              setError("");
              setSuccess("");
            }}
            className={`budget-input ${!isEditing ? "disabled" : ""}`}
          />
        </div>

        <button
          onClick={saveBudget}
          disabled={loading}
          className="budget-btn"
        >
          {loading
            ? "Processing..."
            : isEdit
              ? (isEditing ? "Save" : "Update")
              : "Save"}
        </button>

      </div>

      {error && <p className="budget-error">{error}</p>}
      {success && <p className="budget-success">{success}</p>}

    </div>
  );
};

export default BudgetInput;