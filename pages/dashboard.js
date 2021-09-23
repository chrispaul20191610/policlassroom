import withAuth from "../hocs/withAuth";
import HomeTeacher from "../componentes/HomeTeacher";
import HomeStudent from "../componentes/HomeStudent";

const Dashboard = (props) => {
  const { user } = props;
  console.log("My User", user);
  return (
    <div>
      <h1>BIENVENIDO!!</h1>

      {user.role === "ROLE_TEACHER" && <HomeTeacher />}
      {user.role === "ROLE_STUDENT" && <HomeStudent />}
    </div>
  );
};
export default withAuth(Dashboard);
