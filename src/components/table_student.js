import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {

    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Username', field: 'USERNAME' },
        { title: 'First Name', field: 'FIRST_NAME' },
        { title: 'Last Name', field: 'LAST_NAME' },
        { title: 'Phone', field: 'PHONE', type: 'numeric' },
        { title: 'Email', field: 'EMAIL' },
        { title: 'Role', field: 'ROLE' },
    ]);

    const [data, setData] = useState(
        {
            users: []
        }

    );


    useEffect(() => {
        axios.post(`https://zmsedu.com/api/admin/user/get`, {
            ROLE: "Student"
        })
            .then(res => {
                const users = res.data.USERS;
                setData({ users });
                console.log(data);
            }).catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <MaterialTable
            title="Students"
            columns={columns}
            data={data.users}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        


                        console.log("Old Data", data);
                        axios.post(`https://zmsedu.com/api/admin/user/add`, {
                            ID: newData.ID,
                            USERNAME: newData.USERNAME,
                            FIRST_NAME: newData.FIRST_NAME,
                            LAST_NAME: newData.LAST_NAME,
                            PHONE: newData.PHONE,
                            EMAIL: newData.EMAIL,
                            ROLE: newData.ROLE,
                        })
                            .then(res => {
                                const users = res.data.USERS;
                                setData({ users });
                                console.log("New Data", data);
                                axios.post(`https://zmsedu.com/api/admin/user/get`, {
                                    ROLE: "Student"
                                })
                                    .then(res => {
                                        const users = res.data.USERS;
                                        setData({ users });
                                        console.log(data);
                                        resolve();
                                    }).catch(error => {
                                        console.log(error);
                                    });
                            }).catch(error => {
                                console.log(error);
                            });


                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        console.log(newData.USERNAME)

                        console.log("Old Data", data);
                        axios.post(`https://zmsedu.com/api/admin/user/edit`, {
                            ID: newData.ID,
                            USERNAME: newData.USERNAME,
                            FIRST_NAME: newData.FIRST_NAME,
                            LAST_NAME: newData.LAST_NAME,
                            PHONE: newData.PHONE,
                            EMAIL: newData.EMAIL,
                            ROLE: newData.ROLE,
                        })
                            .then(res => {
                                const users = res.data.USERS;
                                setData({ users });
                                console.log("New Data", data);
                                axios.post(`https://zmsedu.com/api/admin/user/get`, {
                                    ROLE: "Student"
                                })
                                    .then(res => {
                                        const users = res.data.USERS;
                                        setData({ users });
                                        console.log(data);
                                        resolve();
                                    }).catch(error => {
                                        console.log(error);
                                    });
                            }).catch(error => {
                                console.log(error);
                            });



                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {

                        console.log("Old Data", data);
                        axios.post(`https://zmsedu.com/api/admin/user/delete`, {
                            ID: oldData.ID
                        })
                            .then(res => {
                                const users = res.data.USERS;
                                setData({ users });
                                console.log("New Data", data);
                                axios.post(`https://zmsedu.com/api/admin/user/get`, {
                                    ROLE: "Student"
                                })
                                    .then(res => {
                                        const users = res.data.USERS;
                                        setData({ users });
                                        console.log(data);
                                        resolve();
                                    }).catch(error => {
                                        console.log(error);
                                    });
                            }).catch(error => {
                                console.log(error);
                            });

                    }),
            }}
        />
    )
}


export default Header;
