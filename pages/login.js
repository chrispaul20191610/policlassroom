import { signIn, signOut, useSession } from "next-auth/client";

export default function login() {
  const [session, loading] = useSession();

  console.log("session", session);
  console.log("loading", loading);

  const user = session?.user;

  console.log("user", user);

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
    </div>
  );
}
