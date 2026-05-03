// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAccessToken } from "@/lib/authService";

// import Sidebar from "../../shared/Sidebar";
// import DashboardHeader from "../dashboard/componant/DashboardHeader";

// import {
//   getUsers,
//   deleteUser,
//   activateUser,
//   getTemplates,
//   deleteTemplate,
//   getRules,
//   createRule,
//   updateRule,
//   deleteRule
// } from "./adminService";

// import EditRuleModal from "./componant/EditRuleModal";

// const AdminDashboard = () => {

//   const navigate = useNavigate();

//   const [users, setUsers] = useState([]);
//   const [rules, setRules] = useState([]);
//   const [templates, setTemplates] = useState([]);

//   const [search, setSearch] = useState("");
//   const [selectedRule, setSelectedRule] = useState(null);

//   const [ruleForm, setRuleForm] = useState({
//     type: "COST",
//     condition: "GREATER_THAN",
//     threshold: "",
//     templateKey: "",
//     priority: "INFO"
//   });

//   // 🔥 SECURITY GUARD + LOAD DATA
//   useEffect(() => {
//     const token = getAccessToken();
//     const role = localStorage.getItem("role");

//     // ❌ Not logged in
//     if (!token) {
//       navigate("/login", { replace: true });
//       return;
//     }

//     // ❌ Not admin
//     if (role !== "ROLE_ADMIN") {
//       navigate("/dashboard", { replace: true });
//       return;
//     }

//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const u = await getUsers();
//       const r = await getRules();
//       const t = await getTemplates();

//       setUsers(u.data || []);
//       setRules(r.data || []);
//       setTemplates(t.data || []);
//     } catch (e) {
//       console.error("Load error:", e);
//     }
//   };

