import React from 'react';
import MaterialTable from 'material-table';

export default function StudentTable() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'First Name', field: 'name' },
            { title: 'Last Name', field: 'surname' },
            { title: 'Username', field: 'username' },
            { title: 'Phone', field: 'phone', type: 'numeric' },
            { title: 'Email', field: 'email' },
            { title: 'Remarks', field: 'remark' },
        ],
        data: [
            {
                id: 'ST001',
                name: 'Anna',
                surname: 'So',
                username: 'anna_so_32',
                phone: 85290987588,
                email: 'anna@tms.edu.hk',
                remark: ''
            },
            {
                id: 'ST002',
                name: 'Kyle',
                surname: 'Wong',
                username: 'kylewong34',
                phone: 85291235588,
                email: 'kyle@gmail.com',
                remark: ''
            },
            {
                id: 'ST003',
                name: 'Luhua',
                surname: 'Chen',
                username: 'candychen',
                phone: 85297987588,
                email: 'candy23@gmail.com',
                remark: 'Wants to try Electronic Music Composition class'
            },
            {
                id: 'ST004',
                name: 'Eva',
                surname: 'Ding',
                username: 'evading271',
                phone: 85297523488,
                email: 'dingeva@yahoo.net',
                remark: ''
            },
            {
                id: 'ST005',
                name: 'Bob',
                surname: 'Tsang',
                username: '502bob_mount',
                phone: 85297555523,
                email: 'notthebeach@gmail.com',
                remark: 'Very athletic and sporty, need to build up academics'
            },
            {
                id: 'ST006',
                name: 'Tamaki',
                surname: 'Kuno',
                username: 'kuno_philo',
                phone: 85297555588,
                email: 'tamaki12@gmail.com',
                remark: 'Deeply passionate in anthropology and wants to major in that.'
            },
            {
                id: 'ST007',
                name: 'Victor',
                surname: 'Wong',
                username: 'wong_vic',
                phone: 85265755524,
                email: 'victorwong@yahoo.net',
                remark: 'Struggling in maths class'
            },
        ],
    });

    return (
        <MaterialTable
            title="Students"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}