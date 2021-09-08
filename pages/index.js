import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Poli Classroom</title>
      </Head>

      <h1>Bienvenidos!!</h1>
      <Link href="/registro">Ir al Registro</Link>
      <br></br>
      <Link href="/inicio-sesion">Ir al Inicio de sesion</Link>
      <br></br>
      <Link href="/courses">Cursos</Link>
    </div>
  );
}
