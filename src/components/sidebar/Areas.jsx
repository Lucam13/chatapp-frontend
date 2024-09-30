import useGetAreas from "../../hooks/useGetAreas"; // Cambiado el nombre del hook

import Area from "./Area"; // Si tienes un componente de área, cambia "Conversation" a "Area"

const Areas = ({ showAllAreas }) => {
  const { loading, areas } = useGetAreas(); // Cambiado "conversations" a "areas"

  const filteredAreas = showAllAreas
    ? areas
    : areas.filter(
        (area) => area.name !== "ADMINISTRACIÓN" // Filtramos las áreas
      );
      
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {filteredAreas?.map((area, idx) => (
        <Area
          key={area._id}
          area={area}
          lastIdx={idx === filteredAreas.length - 1} // Manejamos las áreas
        />
      ))}

      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Areas;
