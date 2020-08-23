
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


var course_names = [];
var course_ids = [];

class Syllabus extends React.Component {

        
    constructor(props) {
        super(props);
        this.state = {
            COURSE_ID: 0,
            REFERENCE: "Mustang",
        };
    }

    componentDidMount() {
        course_names[0]="Ayas";
        console.log(course_names);
    }

    changeColor = () => {
        this.setState({ color: "blue" });
    }
    render() {
        return (
            <div>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={10}
                    onChange={this.handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                </Select>
            </div>
        );
    }
}

export default Syllabus;