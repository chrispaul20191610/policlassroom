import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link'
import {Box, Container, Grid} from "@material-ui/core";
import {FacebookOutlined, InstagramOutlined, LinkedinOutlined, MailOutlined, WhatsAppOutlined} from "@ant-design/icons";
import Image from "next/image";


const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#408bd7",
        color: "#ffffff",
        alignItems: "center",
        padding:"10px",
        fontSize:"20px",
        bottom:"0%",
        position:"fixed",
        width:"100%",
        alignSelf:"flex-end",

    },
    iconos: {
        display: "flex",
    },
}))

export default function Footer() {
    //let styleFooter={ zIndex:"100",width:"100%",bottom:"0px !important",alignSelf:"flex-end",position:"fixed"}
    const classes = useStyles();
    return (
        <div>

            <footer className={classes.footer}>
                <Container>
                     <Grid container xs={12}>
                        <Grid xs={2}>
                            <div className="row">
                                <div className="col-6">
                                        <Typography>
                                            <h3>Síguenos </h3>

                                        </Typography>

                                    <Box className={classes.iconos} align="center">
                                        <a href='https://facebook.com/' style={{margin: "10px"}}><FacebookOutlined/></a>
                                        <a href='https://instagram.com/' style={{margin: "10px"}}><InstagramOutlined/></a>
                                        <a href='https://linkedin.com/' style={{margin: "10px"}}><LinkedinOutlined/></a>
                                    </Box>

                                </div>

                            </div>
                        </Grid>

                        <Grid xs={2}>
                            <div className="row">
                                <div className="col">

                                        <Typography>
                                            <h3>Contáctanos</h3>

                                        </Typography>

                                    <Box className={classes.iconos} align="center">
                                        <a href='https://web.whatsapp.com/' style={{margin: "10px"}}><WhatsAppOutlined />  +593345675457</a>

                                    </Box>

                                </div>

                            </div>

                        </Grid>
                         <Grid xs={3}>
                             <div className="row">
                                 <div className="col">

                                     <Typography>
                                         <h3>Escríbenos</h3>

                                     </Typography>

                                     <Box className={classes.iconos} align="center">
                                         <a href='https://gmail.com/' style={{margin: "10px"}}><MailOutlined /> policlassroom@gmail.com</a>

                                     </Box>

                                 </div>

                             </div>

                         </Grid>


                         <Grid xs={3}>
                             <p>
                                 <Link href="/"><u>Nuestros cursos</u></Link>
                             </p>

                         </Grid>

                         <Grid xs={2}>
                             <Image
                                 src="/images/poli.png"// Route of the image file
                                 height={220} // Desired size with correct aspect ratio
                                 width={320} // Desired size with correct aspect ratio
                             />

                         </Grid>

                             <Typography>
                                 Policlassroom Derechos reservados
                             </Typography>
                    </Grid>
                </Container>
            </footer>
        </div>
    );
}