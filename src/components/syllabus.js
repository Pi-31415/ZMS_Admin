
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

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


var course_apicall = [];
var current_course = "";

class Syllabus extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            COURSE_ARRAY: [],
            COURSE_ID: 1,
            COURSE_NAME: "",
            REFERENCE: "",
            SELECTED: false,
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
                this.setState({ COURSE_ARRAY: course_apicall });
                console.log(this.state);

            }).catch(error => {
                alert(error);
            });

    }
    //Then get syllabus
    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({ COURSE_ID: event.target.value });

        axios.post("https://zmsedu.com/api/admin/syllabus/get", {
            //ROLE: "Student"
        })
            .then(res => {
                const courses = res.data.SYLLABUS;
                this.setState({ SELECTED: true });

                var i;
                for (i = 0; i < courses.length; i++) {
                    if (courses[i].COURSE_ID == this.state.COURSE_ID) {
                        var new_id = this.state.COURSE_ID - 1;
                        //console.log(this.state.COURSE_ARRAY[new_id].NAME);
                        this.setState({ COURSE_NAME: this.state.COURSE_ARRAY[new_id].NAME });
                    }
                }


            }).catch(error => {
                alert(error);
            });

    }

    render() {
        let editor;
        if (this.state.SELECTED) {

            editor = <h1>{this.state.COURSE_NAME}</h1>;
        }
        else {


            editor = <h1></h1>;
        }

        return (
            <div>
                <Paper>
                    <Container >
                        <InputLabel id="demo-simple-select-label">Please select a course to edit the syllabus: </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.COURSE_ID}
                            onChange={this.handleChange}
                        >
                            {this.state.COURSE_ARRAY.map(u => <MenuItem value={u.ID} key={u.ID}>{u.NAME}</MenuItem>)}
                        </Select>

                        {editor}
                    </Container>
                </Paper>

            </div>
        );
    }
}

export default Syllabus;