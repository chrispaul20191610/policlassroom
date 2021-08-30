import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import User from "./api/user";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Modal,
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
  avatar: yup.string().required("Este campo es obligatorio"),
});

const register = () => {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userInfo, setUserInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [errorsList, setErrorsList] = useState([]);
  const [state, setState] = useState(false);
  const [checkRole, setCheckRole] = useState(null);

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
  const onSubmit = async (formData) => {
    setUserInfo(null);
    setResult("Enviando los datos...");

    console.log("formData", formData);
    console.log(setUserInfo);

    // await api.post("/register", { ...formData });
    try {
      const response = await User.register(formData);
      console.log("response", response);
      setUserInfo(response.data);
      setResult("Usuario registrado correctamente =D");
      reset();
    } catch (e) {
      console.log("e", e.response);
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

  let styleForm = {
    margin: "2% 35%",
    textAlign: "center",
    background: "white",
  };

  let styleError = {
    color: "red",
  };

  return (
    <div>
      <Button type="button" color="primary" onClick={handleOpen}>
        Registro
      </Button>
      <Modal open={state} onClose={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={styleForm}
          encType="multipart/form-data"
        >
          <h2>Ingrese sus datos</h2>

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
                />
              )}
            />
            <p style={styleError}>{errors.name?.message}</p>
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
                />
              )}
            />
            <p style={styleError}>{errors.last_name?.message}</p>
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
                />
              )}
            />
            <p style={styleError}>{errors.description?.message}</p>
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
                  >
                    <MenuItem value="ROLE_STUDENT">ESTUDIANTE</MenuItem>
                    <MenuItem value="ROLE_TEACHER">PROFESOR</MenuItem>
                  </Select>
                </div>
              )}
            />
            <p>Nota: {checkRole}</p>

            {/* <select {...register("role")}>
            <option value="ROLE_STUDENT">ESTUDIANTE</option>
            <option value="ROLE-TEACHER">PROFESOR</option>
          </select> */}
            <p style={styleError}>{errors.role?.message}</p>
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
                />
              )}
            />
            <p style={styleError}>{errors.password_confirmation?.message}</p>
          </div>

          <div>
            <Controller
              name="avatar"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Avatar"
                  variant="outlined"
                  size="small"
                />
              )}
            />
            {/* <input
            {...register("avatar", { required: true })}
            type="file"
            name="imagen"
          /> */}
            <p style={styleError}>{errors.avatar?.message}</p>
          </div>

          <p>{result}</p>
          {userInfo && (
            <div>
              <Image src={userInfo.user.avatar} width={640} height={480} />
              <div>Nombre: {userInfo.user.name}</div>
              <div>Apellido: {userInfo.user.last_name}</div>
              <div>Role: {userInfo.user.role}</div>
              <div>Token: {userInfo.token}</div>
            </div>
          )}

          {errorsList.length > 0 && (
            <ul>
              {errorsList.map((errorList) => (
                <li key={errorList}>{errorList}</li>
              ))}
            </ul>
          )}
          <Button
            type="submit"
            variant="contained"
            size="medium"
            color="primary"
          >
            {" "}
            REGISTRARSE{" "}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default register;
