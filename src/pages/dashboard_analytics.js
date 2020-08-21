import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Navbar from '../components/navbar';
import Copyright from '../components/copyright';
import Iframe from 'react-iframe';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
//import Upload from '../components/upload';
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 200,
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar></Navbar>
            <main className={classes.content} style={{ backgroundColor: '#eee' }}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>

                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h2">
                                    Click Count
                                </Typography>
                                <p>This is the total count of how many times visitors click on the Course links and read the descriptions for each course.</p>
                                <Iframe url="https://zmsedu.com/analysis/iframe_bar.html"
                                    width="100%"
                                    height="600px"
                                    id="myId"
                                    frameBorder="0"
                                    className="myClassname"
                                    display="initial"
                                    position="relative" />
                            </Paper>

                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h2">
                                    Page Visit Count
                                </Typography>
                                <p>Counting is done every time the launchpage (https://zmsedu.com/) is loaded on any device. Data is shown for last 30 days.</p>
                                <Iframe url="https://zmsedu.com/analysis/iframe_chart.html"
                                    width="100%"
                                    height="600px"
                                    id="myId"
                                    frameBorder="0"
                                    className="myClassname"
                                    display="initial"
                                    position="relative" />
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>

                                <Iframe url="https://zmsedu.com/analysis/iframe_ratio.html"
                                    width="100%"
                                    height="300px"
                                    id="myId"
                                    frameBorder="0"
                                    className="myClassname"
                                    display="initial"
                                    position="relative" />
                            </Paper>
                        </Grid>

                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Typography variant="h5" component="h2">
                                    Server Log
                                </Typography>
                                <p>This is the list of activities the users perform on the launchpage. Scroll down to see more.</p>
                                <Iframe url="https://zmsedu.com/analysis/iframe_server.html"
                                    width="100%"
                                    height="600px"
                                    id="myId"
                                    frameBorder="0"
                                    className="myClassname"
                                    display="initial"
                                    position="relative" />
                            </Paper>
                        </Grid>

                    </Grid>

                    <Box pt={4}>
                        <Copyright />
                    </Box>
                </Container>
            </main>
        </div>
    );
}