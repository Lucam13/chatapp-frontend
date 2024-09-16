import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-orange-200 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-9">
        <h1 className="text-3xl font-semibold text-center text-orange-500">
          Inicio de sesión
          <span className="text-green-500"> Mensajeria EPAR</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-700">
                Usuario
              </span>
            </label>
            <input
              type="text"
              placeholder="Ingrese su nombre de usuario"
              className="w-full input input-bordered h-10  bg-orange-100"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link
            to="/signup"
            className="text-sm text-gray-700 hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            {"No"} tenes una cuenta?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2" disabled={loading}>
              {loading ? (
                <span className="loading loading-spinner "></span>
              ) : (
                "Ingresar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
