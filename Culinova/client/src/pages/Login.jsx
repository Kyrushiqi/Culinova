import { useState } from "react"

export default function Login() {
  const[data, setData] = useState({
    name: '',
    password: '',
  })
  const loginUser = () => {
    e.preventDefault()
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Name</label>
        <input type= 'text' placeholder= 'enter name...' value={data.name} onChange={(e) => setData({...data, name: e.target.value})} /> 
        <label>Password</label>
        <input type= 'password' placeholder= 'enter password...' value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type= 'submit'>Login</button>
        </form> 
    </div>
  )
}
