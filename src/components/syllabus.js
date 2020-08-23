
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


var course_apicall = [];

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

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({ COURSE_ID: event.target.value });

        axios.post("https://zmsedu.com/api/admin/syllabus/get", {
            //ROLE: "Student"
        })
        .then(res => {
            const courses = res.data.SYLLABUS;
            console.log(courses);
            this.setState({ SELECTED: true });

        }).catch(error => {
            alert(error);
        });

    }

    render() {
        let editor;
        if(this.state.SELECTED){
            editor = <h1>True</h1>;
        }
        else{
            editor = <h1>Select a Class</h1>;
        }

        return (
            <div>
                <InputLabel id="demo-simple-select-label">Please select a course to edit the syllabus: </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={this.state.COURSE_ID}
                    onChange={this.handleChange}
                >
                    {this.state.COURSE_ARRAY.map(u => <MenuItem value={u.ID}>{u.NAME}</MenuItem>)}
                </Select>

                {editor}
                


            </div>
        );
    }
}

export default Syllabus;