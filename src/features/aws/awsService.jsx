// features/cloud/aws/awsService.js
import api from "@/lib/api";

export const getSetup = async () => {
  try {
    const res = await api.get("/api/aws/setup");
    return res.data;
  } catch (err) {
    console.error("AWS Setup fetch failed:", err.message);
    return null;
  }
};

export const connectAws = async (roleArn) => {
  try {
    const res = await api.post("/api/aws/connect", { roleArn });
    return res.data;
  } catch (err) {
    console.error("AWS Connect failed:", err.message);
    return null;
  }
};