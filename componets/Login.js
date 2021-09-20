import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { Button, Modal, TextField } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/auth";
import styles from "../styles/Login.module.css";

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

const Login = () => {
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
  const [state, setState] = useState(false);
  const { login } = useAuth();
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
      const response = await login(credentials);
      console.log("response", response);
      setResult("Usuario logeado correctamente =D");
      reset();
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;

      setResult("Ocurrió un error D'= ");
      if (response) {
        if (response.data.error) {
          const error = response.data.error;
          console.log(error);
          setError(error);
        }
      }
    }
  };

  return (
    <div>
      <Button type="button" color="secondary" onClick={handleOpen}>
        Inicio de Sesión
      </Button>
      <Modal open={state} onClose={handleClose}>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div>
              <div className={styles.head}>
                <Title> INICIO DE SESIÓN </Title>
              </div>
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
                    color="primary"
                  />
                )}
              />
              <Error>{errors.email?.message}</Error>
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
                    color="primary"
                  />
                )}
              />
              <Error>{errors.password?.message}</Error>
            </div>

            <Result> {result}</Result>
            {error && <Error>{error}</Error>}

            <div className={styles.buttons}>
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
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Login;

const Title = styled.h2`
  flex-grow: 1;
  color: white;
`;

const Result = styled.h4`
  flex-grow: 1;
  color: black;
`;

const Error = styled.h4`
  flex-grow: 1;
  color: red;
`;
