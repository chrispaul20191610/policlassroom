import { useForm } from "react-hook-form";
import { useState } from "react";
import User from "./api/user";
import Image from "next/image";

const register = () => {
  const { register, handleSubmit, watch } = useForm();

  const [userInfo, setUserInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [errors, setError] = useState([]);

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
    } catch (e) {
      console.log("e", e.response);
      const { response } = e;

      setResult("Ocurrió un error D'= ");
      if (response) {
        if (response.data.errors) {
          const errors = response.data.errors;
          const errorList = Object.values(errors);
          /* const errorList = [];
          for (let field in errors) {
            errorList.push(errors[field]);
          } */
          setError(errorList);
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
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={style}
        encType="multipart/form-data"
      >
        <input
          {...register("name", { required: true })}
          type="name"
          placeholder="Nombre"
        />
        <input
          {...register("last_name", { required: true })}
          type="last_name"
          placeholder="Apellido"
        />
        <textarea
          {...register("description", { required: true })}
          placeholder="Descripción"
        />
        <div>
          <select {...register("role")}>
            <option value="ROLE_STUDENT">ESTUDIANTE</option>
            <option value="ROLE-TEACHER">PROFESOR</option>
          </select>
        </div>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Correo electrónico"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="Contraseña"
        />
        <input
          {...register("password_confirmation", { required: true })}
          type="password"
          placeholder="Confirme su contraseña"
        />

        <input
          {...register("avatar", { required: true })}
          type="file"
          name="imagen"
        />

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
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

export default register;
