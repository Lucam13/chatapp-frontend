import Areas from "./Areas";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../../context/AuthContext";

const ADMIN_AREA_ID = "66b4e3b660fac24724430546";

const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="border-r border-orange-500 p-4 flex flex-col">
      <img className="ml-36 h-16 w-16" src="logoEpar.png" alt="e.p.a.r" ></img>
      <div className="divider px-3"></div>
      <Areas showAllAreas={authUser?.areaId === ADMIN_AREA_ID} />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;