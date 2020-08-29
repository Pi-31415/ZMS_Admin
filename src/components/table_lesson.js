import React, { useState, useEffect } from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import axios from 'axios';
import Dateparser from './dateparser';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
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

    const [query, setQuery] = useState(
        {
            "LESSON_ID": "aaaaa",
            "CLASS_ID": "",
            "LESSON_LINK": {
                "ZOOM_LINK": "zoom link",
                "PASSCODE": "password"
            },
            "STATUS": "Scheduled",
            "START_DATETIME": "8-29-2020 12:50",
            "TOPIC": "Description",
            "EXTRA_MATERIAL": []
        }
    );

    const api_get = "https://zmsedu.com/api/admin/lesson/get";
    const api_update = "https://zmsedu.com/api/admin/lesson/edit";
    const api_delete = "https://zmsedu.com/api/admin/lesson/delete";
    const api_add = "https://zmsedu.com/api/admin/lesson/add";

    useEffect(() => {
        axios.post(api_get, {
            //ROLE: "Student"
        })
            .then(res => {
                const lessons = res.data.LESSONS;
                setData({ lessons });

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