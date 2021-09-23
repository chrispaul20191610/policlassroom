import api from "../../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import styles from "@/styles/Course.info.module.css";
import Register from "../../componentes/Register";
import Loading from "../../componentes/loading";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const CoursePage = ({ course }) => {
  const classes = useStyles();
  if (course === null) {
    return <Loading/>;
  }


  return (
    <>
      <Head>
        <title>PoliClassroom</title>
      </Head>

      <div className={styles.header}>
        <Button>
          <Link href="/">
            <ArrowBackIosIcon />
          </Link>
        </Button>
        <h1 className={styles.title}>Poli Curso</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.info}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
          <Register color="primary" />
        </div>
        <Image src={course.photo} width={640} height={480} />
      </div>

      <h1 className={styles.title}>Profesor</h1>

      <div className={styles.section}>
        <div className={styles.teacher}>
          <Avatar
            alt={course.teacher.name}
            src={course.teacher.avatar}
            className={classes.large}
          />
          <p>
            Profesor: {course.teacher.name} {course.teacher.last_name}
          </p>
        </div>

        <div className={styles.info}>
          <p>Corta Bio: {course.teacher.description}</p>
        </div>
      </div>
    </>
  );
};

export default CoursePage;

export async function getStaticProps({ params }) {
  let course = null;
  try {
    console.log("params.id", params.id);
    const response = await api.get(`/courses/${params.id}`);
    console.log("response", response);
    course = response.data;
  } catch (e) {
    console.log("error", e);
  }

  return {
    props: {
      course,
    }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  const response = await api.get(`/courses`);
  const courses = response.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = courses.map((course) => ({
    params: { id: "" + course.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
