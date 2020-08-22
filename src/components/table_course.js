import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {
    const { useState } = React;
    const get_api = "https://zmsedu.com/api/admin/course/get";
    const add_api = "https://zmsedu.com/api/admin/course/add";
    const edit_api = "https://zmsedu.com/api/admin/course/edit";
    const delete_api = "https://zmsedu.com/api/admin/course/delete";

    const [columns, setColumns] = useState([
        { title: 'ID', field: 'ID' },
        { title: 'Name', field: 'NAME' },
        { title: 'Subject', field: 'SUBJECT'},

    ]);


    const [data, setData] = useState(
        {
            courses: []
        }

    );

    
    );

    useEffect(() => {
        axios.post(get_api, {
            //ROLE: "Student"
        })
            .then(res => {
                const courses = res.data.COURSES;
                setData({ courses });
            }).catch(error => {
                alert(error);
            });
    }, []);

    return (
        <div>
            <MaterialTable
                columns={columns}
                data={data.courses}
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
};


export default Header;