//   const filteredUsers = users.filter(u =>
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleCreateRule = async () => {
//     await createRule(ruleForm);
//     loadData();
//   };

//   return (
//     <div className="app-bg flex min-h-screen text-white">

//       <Sidebar />

//       <div className="flex-1 p-12 space-y-12">

//         <DashboardHeader
//           currency={"INR"}
//           setCurrency={() => {}}
//           days={30}
//           setDays={() => {}}
//           mode={"admin"}
//         />

//         {/* USERS */}
//         <div className="glass-card p-6">
//           <h2 className="text-xl mb-4">Users</h2>

//           <input
//             placeholder="Search user..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="input-dark mb-4"
//           />

//           {filteredUsers.map(u => (
//             <div key={u.id}
//               className="flex justify-between bg-white/5 p-3 rounded-xl mb-2">

//               <div>
//                 <div>{u.email}</div>
//                 <div className="text-sm text-gray-400">{u.role}</div>
//               </div>

//               <div className="space-x-2">
//                 <button onClick={() => activateUser(u.id)} className="btn-green">Activate</button>
//                 <button onClick={() => deleteUser(u.id)} className="btn-red">Delete</button>
//               </div>

//             </div>
//           ))}
//         </div>

//         {/* RULE FORM */}
//         <div className="glass-card p-6">
//           <h2 className="text-xl mb-4">Create Rule</h2>

//           <div className="grid grid-cols-5 gap-4">

//             <select className="input-dark"
//               onChange={(e) => setRuleForm({ ...ruleForm, type: e.target.value })}>
//               <option>COST</option>
//               <option>SERVER</option>
//             </select>

//             <select className="input-dark"
//               onChange={(e) => setRuleForm({ ...ruleForm, condition: e.target.value })}>
//               <option value="GREATER_THAN">&gt;</option>
//               <option value="LESS_THAN">&lt;</option>
//               <option value="EQUAL">=</option>
//             </select>

//             <input placeholder="Threshold"
//               className="input-dark"
//               onChange={(e) => setRuleForm({ ...ruleForm, threshold: e.target.value })} />

//             <input placeholder="Template Key"
//               className="input-dark"
//               onChange={(e) => setRuleForm({ ...ruleForm, templateKey: e.target.value })} />

//             <select className="input-dark"
//               onChange={(e) => setRuleForm({ ...ruleForm, priority: e.target.value })}>
//               <option>INFO</option>
//               <option>WARNING</option>
//               <option>ERROR</option>
//             </select>

//           </div>

//           <button onClick={handleCreateRule} className="btn-primary mt-4">
//             Create Rule
//           </button>
//         </div>

//         {/* RULE LIST */}
//         <div className="glass-card p-6">
//           <h2 className="text-xl mb-4">Rules</h2>

//           {rules.map(r => (
//             <div key={r.id}
//               className="flex justify-between bg-white/5 p-3 rounded-xl mb-2">

//               <div>
//                 {r.type} {r.condition} {r.threshold}
//               </div>

//               <div className="space-x-2">
//                 <button onClick={() => setSelectedRule(r)} className="btn-blue">Edit</button>
//                 <button onClick={() => deleteRule(r.id)} className="btn-red">Delete</button>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>

//       {selectedRule && (
//         <EditRuleModal
//           rule={selectedRule}
//           onClose={() => setSelectedRule(null)}
//           onSave={async (updated) => {
//             await updateRule(updated.id, updated);
//             setSelectedRule(null);
//             loadData();
//           }}
//         />
//       )}

//     </div>
//   );
// };

// export default AdminDashboard;









import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "@/lib/authService";
import { jwtDecode } from "jwt-decode";

import Sidebar from "../../shared/Sidebar";
import DashboardHeader from "../dashboard/componant/DashboardHeader";

import {
  getUsers,
  deleteUser,
  activateUser,
  getTemplates,
  deleteTemplate,
  getRules,
  createRule,
  updateRule,
  deleteRule
} from "./adminService";

import EditRuleModal from "./componant/EditRuleModal";

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [rules, setRules] = useState([]);
  const [templates, setTemplates] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedRule, setSelectedRule] = useState(null);

  const [ruleForm, setRuleForm] = useState({
    type: "COST",
    condition: "GREATER_THAN",
    threshold: "",
    templateKey: "",
    priority: "INFO"
  });

  // 🔥 SECURITY GUARD
  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const role = decoded.roles ? decoded.roles[0] : "";

      if (role !== "ROLE_ADMIN") {
        navigate("/dashboard", { replace: true });
        return;
      }

    } catch (e) {
      console.error("Invalid token");
      navigate("/login", { replace: true });
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const u = await getUsers();
      const r = await getRules();
      const t = await getTemplates();

      setUsers(u?.data || []);
      setRules(r?.data || []);
      setTemplates(t?.data || []);
    } catch (e) {
      console.error("Load error:", e);
    }
  };

  const filteredUsers = users.filter(u =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateRule = async () => {
    await createRule(ruleForm);
    loadData();
  };

  return (
    <div className="app-bg flex min-h-screen text-white">

      <Sidebar />

      <div className="flex-1 p-12 space-y-12">

        <DashboardHeader
          currency={"INR"}
          setCurrency={() => {}}
          days={30}
          setDays={() => {}}
        />

        {/* USERS */}
        <div className="glass-card p-6">
          <h2 className="text-xl mb-4">Users</h2>

          <input
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-dark mb-4"
          />

          {filteredUsers.map(u => (
            <div key={u.id}
              className="flex justify-between bg-white/5 p-3 rounded-xl mb-2">

              <div>
                <div>{u.email}</div>
                <div className="text-sm text-gray-400">{u.role}</div>
              </div>

              <div className="space-x-2">
                <button onClick={() => activateUser(u.id)} className="btn-green">Activate</button>
                <button onClick={() => deleteUser(u.id)} className="btn-red">Delete</button>
              </div>

            </div>
          ))}
        </div>

        {/* RULE FORM */}
        <div className="glass-card p-6">
          <h2 className="text-xl mb-4">Create Rule</h2>

          <div className="grid grid-cols-5 gap-4">

            <select className="input-dark"
              onChange={(e) => setRuleForm({ ...ruleForm, type: e.target.value })}>
              <option>COST</option>
              <option>SERVER</option>
            </select>

            <select className="input-dark"
              onChange={(e) => setRuleForm({ ...ruleForm, condition: e.target.value })}>
              <option value="GREATER_THAN">&gt;</option>
              <option value="LESS_THAN">&lt;</option>
              <option value="EQUAL">=</option>
            </select>

            <input placeholder="Threshold"
              className="input-dark"
              onChange={(e) => setRuleForm({ ...ruleForm, threshold: e.target.value })} />

            <input placeholder="Template Key"
              className="input-dark"
              onChange={(e) => setRuleForm({ ...ruleForm, templateKey: e.target.value })} />

            <select className="input-dark"
              onChange={(e) => setRuleForm({ ...ruleForm, priority: e.target.value })}>
              <option>INFO</option>
              <option>WARNING</option>
              <option>ERROR</option>
            </select>

          </div>

          <button onClick={handleCreateRule} className="btn-primary mt-4">
            Create Rule
          </button>
        </div>

        {/* RULE LIST */}
        <div className="glass-card p-6">
          <h2 className="text-xl mb-4">Rules</h2>

          {rules.map(r => (
            <div key={r.id}
              className="flex justify-between bg-white/5 p-3 rounded-xl mb-2">

              <div>
                {r.type} {r.condition} {r.threshold}
              </div>

              <div className="space-x-2">
                <button onClick={() => setSelectedRule(r)} className="btn-blue">Edit</button>
                <button onClick={() => deleteRule(r.id)} className="btn-red">Delete</button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {selectedRule && (
        <EditRuleModal
          rule={selectedRule}
          onClose={() => setSelectedRule(null)}
          onSave={async (updated) => {
            await updateRule(updated.id, updated);
            setSelectedRule(null);
            loadData();
          }}
        />
      )}

    </div>
  );
};

export default AdminDashboard;