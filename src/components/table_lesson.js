import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {
    const { useState } = React;
    const get_api = "https://zmsedu.com/api/admin/lesson/get";
    const add_api = "https://zmsedu.com/api/admin/lesson/add";
    const edit_api = "https://zmsedu.com/api/admin/lesson/edit";

    const [columns, setColumns] = useState([

        {
            title: 'Teacher',
            field: 'TEACHER'
        },
        { title: 'Students', field: 'STUDENT' },
        { title: 'Zoom Link and Password', field: 'LESSON_LINK' },
        { title: 'Topic', field: 'TOPIC' },
        { title: 'Date Time', field: 'START_DATETIME' },
        {
            title: 'STATUS',
            field: 'STATUS',
            lookup: { 'Scheduled': 'Scheduled', 'Completed': 'Completed', 'Cancelled': 'Cancelled' },
        },
    ]);


    const [data, setData] = useState(
        {
            lessons: []
        }

    );

    const [teacher, setTeacher] = useState(
        {
            teachers: []
        }

    );

    useEffect(() => {
        axios.post(get_api, {
            //ROLE: "Student"
        })
            .then(res => {
                const lessons = res.data.LESSONS;
                setData({ lessons });
            }).catch(error => {
                alert(error);
            });
    }, []);

    return (
        <div>
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

                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {

                            axios.post(add_api, {
                                "TEACHER": newData.TEACHER,
                                "STUDENT": newData.STUDENT,
                                "START_DATETIME": newData.START_DATETIME,
                                "STATUS": newData.STATUS,
                                "TOPIC": newData.TOPIC,
                                "LESSON_LINK": newData.LESSON_LINK,
                                "HOMEWORK": newData.HOMEWORK,
                            })
                                .then(res => {
                                    const lessons = res.data.LESSONS;
                                    setData({ lessons });

                                    //Refresh
                                    axios.post(get_api, {
                                        //ROLE: "Student"
                                    })
                                        .then(res => {
                                            const lessons = res.data.LESSONS;
                                            setData({ lessons });
                                            resolve();
                                        }).catch(error => {
                                            alert(error);
                                        });
                                    //Refresh

                                }).catch(error => {
                                    alert(error);
                                });

                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            axios.post(edit_api, {
                                "TEACHER": newData.TEACHER,
                                "STUDENT": newData.STUDENT,
                                "START_DATETIME": newData.START_DATETIME,
                                "STATUS": newData.STATUS,
                                "TOPIC": newData.TOPIC,
                                "LESSON_LINK": newData.LESSON_LINK,
                                "HOMEWORK": newData.HOMEWORK,
                            })
                                .then(res => {
                                    const lessons = res.data.LESSONS;
                                    setData({ lessons });

                                    //Refresh
                                    axios.post(get_api, {
                                        //ROLE: "Student"
                                    })
                                        .then(res => {
                                            const lessons = res.data.LESSONS;
                                            setData({ lessons });
                                            resolve();
                                        }).catch(error => {
                                            alert(error);
                                        });
                                    //Refresh

                                }).catch(error => {
                                    alert(error);
                                });
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setData([...dataDelete]);

                                resolve()
                            }, 1000)
                        }),
                }}

            />
        </div>
    )
};


export default Header;
