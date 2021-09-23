import React from "react";
import api from "../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/courses.module.css";
import { Button } from "@material-ui/core";
import withoutAuth from "hocs/withoutAuth";
import Loading from "../componentes/loading";

const CoursesPage = ({ courses }) => {


    if (courses === null) {
        return <Loading/>;
    }

  return (
    <div >
      <Head>
        <title>PoliClassroom</title>
      </Head>


      <div className={styles.body}>

          <h1 className={styles.title}>Inscríbite a nuestros cursos</h1>
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
                    Más información
                  </Button>
                </div>
              </div>
            ))}
          </div>

      </div>
    </div>
  );
};

export default withoutAuth(CoursesPage);

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
