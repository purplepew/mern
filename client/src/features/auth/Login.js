import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import usePersist from '../../app/hooks/usePersist'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const [persist, setPersist] = usePersist()

    const [login, { isLoading, isSuccess }] = useLoginMutation()

    const onLoginHandler = async () => {
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            navigate('/dash')
        } catch (error) {
            if (typeof error.status !== 'number' || !error.status) {
                setErrMsg('No server response')
            } else if (error.status === 404) {
                setErrMsg('Invalid username or password')
            }else if(error.data?.message){
                setErrMsg(error.data.message)
            }else {
                setErrMsg(error.error || 'Error.')
            }
        }
    }

    const onChangeUsername = (e) => setUsername(e.target.value)
    const onChangePassword = (e) => setPassword(e.target.value)
    const handleToggleForPersist = () => setPersist(prev => !prev)
  

    useEffect(() => {
        setErrMsg('')
    }, [username, password])

    return (
        <Container sx={{ placeContent: 'center', minHeight: '100vh', backgroundColor: 'background.paper' }}>
            <Stack gap={1.5} direction="column" sx={{
                margin: '0 auto', minWidth: 325, maxWidth: 460,
            }}>
                <TextField onChange={onChangeUsername} value={username} label="usesrname" />
                <TextField onChange={onChangePassword} value={password} label="password" />
                <Button sx={{ backgroundColor: isSuccess ? "forestgreen" : "primary" }} onClick={onLoginHandler} disabled={isLoading} variant="contained">Login</Button>
                <FormControlLabel control={<Checkbox onClick={handleToggleForPersist} />} label="Remember me" />
                <Typography color="warning" sx={{ textAlign: 'center', fontFamily: 'Elephant, Trebuchet MS', }}>{errMsg}</Typography>
            </Stack>
        </Container>
    )
}

export default Login