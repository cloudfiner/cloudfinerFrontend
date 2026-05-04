// features/cloud/aws/awsService.js
import axios from "axios";
import { getAccessToken } from "@/lib/authService";

const API = `${import.meta.env.VITE_API_URL}/api/aws`;

export const getSetup = async () => {
  const token = getAccessToken();

  const res = await axios.get(`${API}/setup`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const connectAws = async (roleArn) => {
  const token = getAccessToken();

  const res = await axios.post(
    `${API}/connect`,
    { roleArn },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};