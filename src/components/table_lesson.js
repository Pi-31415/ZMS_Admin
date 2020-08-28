import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Dateparser from './dateparser';

function Header(props) {


    /*
*/

    const [columns, setColumns] = useState([
        { title: 'CLASS Name', field: 'CLASS_ID' },
        { title: 'Zoom ID', field: 'LESSON_LINK[ZOOM_LINK]' },
        { title: 'Zoom Passcode', field: 'LESSON_LINK[PASSCODE]' },
        {
            title: 'Date Time',
            field: 'START_DATETIME',
            render: rowData => <Dateparser value={rowData.START_DATETIME}></Dateparser>
        },
        {
            title: 'Topic',
            field: 'TOPIC'
        },
        {
            title: 'Uploaded Files',
            field: 'EXTRA_MATERIAL'
        },
        {
            title: 'Status',
            field: 'STATUS',
            lookup: { 'Complete': 'Complete', 'Incomplete': 'Incomplete', 'Cancelled': 'Cancelled' },
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
                    pageSize: 5,
                    actionsColumnIndex: -1
                }}

            />
        </div>
    )


}


export default Header;