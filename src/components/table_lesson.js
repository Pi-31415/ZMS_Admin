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
            title: 'Date Time (HKT)',
            field: 'START_DATETIME',
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
    const [classid, setClassid] = useState("");
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

    const [allclasses, setAllclasses] = useState([]);

    const api_get = "https://zmsedu.com/api/admin/lesson/get";
    const api_update = "https://zmsedu.com/api/admin/lesson/edit";
    const api_delete = "https://zmsedu.com/api/admin/lesson/delete";
    const api_add = "https://zmsedu.com/api/admin/lesson/add";

    useEffect(() => {
        axios.post(api_get, {
        })
            .then(res => {
                const lessons = res.data.LESSONS;
                setData({ lessons });

            }).catch(error => {
                alert(error);
            });

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


    let adder = <></>;
    if (adding === true) {
        adder = <>
            <Paper style={{ padding: 20 }}>
                <h3>Add New Class</h3>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <InputLabel id="demo-simple-select-label">Choose Class:</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            onChange={e => setClassid(e.target.value)}
                        >
                            {
                                allclasses.map((reptile) => <MenuItem value={reptile}>{reptile}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    
                </Grid>
                <br/>
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
                            <Button
                                variant="contained"
                                color="primary"
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => { setAdding(true) }}
                            >
                                Add Lesson
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                variant="outlined"
                                startIcon={<Add />}
                                onClick={() => {
                                    console.log(
                                        {
                                            "LESSON_ID": lessonid,
                                            "CLASS_ID": classid,
                                            "LESSON_LINK": {
                                                "ZOOM_LINK": zoomlink,
                                                "PASSCODE": passcode
                                            },
                                            "STATUS": "Scheduled",
                                            "START_DATETIME": month+"-"+day+"-"+year+" "+hour+":"+minute+" "+ampm,
                                            "TOPIC": topic,
                                            "EXTRA_MATERIAL": material
                                        }
                                    );
                                }}
                            >
                                Check
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
                    filtering: true,
                    pageSize: 20,
                    actionsColumnIndex: -1
                }}
            />
        </div>
    )


}


export default Header;