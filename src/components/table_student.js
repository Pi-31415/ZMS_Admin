import React, { useState, useEffect } from "react";

import axios from 'axios';

const App = props => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.post('https://zmsedu.com/api/admin/user/get', {

        })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    const add = () => {
       
    }
    return (<div>


        <button onClick={add}>New User</button>
    </div>);
}
export default App;