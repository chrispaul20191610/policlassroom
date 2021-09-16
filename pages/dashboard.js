import withAuth from "../hocs/withAuth";


const Dashboard = () => {
  return (
    <div>
      <h1>ESTA PAGINA VEN SÓLO LOS QUE HAN INICIADO SESIÓN</h1>
      
    </div>

    
  );
};
export default withAuth(Dashboard);
