import { useRef } from "react";

const OTPInput = ({ otp, setOtp }) => {
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex justify-between gap-2">
      {otp.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputs.current[i] = el)}
          value={digit}
          onChange={(e) => handleChange(e.target.value, i)}
          maxLength={1}
          className="w-12 h-12 text-center text-lg rounded-xl
            bg-white/5 border border-white/10
            focus:ring-2 focus:ring-purple-500 outline-none"
        />
      ))}
    </div>
  );
};

export default OTPInput;