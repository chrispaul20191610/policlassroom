const publicRoutes = {
  HOME: "/",
  COURSES_ID: `/courses/:id`,
  // USERS: "/usuarios",
  // USERS_ID: `/usuario/:id`,
};

const privateRoutes = {
  DASHBOARD: "/dashboard",
  // ARTICLE_ID: "/articulo/:id",
};

const Routes = {
  ...publicRoutes,
  ...privateRoutes,
};
export default Routes;
