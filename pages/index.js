import React from "react";
import api from "../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/courses.module.css";
import { Button } from "@material-ui/core";

const CoursesPage = ({ courses }) => {
  if (!courses) {
    return "Cargando cursos ...";
  }
  return (
    <div className={styles.body}>
      <Head>
        <title>PoliClassroom</title>
      </Head>

      <h1 className={styles.title}>Inscribite a nuestros cursos</h1>
      <div className={styles.courses}>
        {courses.map((course) => (
          <div key={course.id} className={styles.course}>
            <div className={styles.coursecontenido}>
              <Link href={`/courses/${course.id}`}>
                <h2 className={styles.name}>{course.name}</h2>
              </Link>

              <Link href={`/courses/${course.id}`}>
                <Image
                  src={course.photo}
                  width={300}
                  height={200}
                  justifyContent="center"
                />
              </Link>

              <div className={styles.description}>{course.description}</div>
              <Button
                variant="contained"
                color="primary"
                href={`/courses/${course.id}`}
              >
                Inscribete
              </Button>
            </div>
          </div>
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
