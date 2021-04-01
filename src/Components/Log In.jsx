import React from 'react';


function LogIn(){
    
    const rankedAPI = process.env.REACT_APP_API_URL

    async function submit(){
        const user = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        const response = await fetch(`${rankedAPI}/login`,{
            method:'POST',
            body: JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        
        if (response.status >= 300) return
        
        localStorage.setItem('ranked-token', await response.json())
        window.location.replace(`/home`)
    }

    return (
        <div className="container">
            <form className='form' onSubmit={e => e.preventDefault()}>
                <h1>Log In</h1>
                <label htmlFor="email">E-mail:</label>
                <input type="email" name="email" id="email" required/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required/>
                <button type="submit" className='button' onClick={() => submit()}>Submit</button>
            </form>
        </div>
    );
};

export default LogIn;