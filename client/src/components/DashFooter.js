import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import HomeIcon from '@mui/icons-material/Home';

import { useLocation, useNavigate } from "react-router-dom"

const DashFooter = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    let HomeButton
    if (pathname !== '/dash') {
        HomeButton = (
            <IconButton onClick={()=>navigate('/dash')}>
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
            </Toolbar>
        </AppBar>
    )
}

export default DashFooter