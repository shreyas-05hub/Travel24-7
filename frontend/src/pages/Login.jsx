import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import useTravelCost from '../components/layout/context/TravelContext'
import { toast } from 'react-toastify';

const Login = () => {
    const {loginWithGoogle}=useTravelCost()
    let navigate=useNavigate()
    let startLogin=async()=>{
        await loginWithGoogle()
        navigate("/packages")
    }
  return (
    <div className='card'>
      <Button type='primary' onClick={startLogin}>Login With Google</Button>
    </div>
  )
}

export default Login
