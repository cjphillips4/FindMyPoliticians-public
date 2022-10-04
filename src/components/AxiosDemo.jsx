import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import axios from 'axios';
import { useEffect } from 'react';

let AxiosDemo = () => {

    const [repo,setRepo] = useState([]);
    
    const getRepo = () => {
        axios.get('https://api.github.com/users/mercy-wumi/repos')
            .then((response) => {
                console.log(response);
                const myRepo = response.data;
                setRepo(myRepo);
            });
    };

    useEffect(() => getRepo(), []);

    return (
        <div>
           <tbody>
                           {
                               repo.length > 0 &&
                                    repo.map(repos => {
                                        return (
                                            <tr key={repos.id}>
                                                <td>{repos.id}</td>
                                            </tr>
                                        )
                                    })
                           }
                       </tbody>
        </div>
    )
};

export default AxiosDemo;