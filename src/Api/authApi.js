import { useState, useEffect } from "react";
import { axiosPublic } from "../lib/axious";

export const useGetCurrentUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axiosPublic.get("/auth/current-user");
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching current user", error);
      }
    };
    fetchCurrentUser();
  }, []);

  return user;
};
