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
import MaterialTable from 'material-table'

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
var coursename_lookup = [];
var courseid_lookup = [];
var current_course = "";
var courselookup_main = { '1': 'İstanbul', '2': 'Şanlıurfa' };

const columns = [
    { title: 'STUDENTS', field: 'STUDENTS' },
    { title: 'CLASS_ID', field: 'CLASS_ID' },
    {
        title: 'COURSE_ID', 
        field: 'COURSE_ID',
        lookup: courselookup_main
    },
    { title: 'TEACHER', field: 'TEACHER' },
    { title: "NEXT_DATETIME", field: "NEXT_DATETIME" },

];

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
                        this.setState({ CLASS_ARRAY: class_apicall, COURSE_ARRAY: course_apicall });
                        console.log(this.state);
                        //then generate the lookup values for material-table
                        var i;
                        for (i = 0; i < this.state.COURSE_ARRAY.length; i++) {
                            coursename_lookup.push(this.state.COURSE_ARRAY[i].NAME);
                            courseid_lookup.push(this.state.COURSE_ARRAY[i].ID);
                            //courselookup_main[i] = [{ '1': 'İstanbul', '2': 'Şanlıurfa' }];
                            courselookup_main[this.state.COURSE_ARRAY[i].ID] = this.state.COURSE_ARRAY[i].NAME;
                            //console.log(courselookup_main);
                        }

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
                <br></br>
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        columns={columns}
                        data={this.state.CLASS_ARRAY}
                        title="Demo Title"
                    />
                </div>

            </div>
        );
    }
}

export default Syllabus;