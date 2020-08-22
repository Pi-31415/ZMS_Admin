import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {
    const { useState } = React;
    const get_api = "https://zmsedu.com/api/admin/lesson/get";
    const add_api = "https://zmsedu.com/api/admin/lesson/add";


    const [columns, setColumns] = useState([
        { title: 'Course', field: 'COURSE_ID' },
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
        //API for teachers
        axios.post('https://zmsedu.com/api/admin/user/get', {
            ROLE: "Teacher"
        })
            .then(res => {
                const teachers = res.data.USERS;
                setTeacher({ teachers });
                console.log(teachers);
            }).catch(error => {
                alert(error);
            });


    }, []);

    return (
        <div>
            <ul>
                {teacher.teachers.map(u => <li key={u.ID}>{u.USERNAME}</li>)} 
            </ul>
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



                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setData([...dataUpdate]);

                                resolve();
                            }, 1000)
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
