import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"

import { Link } from "react-router-dom"

const Welcome = () => {
    return (
        <Container sx={{ p: 2, minHeight: '90dvh', backgroundColor: 'background.paper' }}>
            <Stack spacing={2}>
                <Typography variant="h5">Welcome, name</Typography>
                <Divider />
                <Typography><Link to="notes">Check the notes database</Link></Typography>
            </Stack>
        </Container>
    )
}

export default Welcome