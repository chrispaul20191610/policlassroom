import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "../styles/Register.module.css";
import { useAuth } from "../contexts/auth";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Modal,
  InputLabel,
} from "@material-ui/core";

const schema = yup.object().shape({
  name: yup.string().required("Este campo es obligatorio"),
  last_name: yup.string().required("Este campo es obligatorio"),
  description: yup.string().max(500).required("Este campo es obligatorio"),
  role: yup.string().required("Este campo es obligatorio"),
  email: yup
    .string()
    .email("Ingrese un correo válido")
    .required("Este campo es obligatorio"),
  password: yup
    .string()
    .min(6, "Ingrese al menos 6 caracteres")
    .required("Este campo es obligatorio"),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las claves no coinciden")
    .required("Este campo es obligatorio"),
  avatar: yup.mixed().required("Este campo obligatorio"),
});

const register = () => {
  const {
    handleSubmit,
    watch,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [result, setResult] = useState(null);
  const [errorsList, setErrorsList] = useState([]);
  const [checkRole, setCheckRole] = useState(null);
  const [state, setState] = useState(false);
  const { registerUser } = useAuth();

  const handleOpen = () => {
    setState(true);
  };

  const handleClose = () => {
    setState(false);
  };

  const handleRol = () => {
    if (watch("role") == "ROLE_TEACHER") {
      setCheckRole("Con este rol crea tu curso en nuestra página");
    }
    if (watch("role") == "ROLE_STUDENT") {
      setCheckRole("Con este rol inscríbite en cualquiera de nuestros cursos");
    }
  };

  const onSubmit = async (values) => {
    setResult("Enviando los datos...");

    console.log("values", values);

    // await api.post("/register", { ...formData });
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("last_name", values.last_name);
      formData.append("description", values.description);
      formData.append("role", values.role);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("password_confirmation", values.password_confirmation);
      formData.append("avatar", values.avatar[0]);

      console.log("formData", formData);

      const response = await registerUser(formData);
      console.log("response", response);
      setResult("Usuario registrado correctamente =D");
      //reset();
    } catch (e) {
      console.log("e", e);
      const { response } = e;

      setResult("Ocurrió un error D'= ");
      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          const NewErrorList = Object.values(errors);
          /* const errorList = [];
          for (let field in errors) {
            errorList.push(errors[field]);
          } */
          setErrorsList(NewErrorList);
        }
      }
    }
  };

  return (
    <div>
      <Button type="button" color="secondary" onClick={handleOpen}>
        Registrarse
      </Button>
      <Modal open={state} onClose={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.form}
          encType="multipart/form-data"
        >
          <div className={styles.head}>
            <Title>BIENVENIDO A POLICLASSROOM</Title>
            <Subtitle> Crea una cuenta gratuita </Subtitle>
          </div>

          <div>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nombre"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              )}
            />
            <Error>{errors.name?.message}</Error>
          </div>

          <div>
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Apellido"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              )}
            />
            <Error>{errors.last_name?.message}</Error>
          </div>

          <div>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Sobre mí"
                  variant="outlined"
                  size="medium"
                  multiline
                  maxRows={3}
                  color="primary"
                />
              )}
            />
            <Error>{errors.description?.message}</Error>
          </div>

          <div>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <InputLabel>Mi rol</InputLabel>
                  <Select
                    {...field}
                    label="Role"
                    variant="outlined"
                    size="small"
                    onClick={handleRol}
                    color="primary"
                  >
                    <MenuItem value="ROLE_STUDENT">ESTUDIANTE</MenuItem>
                    <MenuItem value="ROLE_TEACHER">PROFESOR</MenuItem>
                  </Select>
                </div>
              )}
            />
            <div className={styles.note}>
              <p> NOTA = {checkRole}</p>
            </div>
            {/* <select {...register("role")}>
            <option value="ROLE_STUDENT">ESTUDIANTE</option>
            <option value="ROLE-TEACHER">PROFESOR</option>
          </select> */}
            <Error>{errors.role?.message}</Error>
          </div>

          <div>
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

          <div>
            <Controller
              name="password_confirmation"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Confirma tu contraseña"
                  variant="outlined"
                  size="small"
                  color="primary"
                />
              )}
            />
            <Error>{errors.password_confirmation?.message}</Error>
          </div>

          <div>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className={styles.select}
              {...register("avatar")}
            />
            <Error>{errors.avatar?.message}</Error>
          </div>

          <Subtitle>{result}</Subtitle>

          {errorsList.length > 0 && (
            <ul>
              {errorsList.map((errorList) => (
                <li key={errorList}>{errorList}</li>
              ))}
            </ul>
          )}

          <div className={styles.buttons}>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              color="primary"
            >
              {" "}
              REGISTRARSE{" "}
            </Button>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleClose}
            >
              {" "}
              CANCELAR{" "}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default register;

const Title = styled.h2`
  flex-grow: 1;
  color: white;
`;

const Subtitle = styled.h4`
  flex-grow: 1;
  color: white;
`;

const Error = styled.h4`
  flex-grow: 1;
  color: red;
`;
