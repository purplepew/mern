import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

import { Link } from 'react-router-dom'

const Public = () => {
    return (
        <Container sx={{ display: 'grid', gap: 1, backgroundColor: 'background.paper', minHeight: '100vh' }}>
            <Typography variant="h4" align="center">Welcome to TechNotesDB</Typography>
            <Stack spacing={2}>
                <Typography>Located in Beautiful Downtown Foo City, Dan D. Repairs  provides a trained staff ready to meet your tech repair needs.</Typography>
                <Typography variant="body2">Dan D. Repairs</Typography>
                <Typography variant="body2">555 Foo Drive</Typography>
                <Typography variant="body2">Foo City, CA 12345</Typography>
            </Stack>
            <Typography><Link to="login">Employee Login:</Link></Typography>
        </Container>
    )
}

export default Public