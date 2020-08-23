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
        { title: 'Name', field: 'NAME' },
        { title: 'DESCRIPTION', field: 'DESCRIPTION' },
    ]);


    const [data, setData] = useState(
        {
            courses: []
        }

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
                title="Courses"

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

                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            //Add

                            axios.post(add_api, {
                                NAME: newData.NAME,
                                SUBJECT: newData.NAME,
                                DESCRIPTION: newData.DESCRIPTION
                            })
                                .then(res => {
                                    const courses = res.data.COURSES;
                                    setData({ courses });
                                    axios.post(get_api, {
                                        //ROLE: "Student"
                                    })
                                        .then(res => {
                                            const courses = res.data.COURSES;
                                            setData({ courses });
                                        }).catch(error => {
                                            alert(error);
                                        });
                                }).catch(error => {
                                    alert(error);
                                });

                            //Add
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            //Update
                            //Update
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            //Delete
                            //Delete
                        }),
                }}

            />
        </div>
    )
};


export default Header;
