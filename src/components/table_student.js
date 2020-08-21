import React from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export default class PersonList extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        axios.post(`https://zmsedu.com/api/admin/user/get`)
            .then(res => {
                const users = res.data.USERS;

                this.setState({ users });
                console.log(this.state);
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                    columns={[
                        { title: 'Username', field: 'USERNAME' },
                        { title: 'First Name', field: 'FIRST_NAME' },
                        { title: 'Last Name', field: 'LAST_NAME' },
                        { title: 'Phone', field: 'PHONE', type: 'numeric' },
                        { title: 'Email', field: 'EMAIL' },
                        { title: 'Role', field: 'ROLE' },
                    ]}
                    data={this.state.users}
                    title="Users"
                />
            </div>
        )
    }
}