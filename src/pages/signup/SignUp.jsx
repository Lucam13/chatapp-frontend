import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";
import useGetAreas from "../../hooks/useGetAreas";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
    areaId: "",
  });

  const { loading, signup } = useSignup();
  const { areas, loading: loadingAreas } = useGetAreas();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-orange-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-8">
        <h1 className="text-3xl font-semibold text-center text-green-500">
          Registro<span className="text-orange-400"> EPAR</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">
                Nombre Completo
              </span>
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full input input-bordered  h-10  bg-orange-100"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-700 ">
                Nombre de usuario
              </span>
            </label>
            <input
              type="text"
              placeholder="Usuario"
              className="w-full input input-bordered h-10 bg-orange-100"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-700">
                Contraseña
              </span>
            </label>
            <input
              type="password"
              placeholder="Ingrese su contraseña"
              className="w-full input input-bordered h-10  bg-orange-100"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-700">
                Confirme su contraseña
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              className="w-full input input-bordered h-10  bg-orange-100"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.gender}
          />
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">Área</span>
            </label>
            <select
              className="w-full input input-bordered h-10 bg-orange-100"
              value={inputs.areaId}
              onChange={(e) => setInputs({ ...inputs, areaId: e.target.value })}
              disabled={loadingAreas}
            >
              <option value="">Seleccione un área</option>
              {areas.map((area) => (
                <option key={area._id} value={area._id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
          <Link
            to={"/login"}
            className="text-sm text-gray-700 hover:underline hover:text-blue-600 mt-2 inline-block"
            href="#"
          >
            Ya tenes una cuenta?
          </Link>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700 "
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUp;
