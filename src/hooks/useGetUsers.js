import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/actions";

const useUsers = () => {
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const fetchedUsers = useSelector((state) => state.fetchedUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/users`, {
          method: "GET",
          credentials: "include",
        }); // Reemplaza con la ruta correcta de tu API
        const data = await res.json();
        if (data.error) throw new Error(data.error);

        dispatch(getUsers(data));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchedUsers) {
      fetchUsers();
    }
  }, [fetchedUsers, dispatch]);

  return { users, loading };
};

export default useUsers;
