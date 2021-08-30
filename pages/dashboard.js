import { getSession } from "next-auth/client";

export default function dashboard({ session }) {
  const user = session?.user;

  console.log(user);

  return (
    <div>
      <h1>ESTA PAGINA VEN SÓLO LOS QUE HAN INICIADO SESIÓN</h1>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  //Redireccion
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        pemanet: false,
      },
    };
  }

  return {
    props: { session },
  };
}
