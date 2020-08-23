
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
            COURSE_ID: 0,
            REFERENCE: "Mustang",
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

    changeColor = () => {
        this.setState({ color: "blue" });
    }
    render() {
        return (
            <div>
                
                <InputLabel id="demo-simple-select-label">Please select a course to edit the syllabus: </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={1}
                    onChange={this.handleChange}
                >
                    {this.state.COURSE_ARRAY.map(u => <MenuItem value={u.ID}>{u.NAME}</MenuItem>)}
                </Select>
            </div>
        );
    }
}

export default Syllabus;