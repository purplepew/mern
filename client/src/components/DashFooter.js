import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import HomeIcon from '@mui/icons-material/Home';

import { useLocation, useNavigate } from "react-router-dom"
import { useLogoutMutation } from "../features/auth/authApiSlice"
import { useSelector } from "react-redux"

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const token = useSelector(state => state.auth.token)

    const [logout] = useLogoutMutation()

    let LogoutButton
    if (pathname !== '/' && token) {
        LogoutButton = (
            <IconButton sx={{marginLeft: 'auto'}} onClick={
                async () => {
                    try {
                        await logout().unwrap()
                        navigate('/')
                    } catch (error) {
                        console.log(error)
                    }
                }
            }>
                <HomeIcon />Logout
            </IconButton>
        )
    }

    let LoginButton
    if (pathname !== '/' && !token) {
        LoginButton = (
            <IconButton sx={{marginLeft: 'auto'}} onClick={() => navigate('/login')}>
                <HomeIcon />Login
            </IconButton>
        )
    }

    


    let HomeButton
    if (pathname !== '/dash') {
        HomeButton = (
            <IconButton onClick={() => navigate('/dash')}>
                <HomeIcon />
            </IconButton>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Stack direction="row" alignItems="center">
                    <Typography>TechNotesDB</Typography>
                    {HomeButton}
                </Stack>
                    {LogoutButton}
                    {LoginButton}
            </Toolbar>
        </AppBar>
    )
}

export default DashFooter