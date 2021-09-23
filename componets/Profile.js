import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
/*import Router from 'next/router'*/
import styled from "styled-components";
import { Button, Avatar, Box, Modal } from "@material-ui/core";
import { useAuth } from "../contexts/auth";
import api from "../api";

const Profile = () => {
  let styleForm = {
    margin: "2% 38%",
    textAlign: "center",
    background: "white",
    height: "60%",
  };

  /* estilos de perfil */

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: "1px",
      background: "#408AB4",
    },
    container: {
      /*display: 'grid',*/
      gridTemplateColumns: "repeat(12, 1fr)",
      background: "#408AB4",
      gridGap: theme.spacing(3),
    },

    paper: {
      padding: "6px",

      color: theme.palette.text.secondary,
      boxShadow: "none",
    },

    profile: {
      textAlign: "left",
      paddingLeft: "1px",
    },

    exit: {
      padding: "6px",
      textAlign: "right",
      color: theme.palette.text.secondary,
      background: "#408AB4",
      boxShadow: "none",
    },

    edit: {
      background: "#408AB4",
    },

    imgprofile: {
      width: "100%",
      height: "10em",
      borderRadius: "0%",
    },
  }));

  const [open, setOpen] = React.useState(false);
  const { user } = useAuth();

  console.log("user", user);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <div>
      <Button color="primary" onClick={handleOpen}>
        MI PERFIL{" "}
      </Button>

      <Modal open={open}>
        <div style={styleForm}>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid className={classes.profile} item xs={8}>
                <Box p={1}>Perfil</Box>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.exit}>
                  <CloseIcon onClick={handleClose} />
                </Paper>
              </Grid>
            </Grid>
          </div>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <div>
                  <p> {user.name} </p>
                  <br></br>
                  <p>{user.last_name}</p>
                  <br></br>
                  <p>{user.email}</p>
                  <br></br>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Avatar
                  className={classes.imgprofile}
                  alt={user.name}
                  src={api.get(user.avatar)}

                  //src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ja63pG-b1ebiic3ZwhA891LcdOW-UnYoqw&usqp=CAU"
                />
              </Paper>
            </Grid>
          </Grid>

          <Title>
            <p>Descripcion </p>
          </Title>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div>
                  <Box m={1} border={1} height="100%">
                    <p>{user.description}</p>
                  </Box>
                </div>
              </Paper>
            </Grid>
          </Grid>

          <Button
            className={classes.edit}
            type="submit"
            variant="contained"
            size="medium"
            background="#408AB4"
            onClick={handleClose}
          >
            {" "}
            Cerrar{" "}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;

/*estilos*/

export const Title = styled.div`
  text-align: left;
  padding-left: 1em;
`;

/*api*/
/* export async function getStaticProps() {
  const { getAuthenticatedUser } = useAuth();
  let user;
  try {
    const response = getAuthenticatedUser();
    console.log("response", response);
    user = response.data.data;
    console.log("user", user);
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      user,
    },
  };
} */
