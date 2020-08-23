import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Moment from 'react-moment';

function Header(props) {

    const [columns, setColumns] = useState([

        { title: 'LESSON_ID', field: 'LESSON_ID' },
        { title: 'COURSE_ID', field: 'COURSE_ID' },
        { title: 'TEACHER', field: 'TEACHER' },
        { title: 'STUDENT', field: 'STUDENT' },
        {
            title: 'START_DATETIME',
            field: 'START_DATETIME',
            render: rowData => <h1>{rowData.START_DATETIME}</h1>
        },
        {
            title: 'STATUS',
            field: 'STATUS',
            lookup: { 'Complete': 'Complete', 'Incomplete': 'Incomplete', 'Cancelled': 'Cancelled' },
        },
        //Add Columns
    ]);

    function formatdate(inputdate) {
        //format the time from server and return the Hong Kong Time zone
        var res = inputdate.split(".");
        var moment = require('moment-timezone');
        var utcCutoff = moment.utc(res[0], '');
        var displayCutoff = utcCutoff.clone().tz('Asia/Hong_Kong');
        localStorage.setItem("tutordate", moment(displayCutoff).format('hh:mm a'));
        return displayCutoff;
      }

    const [data, setData] = useState(
        {
            lessons: []
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
                console.log("Adding", data);
            }).catch(error => {
                alert(error);
            });
    }, []);


    return (
        <div style={{ maxWidth: '100%' }}>
            <MaterialTable
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
                    pageSize: 5,
                    actionsColumnIndex: -1
                }}

            />
        </div>
    )


}


export default Header;