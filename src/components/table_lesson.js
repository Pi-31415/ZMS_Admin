import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {
    const { useState } = React;
    const get_api = "https://zmsedu.com/api/admin/lesson/get";


    const [columns, setColumns] = useState([
        { title: 'COURSE_ID', field: 'COURSE_ID' },
        { title: 'TEACHER', field: 'TEACHER' },
        { title: 'STUDENT', field: 'STUDENT' },
        { title: 'LESSON_LINK', field: 'LESSON_LINK' },
        { title: 'TOPIC', field: 'TOPIC' },
        { title: 'START_DATETIME', field: 'START_DATETIME'},
        {
            title: 'STATUS',
            field: 'STATUS',
            lookup: { 'Scheduled': 'Scheduled', 'Completed': 'Completed', 'Cancelled': 'Cancelled'},
        },
    ]);


    const [data, setData] = useState(
        {
            lessons: []
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
        <MaterialTable
            columns={columns}
            data={data.lessons}
            title="Demo Title"
        />
    )
};


export default Header;
