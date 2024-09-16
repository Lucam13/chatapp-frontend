import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import { useAuthContext } from "../../context/AuthContext";

const ADMIN_AREA_ID = "66b4e3b660fac24724430546";

const Sidebar = () => {
  const { authUser } = useAuthContext();
  console.log("Usuario", authUser)
  return (
    <div className="border-r border-orange-500 p-4 flex flex-col">
      <SearchInput />
      <div className="divider px-3"></div>
      <Conversations showAllAreas={authUser?.areaId === ADMIN_AREA_ID} />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;