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

    const [data, setData] = useState([
        {
            "_id": "5f0db1188362bf32fcd8c21e",
            "ID": "5f0db1188362bf32fcd8c21e",
            "USERNAME": "test",
            "FIRST_NAME": "test",
            "LAST_NAME": "test",
            "PHONE": "test",
            "EMAIL": "test",
            "ROLE": "test",
            "__v": 0
            },
              {
            "_id": "5f0db88c10cb6833887f2916",
            "ID": "5f0db88c10cb6833887f2916",
            "USERNAME": "test2",
            "FIRST_NAME": "test",
            "LAST_NAME": "test",
            "PHONE": "test",
            "EMAIL": "test",
            "ROLE": "test",
            "__v": 0
            },
              {
            "_id": "5f13036af4061202141bb454",
            "ID": "5f13036af4061202141bb454",
            "USERNAME": "Pi",
            "FIRST_NAME": "Paing Thet",
            "LAST_NAME": "Ko",
            "PHONE": "123456789",
            "EMAIL": "pi20@lpcuwc.edu.hk",
            "ROLE": "Student",
            "__v": 0
            },
              {
            "_id": "5f13cd86f4061202141bb455",
            "ID": "5f13cd86f4061202141bb455",
            "USERNAME": "test_user_1",
            "FIRST_NAME": "Ko",
            "LAST_NAME": "Paing",
            "PHONE": "123456789",
            "EMAIL": "pai20@lpcuwc.edu.hk",
            "ROLE": "Student",
            "__v": 0
            },
              {
            "_id": "5f14240df4061202141bb456",
            "ID": "5f14240df4061202141bb456",
            "USERNAME": "test_user_2",
            "FIRST_NAME": "Pi",
            "LAST_NAME": "Ko",
            "PHONE": "123456789",
            "EMAIL": "itninja.ta123@gmail.com",
            "ROLE": "Student",
            "__v": 0
            },
              {
            "_id": "5f142423f4061202141bb457",
            "ID": "5f142423f4061202141bb457",
            "USERNAME": "test_user_3",
            "FIRST_NAME": "Pi",
            "LAST_NAME": "Ko",
            "PHONE": "123456789",
            "EMAIL": "itninja@gmail.com",
            "ROLE": "Student",
            "__v": 0
            },
    ]);


    return (
        <MaterialTable
            title="Editable Preview"
            columns={columns}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);

                            resolve();
                        }, 1000)
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
    )
}


export default Header;
