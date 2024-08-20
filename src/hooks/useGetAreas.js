import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const useGetAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch("/api/areas");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setAreas(data);
        setLoading(false);
      } catch (err) {
        toast.error(err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, []);

  return { areas, loading, error };
};

export default useGetAreas;
