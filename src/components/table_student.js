import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

function Header(props) {

    const { useState } = React;

    const [columns, setColumns] = useState([
        { title: 'Username', field: 'USERNAME' },
        { title: 'First Name', field: 'FIRST_NAME' },
        { title: 'Last Name', field: 'LAST_NAME' },
        { title: 'Phone', field: 'PHONE' },
        { title: 'Email', field: 'EMAIL' },
        {
            title: 'Role',
            field: 'ROLE',
            lookup: { 'Teacher': 'Teacher', 'Student': 'Student', 'Admin': 'Admin', },
        },
    ]);

    const [data, setData] = useState(
        {
            users: []
        }

    );


    useEffect(() => {
        axios.post(`https://zmsedu.com/api/admin/user/get`, {
            //ROLE: "Student"
        })
            .then(res => {
                const users = res.data.USERS;
                setData({ users });
                console.log("Adding",data);
            }).catch(error => {
                alert(error);
            });
    }, []);



    return (
        <MaterialTable
            title="Users"
            columns={columns}
            data={data.users}

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

            editable={{
                
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
                                    
                                })
                                    .then(res => {
                                        const users = res.data.USERS;
                                        setData({ users });
                                        console.log(data);
                                        resolve();
                                    }).catch(error => {
                                        alert(error);
                                    });
                            }).catch(error => {
                                alert(error);
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
                                    
                                })
                                    .then(res => {
                                        const users = res.data.USERS;
                                        setData({ users });
                                        console.log(data);
                                        resolve();
                                    }).catch(error => {
                                        alert(error);
                                    });
                            }).catch(error => {
                                alert("This user is added for testing purposes and cannot be deleted. Please contact admin, and reload the page.");
                            });

                    }),
            }}
        />
    )
}


export default Header;
