import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

function Header(props) {


    const handleClick = () => {
        setOpen(true);
      };
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const { useState } = React;

    const [open, setOpen] = React.useState(false);

    const [columns, setColumns] = useState([
        { title: 'Username', field: 'USERNAME' },
        { title: 'First Name', field: 'FIRST_NAME' },
        { title: 'Last Name', field: 'LAST_NAME' },
        { title: 'Phone', field: 'PHONE', type: 'numeric' },
        { title: 'Email', field: 'EMAIL' },
        {
            title: 'Role',
            field: 'ROLE',
            lookup: { 'Teacher': 'Teacher', 'Student': 'Student', 'Admin': 'Admin', 'Tutor': 'Tutor' },
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
                console.log(data);
            }).catch(error => {
                console.log(error);
                handleClick();
            });
    }, []);



    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
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
                    pageSize: 5,
                    actionsColumnIndex: -1
                }}

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

                                    })
                                        .then(res => {
                                            const users = res.data.USERS;
                                            setData({ users });
                                            console.log(data);
                                            resolve();
                                        }).catch(error => {
                                            console.log(error);
                                            handleClick();
                                        });
                                }).catch(error => {
                                    console.log(error);
                                    handleClick();
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

                                    })
                                        .then(res => {
                                            const users = res.data.USERS;
                                            setData({ users });
                                            console.log(data);
                                            resolve();
                                        }).catch(error => {
                                            console.log(error);
                                            handleClick();
                                        });
                                }).catch(error => {
                                    console.log(error);
                                    handleClick();
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
                                            console.log(error);
                                            handleClick();
                                        });
                                }).catch(error => {
                                    console.log(error);
                                    handleClick();
                                });

                        }),
                }}
            />
        </div>
    )
}


export default Header;
