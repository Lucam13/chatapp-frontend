import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAreas } from "../redux/actions/actions";

const useGetAreas = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const areas = useSelector((state) => state.areas);
  const fetchedAreas = useSelector((state) => state.fetchedAreas);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/areas`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setLoading(false);
        dispatch(getAreas(data));
      } catch (err) {
        toast.error(err.message);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedAreas) {
      fetchAreas();
    }
  }, [fetchedAreas, dispatch]);

  return { areas, loading, error };
};

export default useGetAreas;
