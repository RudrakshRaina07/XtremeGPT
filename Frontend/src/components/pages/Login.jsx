import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const {login, loading} = useContext(AuthContext)
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")

    try {
      const isEmail = identifier.includes("@")
      const formData = {
        username: isEmail ? " ": identifier,
        email: isEmail ? identifier : "",
        password
      }

      await login(formData)
      navigate("/")
    } catch (err) {
      setError(
        err.response?.data?.message || "Login Failed. Please try again."
      )
    }
  }

  return (
    <div>
      <form>
        <h1>Welcome Back</h1>
        <p>Please login to XtremeGPT</p>

        {error && (
          <p>{error}</p>
        )}

        <input 
          type="text"
          placeholder="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input 
          type="password"
          placeholder="Passowrd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p>Don't have an account ? {" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
