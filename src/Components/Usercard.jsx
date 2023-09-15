import React, { useState } from 'react';
import './Usercard.css'


export const Usercard = () => {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);

    const handleChange = (event) => {
        setUsername(event.target.value);
    };


    const handleSubmit = async () => {
    
        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
              const data = await response.json();
              setUserData(data);
            } else {
              console.error('User not found');
              setUserData(null);
            }
          } catch (error) {
            console.error(error);
          } 

        setUsername("")
    };
    return (
        <div className='usercard_container'>
            <div className='search_container'>
                <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={username}
                    onChange={handleChange}
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>


            {userData && (
                <div className="userCard">
                    <div className="avatar">
                        <img src={userData.avatar_url} alt={`${username}'s avatar`} />
                    </div>
                    <div className="userCard-descp">
                        <h2>{userData.name}</h2>
                        <div className='description'>
                            <p>@{userData.login}</p>
                        </div>

                        <div className="repos-btns">
                            <button>Public Repos : {userData.public_repos}</button>
                            <button>Public Gists : {userData.public_gists}</button>
                            <p>Profile created at : {new Date(userData.created_at).toISOString().split('T')[0]}</p>

                        </div>

                    </div>






                </div>



            )}
        </div>
    )
}
