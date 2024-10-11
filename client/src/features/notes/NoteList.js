import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"

import { useGetNotesQuery } from "./notesApiSlice"

const NoteList = () => {
    const { data: notes,
        isLoading,
        isSuccess,
        isError,
        error } = useGetNotesQuery()

        console.log(notes)

    return (
        <Container sx={{ p: 2, minHeight: '90vh', backgroundColor: 'background.paper' }}>
            <Stack spacing={2}>
                <Typography>Notes</Typography>
                <Divider />
                <Typography>asd</Typography>
            </Stack>
        </Container>
    )
}

export default NoteList