import { useEffect, useState } from "react";

const useUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await fetch("/api/users"); // Reemplaza con la ruta correcta de tu API
				const data = await res.json();
				setUsers(data);
			} catch (error) {
				console.error("Error fetching users:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, []);

	return { users, loading };
};

export default useUsers;
