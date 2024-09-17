import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useAuthContext } from "../../context/AuthContext";

const ADMIN_AREA_ID = "66b4e3b660fac24724430546";

const Sidebar = () => {
  const { authUser } = useAuthContext();

  return (
    <div className="border-r border-orange-500 p-4 flex flex-col">
      <img className="ml-36 h-16 w-16" src="../../public/logoEpar.png"></img>
      <div className="divider px-3"></div>
      <Conversations showAllAreas={authUser?.areaId === ADMIN_AREA_ID} />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;