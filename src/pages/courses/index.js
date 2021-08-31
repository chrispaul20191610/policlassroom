import React from "react";
import api from "../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const CoursesPage = ({ courses }) => {
  if (!courses) {
    return "Cargando cursos ...";
  }

  return (
    <div>
      <Head>
        <title>Poli Cursos </title>
      </Head>

      <h2>Lista de Cursos</h2>
      <Link href="/"> Volver al Inicio</Link>
      <div>
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <div>
              <Image src={course.photo} width={200} height={200} />
              <div>
                <p>NOMBRE: {course.name}</p>
                <br></br>
                <p>{course.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;

export async function getStaticProps() {
  let courses = [];
  try {
    const response = await api.get("courses");
    console.log("response", response);
    courses = response.data.data;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      courses,
    },
  };
}
