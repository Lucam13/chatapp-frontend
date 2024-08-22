import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../redux/actions/actions";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const { authUser } = useAuthContext();

  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  const fetchedConversations = useSelector(
    (state) => state.fetchedConversations
  );

  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BACKEND_URL}/api/areas`, {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(getConversations(data));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedConversations) {
      fetchConversations();
    }
  }, [fetchedConversations, dispatch]);

  return { loading, conversations };
};
export default useGetConversations;
