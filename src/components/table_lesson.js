import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Dateparser from './dateparser';

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
            title: 'Topic',
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
                    pageSize: 20,
                    actionsColumnIndex: -1
                }}

            />
        </div>
    )


}


export default Header;