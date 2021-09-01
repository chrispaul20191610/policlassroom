import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import User from "./api/user";
import { signIn, signOut, useSession } from "next-auth/client";
import { Button, Modal, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(6, "Ingrese al menos 6 caracteres")
    .required("Este campo es obligatorio"),
});

const login = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [token, setToken] = useState("");
  const [state, setState] = useState(false);
  const [session, loading] = useSession();

  console.log("session", session);
  console.log("loading", loading);
  const user = session?.user;
  console.log("user", user);

  const handleOpen = () => {
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };

  const onSubmit = async (credentials) => {
    setResult("Enviando los datos...");

    console.log("credentials", credentials);

    try {
      const response = await User.login(credentials);
      console.log("response", response);
      setToken(response.data);
      setResult("Usuario logeado correctamente =D");
      reset();
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;

      setResult("Ocurrió un error D'= ");
      if (response) {
        if (response.data.error) {
          const error = response.data.error;
          setError(error);
        }
      }
    }
  };

  let styleButtons = {
    justifyContent: "space-between",
    display: "flex",
    margin: "auto 5%",
  };
  let styleForm = {
    margin: "7% 30%",
    textAlign: "center",
    background: "white",
  };

  let styleError = {
    color: "red",
  };
  return (
    <div>
      <button onClick={() => signIn("github")}>Inicie Sesión con GitHub</button>

      {user && (
        <div>
          <img src={user.image} width="420" />
          <h2>{user.name}</h2>
          <button onClick={() => signOut("github")}>Cerrar Sesión</button>
        </div>
      )}

      <br></br>

      <Button type="button" color="primary" onClick={handleOpen}>
        Inicio de Sesión
      </Button>
      <Modal open={state} onClose={handleClose}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} style={styleForm}>
            <div>
              <h2> INICIO DE SESIÓN</h2>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Correo electrónico"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p style={styleError}>{errors.email?.message}</p>
            </div>

            <div>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    size="small"
                  />
                )}
              />
              <p style={styleError}>{errors.password?.message}</p>
            </div>

            <div style={styleButtons}>
              <Button
                type="submit"
                variant="contained"
                size="medium"
                color="primary"
              >
                {" "}
                INICIAR SESIÓN{" "}
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                size="medium"
                color="primary"
              >
                {" "}
                CANCELAR{" "}
              </Button>
            </div>

            <p>{result}</p>

            {token && <p>TOKEN:{token.token}</p>}
            {error && <p>{error}</p>}
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default login;
