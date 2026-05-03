const getStrength = (password) => {
  let score = 0;
  if (password.length > 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
};

const PasswordStrength = ({ password }) => {
  const strength = getStrength(password);

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500"
  ];

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1,2,3,4].map((i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded ${
              strength >= i ? colors[strength - 1] : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <p className="text-xs mt-1 text-gray-400">
        {["Weak", "Okay", "Good", "Strong"][strength - 1] || ""}
      </p>
    </div>
  );
};

export default PasswordStrength;