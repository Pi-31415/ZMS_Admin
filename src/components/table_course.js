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
        {
            title: 'Subject', field: 'SUBJECT',
            lookup: { 'STEM': 'STEM', 'Humanities / Social Sciences': 'Humanities / Social Sciences', 'Business / Finance': 'Business / Finance','Other Specialties': 'Other Specialties' }
        },
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
                                ID: newData.ID,
                                NAME: newData.NAME,
                                SUBJECT: newData.SUBJECT,
                                DESCRIPTION: newData.DESCRIPTION
                            })
                                .then(res => {
                                    const courses = res.data.COURSES;
                                    setData({ courses });
                                    //Refresh
                                    axios.post(get_api, {
                                        //ROLE: "Student"
                                    })
                                        .then(res => {
                                            const courses = res.data.COURSES;
                                            setData({ courses });
                                            resolve();
                                        }).catch(error => {
                                            alert(error);
                                        });
                                    //Refresh
                                }).catch(error => {
                                    alert(error);
                                });

                            //Add
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            //Update
                            axios.post(edit_api, {
                                ID: newData.ID,
                                NAME: newData.NAME,
                                SUBJECT: newData.SUBJECT,
                                DESCRIPTION: newData.DESCRIPTION
                            })
                                .then(res => {
                                    const courses = res.data.COURSES;
                                    setData({ courses });
                                    //Refresh
                                    axios.post(get_api, {
                                        //ROLE: "Student"
                                    })
                                        .then(res => {
                                            const courses = res.data.COURSES;
                                            setData({ courses });
                                            resolve();
                                        }).catch(error => {
                                            alert(error);
                                        });
                                    //Refresh
                                }).catch(error => {
                                    alert(error);
                                });
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
