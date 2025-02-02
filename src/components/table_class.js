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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import MaterialTable from 'material-table'
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

function makeid(length) {
    var result = '';
    var characters = 'x0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function find_duplicate_in_array(arra1) {
    var object = {};
    var result = [];

    arra1.forEach(function (item) {
        if (!object[item])
            object[item] = 0;
        object[item] += 1;
    })

    for (var prop in object) {
        if (object[prop] >= 2) {
            result.push(prop);
        }
    }

    return result;

}




var course_apicall = [];
var class_apicall = [];
var coursename_lookup = [];
var courseid_lookup = [];
var current_course = "";
var courselookup_main = {};
var teacherlookup_main = {};
var studentlookup_main = {};

var teacher_ids = [];
var student_ids = [];

var student_to_add = "";
var class_to_add = "";
var course_name_to_add = "";
var course_to_add = "";
var teacher_to_add = "";

var class_to_delete = "";

class Syllabus extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            COURSE_ARRAY: [],
            CLASS_ARRAY: [],
            COLUMNS: [],
            ADD: false,
            EDIT: false,
            DELETESTUDENTS: [],
            classcodetoadd: ""
        };
    }



    getteacherdata = () => {
        teacher_ids = [];
        axios.post("https://zmsedu.com/api/admin/user/get", {
            ROLE: "Teacher"
        })
            .then(res => {
                const users = res.data.USERS;
                //console.log(users);
                var i;
                for (i = 0; i < users.length; i++) {
                    teacherlookup_main[users[i].ID] = users[i].FIRST_NAME + " " + users[i].LAST_NAME;
                    teacher_ids.push(users[i].ID);
                }
            }).catch(error => {
                alert(error);
            });
    }

    getstudentdata = () => {
        student_ids = [];
        axios.post("https://zmsedu.com/api/admin/user/get", {
            ROLE: "Student"
        })
            .then(res => {
                const users = res.data.USERS;
                //console.log(users);
                var i;
                for (i = 0; i < users.length; i++) {
                    studentlookup_main[users[i].ID] = users[i].FIRST_NAME + " " + users[i].LAST_NAME;
                    student_ids.push(users[i].ID);
                }
                //console.log(studentlookup_main);
            }).catch(error => {
                alert(error);
            });
    }

    getinitAPIdata = () => {

        this.getteacherdata();
        this.getstudentdata();
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
                        //alert("Refreshed");
                        this.setState({
                            CLASS_ARRAY: class_apicall, COURSE_ARRAY: course_apicall, COLUMNS: [
                                { title: 'Class Name (not editable)', field: 'CLASS_ID' },
                                {
                                    title: 'Course',
                                    field: 'COURSE_ID',
                                    lookup: courselookup_main
                                },
                                {
                                    title: '# of Students',
                                    field: 'STUDENTS',
                                    type: 'numeric',
                                    render: rowData => rowData.STUDENTS.length
                                },
                                {
                                    title: 'Teacher',
                                    field: 'TEACHER',
                                    lookup: teacherlookup_main
                                },
                                {
                                    title: 'Schedule',
                                    field: 'NEXT_DATETIME'
                                }
                            ]
                        });

                    }).catch(error => {
                        alert(error);
                    });
            }).catch(error => {
                alert(error);
            });
    }

    deletestudent = (event) => {
        console.log(class_to_delete + " " + studentlookup_main[event.target.value] + " " + event.target.value);
        var class_manipulating_data = this.state.DELETESTUDENTS;
        this.setState({ DELETESTUDENTS: [] });
        console.log(class_manipulating_data);
        var set = new Set(class_manipulating_data);
        set.delete(event.target.value);
        console.log(set);
        const queryarray = [...set];
        console.log(queryarray);
        const query = {
            CLASS_ID: class_to_delete,
            STUDENTS: queryarray
        };
        console.log(query);
        axios.post('https://zmsedu.com/api/admin/class/edit', query)
            .then(response => {
                alert("User Deleted");
                this.getinitAPIdata();
            })
            .catch(error => {
                alert(error);
            });

    }

    addstudent = (event) => {
        if (student_to_add == "" || class_to_add == "") {
            alert("Please choose the required fields.");
        } else {
            var oldstudarray = [];
            const query = {
            };
            console.log(query);
            axios.post('https://zmsedu.com/api/admin/class/get', query)
                .then(response => {

                    for (var i = 0; i < response.data.CLASS.length; i++) {
                        if (response.data.CLASS[i].CLASS_ID == class_to_add) {
                            oldstudarray = response.data.CLASS[i].STUDENTS;
                            oldstudarray.push(student_to_add);
                            var detection = find_duplicate_in_array(oldstudarray);
                            if (detection[0] == undefined) {

                                axios.post('https://zmsedu.com/api/admin/class/edit', {
                                    CLASS_ID: class_to_add,
                                    STUDENTS: oldstudarray
                                })
                                    .then(response => {
                                        alert("Student Added");
                                        this.getinitAPIdata();
                                    })
                                    .catch(error => {
                                        alert(error);
                                    });

                            } else {
                                alert(studentlookup_main[student_to_add] + " is already registered in class " + class_to_add);
                            }
                        }
                    }
                    //alert("Yes");
                })
                .catch(error => {
                    alert(error);
                });
        }


        /*
        if (student_to_add == "" || class_to_add == "") {
            alert("Please choose the required fields.");
        } else {

            axios.post('https://zmsedu.com/api/admin/class/get', {
            })
                .then(function (response) {
                    //console.log(response.data.CLASS);
                    for (var i = 0; i < response.data.CLASS.length; i++) {
                        if (response.data.CLASS[i].CLASS_ID == class_to_add) {
                            //adding student code
                            oldstudarray = response.data.CLASS[i].STUDENTS;
                            //console.log(oldstudarray);
                            oldstudarray.push(student_to_add);
                            //console.log(oldstudarray);
                            var detection = find_duplicate_in_array(oldstudarray);
                            //console.log();
                            if (detection[0] == undefined) {
                                //alert("Good to go");
                                console.log(oldstudarray);

                                axios.post('https://zmsedu.com/api/admin/class/edit', {
                                    CLASS_ID: class_to_add,
                                    STUDENTS: oldstudarray
                                })
                                    .then(response => {
                                        alert("Success");
                                        //RELOADDDDDDD
                                        //useHistory().push("/admin/dashboard/home");
                                        //RELOADDDDEND
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

                            } else {
                                alert(studentlookup_main[student_to_add] + " already exists in class " + class_to_add);
                            }

                        }
                    }
                    //End
                })
                .catch(function (error) {
                    console.log(error);
                });
        }*/
    }

    componentDidMount() {
        this.getinitAPIdata();

    }

    updatestudent = (event) => {
        student_to_add = event.target.value;
        //alert(student_to_add);
    }

    updateclass = (event) => {
        class_to_add = event.target.value;
        //alert(class_to_add);
    }

    updatedeleteclass = (event) => {
        class_to_delete = event.target.value;
        if (class_to_delete == "") {
            alert("Please choose required fields");
        } else {
            //alert(class_to_delete);
            axios.post('https://zmsedu.com/api/admin/class/get', {})
                .then(response => {
                    for (var i = 0; i < response.data.CLASS.length; i++) {
                        if (response.data.CLASS[i].CLASS_ID == class_to_delete) {
                            //alert(this.state.DELETESTUDENTS[0]);
                            this.setState({ DELETESTUDENTS: response.data.CLASS[i].STUDENTS });
                            //alert(this.state.DELETESTUDENTS[0]);
                        }
                    }
                })
                .catch(error => {
                    alert(error);
                });
        }
    }


    newcourse = (event) => {
        //alert(event.target.value);

        var str = courselookup_main[event.target.value];
        var res = str.split(" ");
        var final = res[0];
        var final2 = "";
        if (res[1] != null) {
            final2 = res[1];
        } else {
            final2 = "X";
        }
        var classcode = final[0] + final2[0] + "-" + makeid(5);
        
        this.setState({ classcodetoadd: classcode });

        console.log(classcode);
        course_to_add = event.target.value;
        course_name_to_add = classcode;
    }

    newteacher = (event) => {
        //console.log(event.target.value);
        console.log();
        teacher_to_add = event.target.value;
    }

    updateclassname = (event) => {
        this.setState({ classcodetoadd: event.target.value });
        course_name_to_add = this.state.classcodetoadd;
        console.log(course_name_to_add);
    }

    addcourse = (event) => {
        course_name_to_add = this.state.classcodetoadd;
        console.log(teacher_to_add + " " + course_to_add + " " + course_name_to_add);

        if (course_name_to_add == "" || course_to_add == "" || teacher_to_add == "") {
            alert("Please choose the required fields.");
        } else {
            const query = {
                "STUDENTS": [],
                "CLASS_ID": course_name_to_add,
                "COURSE_ID": course_to_add,
                "TEACHER": teacher_to_add,
                "NEXT_DATETIME": ""
            };
            console.log(query);
            axios.post('https://zmsedu.com/api/admin/class/add', query)
                .then(response => {
                    course_name_to_add = "";
                    teacher_to_add = "";
                    course_to_add = "";
                    this.getinitAPIdata();
                    alert("Course Added");
                })
                .catch(error => {
                    alert(error);
                });
        }

    }

    render() {

        let studentaddbutton;
        studentaddbutton =
            <Button variant="contained" color="primary" onClick={this.addstudent} variant="outlined" style={{width:'100%'}}>
                Add Student
            </Button>;

        let classaddbutton;
        classaddbutton =
            <Button variant="contained" color="primary" onClick={this.addcourse} variant="outlined">
                Add Class
            </Button>;


        let editor;
        editor = <>
            <Paper style={{ padding: 20 }}>
                <h3>Add Student to Classes</h3>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">Add the student</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.updatestudent}
                            style={{width:'100%'}}
                        >
                            {
                                student_ids.map((shogun) => <MenuItem value={shogun}>{studentlookup_main[shogun]}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">to class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.updateclass}
                            style={{width:'100%'}}
                        >
                            {
                                this.state.CLASS_ARRAY.map((reptile) => <MenuItem value={reptile.CLASS_ID}>{reptile.CLASS_ID}</MenuItem>)
                            }

                        </Select>
                    </Grid>
                </Grid>
                <p style={{color:'#fff',padding:7}}>.</p>
                <Grid container spacing={3}>
                    <Grid item xs={6}></Grid>
                    <Grid item xs={6}>
                        {studentaddbutton}
                    </Grid>
                </Grid>
            </Paper>
            <br />
        </>


        let deletestudentchips;
        if (this.state.DELETESTUDENTS[0] == undefined) {
            deletestudentchips =
                <>
                </>;
        } else {
            deletestudentchips =
                <>
                    {/*DELETESTUDENTS*/}
                    <Grid item xs={4}>
                        {this.state.DELETESTUDENTS.map((studentid) => (
                            <Chip
                                style={{ margin: 5 }}
                                color="primary"
                                key={studentid}
                                value={studentid}
                                icon={<FaceIcon />}
                                label={studentlookup_main[studentid]}
                                variant="outlined"
                            />
                        ))}
                    </Grid>
                    <Grid item xs={4}>
                        <InputLabel id="demo-simple-select-label">Choose student to delete. (Will delete automatically after you select)</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.deletestudent}
                        >
                            {
                                this.state.DELETESTUDENTS.map((ninja) => <MenuItem value={ninja}>{studentlookup_main[ninja]}</MenuItem>)
                            }

                        </Select>
                    </Grid>
                </>;
        }


        let deleter;
        deleter = <>

            <Paper style={{ padding: 20 }}>
                <h3>Remove Students</h3>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputLabel id="demo-simple-select-label">Choose Class:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.updatedeleteclass}
                        >
                            {
                                this.state.CLASS_ARRAY.map((reptile) => <MenuItem value={reptile.CLASS_ID}>{courselookup_main[reptile.COURSE_ID]} {reptile.CLASS_ID}</MenuItem>)
                            }

                        </Select>
                    </Grid>

                    {deletestudentchips}

                </Grid>
            </Paper>
            <br />
        </>;

        let adder;
        adder = <>
            <Paper style={{ padding: 20 }}>
                <h3>Add New Class</h3>
                <p>Note: Class Code must be unique, if manually typed.</p>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label">Choose Course:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={this.newcourse}
                            style ={{width:'100%'}}
                        >
                            {
                                this.state.COURSE_ARRAY.map((reptile) => <MenuItem key={reptile.ID} value={reptile.ID}>{reptile.NAME}</MenuItem>)
                            }

                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField id="outlined-basic" label="Class Code" 
                        value = {this.state.classcodetoadd}
                        onChange = {this.updateclassname}
                        variant="outlined" />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <InputLabel id="demo-simple-select-label2">Choose Teacher:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label2"
                            id="demo-simple-select"
                            onChange={this.newteacher}
                        >
                            {
                                teacher_ids.map((reptile) => <MenuItem key={reptile} value={reptile}>{teacherlookup_main[reptile]}</MenuItem>)
                            }

                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        {classaddbutton}
                    </Grid>
                </Grid>
            </Paper>
            <br />
        </>

        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        {editor}
                    </Grid>
                    <Grid item xs={6}>
                        {adder}
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {deleter}
                    </Grid>
                </Grid>
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
                            //this.setState({OLD_STUDENT_DATA:rowData.STUDENTS});
                            return (
                                <>
                                    <div style={{ margin: 30 }}>
                                        <h3>Current students enrolled in {courselookup_main[rowData.COURSE_ID]} : {rowData.CLASS_ID}</h3>
                                        <div>

                                            {rowData.STUDENTS.map((studentid) => (
                                                <Chip
                                                    style={{ margin: 5 }}
                                                    color="primary"
                                                    key={studentid}
                                                    value={studentid}
                                                    icon={<FaceIcon />}
                                                    label={studentlookup_main[studentid]}
                                                    variant="outlined"
                                                />
                                            ))}
                                        </div>
                                        <br />
                                    </div>
                                </>
                            )
                        }}


                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    if (oldData.CLASS_ID != newData.CLASS_ID) {
                                        alert("Sorry, the Class Name is fixed as it is a unique identifier. Please delete this class and create a new one instead.");
                                        resolve();
                                    }
                                    const query = {
                                        "STUDENTS": newData.STUDENTS,
                                        "CLASS_ID": oldData.CLASS_ID,
                                        "COURSE_ID": newData.COURSE_ID,
                                        "TEACHER": newData.TEACHER,
                                        "NEXT_DATETIME": newData.NEXT_DATETIME
                                    };
                                    console.log(query);
                                    axios.post('https://zmsedu.com/api/admin/class/edit', query)
                                        .then(response => {
                                            this.getinitAPIdata();
                                            resolve();
                                        })
                                        .catch(error => {
                                            alert(error);
                                        });

                                }),
                            onRowDelete: oldData =>
                                new Promise((resolve, reject) => {

                                    const query = {
                                        "CLASS_ID": oldData.CLASS_ID
                                    };
                                    console.log(query);
                                    axios.post('https://zmsedu.com/api/admin/class/delete', query)
                                        .then(response => {
                                            this.getinitAPIdata();
                                            resolve();
                                        })
                                        .catch(error => {
                                            alert(error);
                                        });

                                }),
                        }}

                    />
                </div>

            </div>
        );
    }
}

export default Syllabus;