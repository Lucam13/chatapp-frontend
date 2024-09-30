// src/components/sidebar/Area.js
import { useDispatch, useSelector } from "react-redux";
import useArea from "../../zustand/useArea"; // Cambia este hook si tienes uno específico para áreas

const Area = ({ area, lastIdx }) => {
  const { selectedArea, setSelectedArea } = useArea(); // Hook similar a useConversation
  const isSelected = selectedArea?._id === area._id;

  const dispatch = useDispatch();
  const unReadMessages = useSelector((state) => state.unReadMessages);

  const handleClick = () => {
    setSelectedArea(area);
    if (unReadMessages[area._id]) {
      dispatch({
        type: "REMOVE_UNREAD_MESSAGE",
        payload: area._id,
      });
    }
  };

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-green-800 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-green-600" : ""}
        ${unReadMessages[area._id] ? "border-l-8 border-r-8 border-orange-500" : ""}
			`}
        onClick={handleClick}
      >
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-700">{area.name}</p>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};
export default Area;
