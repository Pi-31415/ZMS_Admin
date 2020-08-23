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
                //console.log(this.state);

            }).catch(error => {
                alert(error);
            });

    }
    //Then get syllabus
    handleChange = (event) => {
        //console.log(event.target.value);
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
                        this.setState({ REFERENCE: courses[i].REFERENCE[0] });

                    }
                }


            }).catch(error => {
                alert(error);
            });
    }

    updateText = (event) => {
        console.log(event.target.value);
        this.setState({ REFERENCE: event.target.value });
    }

    submitSyllabus = () => {
        
        var query = {
            "COURSE_ID": this.state.COURSE_ID,
            "REFERENCE": [this.state.REFERENCE]
        }
        console.log(query);

        //Update Syllabus
        axios.post("https://zmsedu.com/api/admin/syllabus/edit", query)
            .then(res => {
                console.log(res)
            }).catch(error => {
                alert(error);
            });

    }

    render() {
        let editor;
        if (this.state.SELECTED) {

            editor = <>
                <h1>{this.state.COURSE_NAME + " Syllabus"}</h1>
                <p>{this.state.COURSE_ID}</p>

                <TextField
                    id="outlined-multiline-static"
                    label={"Type in Syllabus Content for " + this.state.COURSE_NAME}
                    multiline
                    rows={10}
                    onChange={this.updateText}
                    defaultValue={this.state.REFERENCE}
                    variant="outlined"
                    style={{ width: '100%' }}
                />
                <br /><br />
                <Button onClick={this.submitSyllabus} variant="outlined" color="primary">Update Syllabus</Button>
                <h3>Below shows the preview as student for this syllabus.</h3>
                <MDReactComponent text={this.state.REFERENCE} />
            </>;
        }
        else {


            editor = <h1></h1>;
        }

        return (
            <div>
                <Paper style={{ padding: 20, paddingTop: 30 }}>
                    <Container >
                        <InputLabel id="demo-simple-select-label">Please select a course to edit the syllabus: </InputLabel>
                        <br />
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