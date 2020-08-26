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
var courselookup_main = {};
var teacherlookup_main = {};

class Syllabus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            COURSE_ARRAY: [],
            CLASS_ARRAY: [],
            COLUMNS: [],
            ADD: false,
            EDIT: false
        };
    }

    getteacherdata = () => {
        axios.post("https://zmsedu.com/api/admin/user/get", {
            ROLE: "Teacher"
        })
            .then(res => {
                const users = res.data.USERS;
                console.log(users);
                var i;
                for (i = 0; i < users.length; i++) {
                    teacherlookup_main[users[i].ID] = users[i].FIRST_NAME;
                }
                console.log(teacherlookup_main);
            }).catch(error => {
                alert(error);
            });
    }

    getinitAPIdata = () => {
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
                        //console.log(this.state);
                        //then generate the lookup values for material-table
                        var i;
                        for (i = 0; i < this.state.COURSE_ARRAY.length; i++) {
                            coursename_lookup.push(this.state.COURSE_ARRAY[i].NAME);
                            courseid_lookup.push(this.state.COURSE_ARRAY[i].ID);
                            //courselookup_main[i] = [{ '1': 'İstanbul', '2': 'Şanlıurfa' }];
                            courselookup_main[this.state.COURSE_ARRAY[i].ID.toString()] = this.state.COURSE_ARRAY[i].NAME;
                        }
                        this.getteacherdata();
                        this.setState({
                            CLASS_ARRAY: class_apicall, COURSE_ARRAY: course_apicall, COLUMNS: [
                                { title: 'Class Name', field: 'CLASS_ID' },
                                {
                                    title: 'Course',
                                    field: 'COURSE_ID',
                                    lookup: courselookup_main
                                },
                                {
                                    title: 'Students',
                                    field: 'STUDENTS',
                                    render: rowData => rowData.STUDENTS.length
                                },
                                { title: 'Teacher', field: 'TEACHER' },
                                { title: "Schedule", field: "NEXT_DATETIME" },
                            ]
                        });

                    }).catch(error => {
                        alert(error);
                    });
            }).catch(error => {
                alert(error);
            });
    }

    componentDidMount() {
        this.getinitAPIdata();

    }



    render() {
        let editor;
        editor = <>
            <Paper style={{ padding: 20, paddingTop: 30 }}>
                <p>Use the dropdown bar on the left to edit/view the class details.</p>
            </Paper>
            <br></br>
        </>

        return (
            <div>
                {editor}
                <div style={{ maxWidth: '100%' }}>
                    <MaterialTable
                        columns={this.state.COLUMNS}
                        data={this.state.CLASS_ARRAY}
                        title="Classes"

                        localization={{
                            pagination: {
                                labelDisplayedRows: '{from}-{to} of {count}'
                            },
                            toolbar: {
                                nRowsSelected: '{0} row(s) selected'
                            },
                            header: {
                                actions: ''
                            },
                            body: {
                                emptyDataSourceMessage: 'No records to display',
                                filterRow: {
                                    filterTooltip: 'Type in something to filter results.'
                                }
                            }
                        }}

                        options={{
                            filtering: true,
                            pageSize: 20,
                            actionsColumnIndex: -1
                        }}

                        detailPanel={rowData => {
                            return (
                                rowData.STUDENTS.length
                            )
                        }}

                        actions={[
                            {
                                icon: 'edit',
                                tooltip: 'Edit This Class',
                                onClick: (event, rowData) => {
                                    // Do save operation
                                    console.log(this.state);
                                }
                            }
                        ]}

                    />
                </div>

            </div>
        );
    }
}

export default Syllabus;