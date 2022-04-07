import React from 'react'

function Login({token, url, logout}) {
  return (
    <>
        {!token ? (
        <div className='login-container'>
          <a className='login' href={url}>Login</a>
        </div>

        ) : (
          <button onClick={logout}>Logout</button>
        )}
    </>
  )
}

export default Login