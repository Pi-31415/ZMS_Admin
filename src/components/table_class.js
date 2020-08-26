import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import MDReactComponent from 'markdown-react-js';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


var course_apicall = [];
var class_apicall = [];
var current_course = "";

class Syllabus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            COURSE_ARRAY: [],
            CLASS_ARRAY: []
        };
    }

    componentDidMount() {
        //First get course
        axios.post("https://zmsedu.com/api/admin/course/get", {
            //ROLE: "Student"
        })
            .then(res => {
                const courses = res.data.COURSES;
                course_apicall = courses;
                //Then get classes
                axios.post("https://zmsedu.com/api/admin/class/get", {
                    //ROLE: "Student"
                })
                    .then(res => {
                        const classes = res.data.CLASS;
                        class_apicall = classes;
                        this.setState({ CLASS_ARRAY: class_apicall,COURSE_ARRAY: course_apicall });
                        console.log(this.state);
                    }).catch(error => {
                        alert(error);
                    });
            }).catch(error => {
                alert(error);
            });
    }



    render() {
        return (
            <div>
                <Paper style={{ padding: 20, paddingTop: 30 }}>

                </Paper>
            </div>
        );
    }
}

export default Syllabus;