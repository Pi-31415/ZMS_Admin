import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import axios from 'axios';
import Dateparser from './dateparser';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

function Header(props) {


    /*function formatdate(inputdate) {
        //format the time from server and return the Hong Kong Time zone
        var res = inputdate.toString().split(".");
        var moment = require('moment-timezone');
        var utcCutoff = moment.utc(res[0], '');
        var displayCutoff = utcCutoff.clone().tz('Asia/Hong_Kong');
        localStorage.setItem("tutordate", moment(displayCutoff).format('hh:mm a'));
        return displayCutoff;
      }
*/

    const [columns, setColumns] = useState([
        {
            title: 'Date/Time (' + Intl.DateTimeFormat().resolvedOptions().timeZone + ' Time)',
            field: 'START_DATETIME',
            defaultSort: 'desc',
            render: rowData => <Dateparser value={rowData.START_DATETIME}></Dateparser>
        },
        { title: 'Class Name', field: 'CLASS_ID' },
        {
            title: 'Description',
            field: 'TOPIC'
        },
        { title: 'Zoom ID', field: 'LESSON_LINK[ZOOM_LINK]' },
        { title: 'Zoom Passcode', field: 'LESSON_LINK[PASSCODE]' },
        {
            title: 'Uploaded Files',
            field: 'EXTRA_MATERIAL'
        },
        {
            title: 'Status',
            field: 'STATUS',
            lookup: { 'Complete': 'Complete', 'Scheduled': 'Scheduled', 'Cancelled': 'Cancelled' },
        },
        //Add Columns
    ]);

    const [data, setData] = useState(
        {
            lessons: []
        }

    );

    const [adding, setAdding] = useState(false);
    const [lessonid, setLessonid] = useState("aaaa");
    const [classid, setClassid] = useState("class");
    const [zoomlink, setZoomlink] = useState("");
    const [passcode, setPasscode] = useState("");
    const [month, setMonth] = useState(1);
    const [day, setDay] = useState(1);
    const [year, setYear] = useState(2020);
    const [hour, setHour] = useState(1);
    const [minute, setMinute] = useState(1);
    const [ampm, setAmpm] = useState("am");
    const [topic, setTopic] = useState("");
    const [material, setMaterial] = useState([]);
    const [selectedDate, setSelectedDate] = React.useState(new Date());

    const [allclasses, setAllclasses] = useState([]);

    const [query, setQuery] = useState();

    const api_get = "https://zmsedu.com/api/admin/lesson/get";
    const api_update = "https://zmsedu.com/api/admin/lesson/edit";
    const api_delete = "https://zmsedu.com/api/admin/lesson/delete";
    const api_add = "https://zmsedu.com/api/admin/lesson/add";

    const refresh = () => {
        axios.post(api_get, {
        })
            .then(res => {
                const lessons = res.data.LESSONS;
                setData({ lessons });
                console.log("Refreshed");
            }).catch(error => {
                alert(error);
            });
    }

    const apiaddlesson = () => {
        if (lessonid == "" || classid == "" || zoomlink == "" || passcode == "" || topic == "") {
            alert("Please fill in all information to add a new lesson.");
            setAdding(true);
        } else {
            var apiquery = {
                "LESSON_ID": lessonid,
                "CLASS_ID": classid,
                "LESSON_LINK": {
                    "ZOOM_LINK": zoomlink,
                    "PASSCODE": passcode
                },
                "STATUS": "Scheduled",
                "START_DATETIME": selectedDate,
                "TOPIC": topic,
                "EXTRA_MATERIAL": material
            };
            console.log(apiquery);
            axios.post(api_add, apiquery)
                .then(res => {
                    refresh();
                    console.log("Refreshed");
                }).catch(error => {
                    alert(error);
                });

        }

    }

    useEffect(() => {
        refresh();
        //Then get classes
        axios.post("https://zmsedu.com/api/admin/class/get", {
        })
            .then(res => {
                const classes = res.data.CLASS;
                var allclasses = [];
                for (var i = 0; i < classes.length; i++) {
                    //console.log(classes[i].CLASS_ID);
                    allclasses.push(classes[i].CLASS_ID)
                }
                setAllclasses(allclasses);
            }).catch(error => {
                alert(error);
            });

    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    let adder = <></>;
    if (adding === true) {
        adder = <>
            <Paper style={{ padding: 20 }}>
                <h3>Add New Class</h3>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <br />
                        <InputLabel id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            style={{ width: '100%', marginBottom: 0, paddingBottom: 0 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={classid}
                            onChange={e => setClassid(e.target.value)}
                        >
                            <MenuItem value="class" disabled>
                                Choose Class
                            </MenuItem>
                            {
                                allclasses.map((reptile) => <MenuItem value={reptile}>{reptile}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Choose Date"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                    <Grid item xs={4}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Choose Time"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>

                </Grid>

                <br />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <TextField id="outlined-basic" style={{ width: '100%' }} label="Description" variant="outlined"
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" style={{ width: '100%' }} label="ZOOM ID" variant="outlined"
                            value={zoomlink}
                            onChange={e => setZoomlink(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField id="outlined-basic" style={{ width: '100%' }} label="ZOOM Passcode" variant="outlined"
                            value={passcode}
                            onChange={e => setPasscode(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <br />
                <Button
                    variant="contained"
                    color="primary"
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => { setAdding(false); apiaddlesson(); }}
                >
                    Add
                </Button>
            </Paper>
            <br />
        </>;
    }


    return (
        <div style={{ maxWidth: '100%' }}>
            {adder}
            <MaterialTable
                components={{
                    Toolbar: props => (
                        <div style={{ padding: 20 }}>
                            <MTableToolbar {...props} />
                            <p>{"You are in " + Intl.DateTimeFormat().resolvedOptions().timeZone + ". All time here is adjusted to display your local time."}</p>
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => { setAdding(true) }}
                            >
                                Add Lesson
                            </Button>


                        </div>
                    ),
                }}

                columns={columns}
                data={data.lessons}
                title="Lessons"
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} of {count}'
                    },
                    toolbar: {
                        nRowsSelected: '{0} row(s) selected'
                    },
                    header: {
                        actions: 'Actions'
                    },
                    body: {
                        emptyDataSourceMessage: 'No records to display',
                        filterRow: {
                            filterTooltip: 'Type in something to filter results.'
                        }
                    }
                }}
                options={{
                    sorting: true,
                    filtering: true,
                    pageSize: 20,
                    actionsColumnIndex: -1
                }}
            />
        </div>
    )


}


export default Header;