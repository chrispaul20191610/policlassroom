import api from "../../api";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const CoursePage = ({ course }) => {
  if (!course) {
    return "Cargando datos ...";
  }

  return (
    <div>
      <Head>
        <title>Poli Curso </title>
      </Head>

      <h3>{course.name}</h3>

      <Image src={course.photo} width={640} height={480} />
      <div>
        <p>
          Profesor: {course.teacher.name} {course.teacher.last_name}
        </p>
        <br></br>
        <p>Corta Bio: {course.teacher.descriptio}</p>
      </div>
      <Link href="/courses">Volver a la lista de cursos</Link>
    </div>
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
