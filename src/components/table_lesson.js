import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {

    const [columns, setColumns] = useState([
        //Add Columns
    ]);

    const [data, setData] = useState(
        {
            lessons: []
        }

    );

    const api_get = "https://zmsedu.com/api/admin/user/get";
    const api_update = "https://zmsedu.com/api/admin/user/edit";
    const api_delete = "https://zmsedu.com/api/admin/user/delete";
    const api_add = "https://zmsedu.com/api/admin/user/add";

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
        <h1>Hello</h1>
    )

}


export default Header;