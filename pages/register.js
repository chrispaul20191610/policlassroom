import { useForm } from "react-hook-form";
import { useState } from "react";
import User from "./api/user";
import Image from "next/image";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [userInfo, setUserInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [errorsList, setErrorsList] = useState([]);

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
      reset();
      setResult("Usuario registrado correctamente =D");
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

  console.log(watch("role"));

  let style = {
    display: "table-caption",
    margin: "20px",
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={style}
        encType="multipart/form-data"
      >
        <div>
          <input
            {...register("name", { required: true })}
            type="name"
            placeholder="Nombre"
          />
          <p>{errors.name?.message}</p>
        </div>

        <div>
          <input
            {...register("last_name", { required: true })}
            type="last_name"
            placeholder="Apellido"
          />
          <p>{errors.last_name?.message}</p>
        </div>

        <div>
          <textarea
            {...register("description", { required: true })}
            placeholder="Descripción"
          />
          <p>{errors.description?.message}</p>
        </div>

        <div>
          <select {...register("role")}>
            <option value="ROLE_STUDENT">ESTUDIANTE</option>
            <option value="ROLE-TEACHER">PROFESOR</option>
          </select>
          <p>{errors.role?.message}</p>
        </div>

        <div>
          <input
            {...register("email", { required: true })}
            type="email"
            placeholder="Correo electrónico"
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Contraseña"
          />
          <p>{errors.password?.message}</p>
        </div>

        <div>
          <input
            {...register("password_confirmation", { required: true })}
            type="password"
            placeholder="Confirme su contraseña"
          />
          <p>{errors.password_confirmation?.message}</p>
        </div>

        <div>
          <input
            {...register("avatar", { required: true })}
            type="avatar"
            placeholder="Avatar"
          />
          {/* <input
            {...register("avatar", { required: true })}
            type="file"
            name="imagen"
          /> */}
          <p>{errors.avatar?.message}</p>
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default register;
