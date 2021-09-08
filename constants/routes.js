const publicRoutes = {
  LOGIN: "/login",
  REGISTER: "/register",
  COURSES: "/courses",
  // USERS: "/usuarios",
  // USERS_ID: `/usuario/:id`,
};

const privateRoutes = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
