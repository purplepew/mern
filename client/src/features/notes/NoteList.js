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

        let content
        if(isLoading){
            content = <Typography>Loading...</Typography>
        }else if(isSuccess){
            content = <Typography>connected</Typography>
        }else if(isError){
            const errMsg = error.error || error.data.message || 'error'
            content = <Typography>{errMsg}</Typography>
        }

    return (
        <Container sx={{ p: 2, minHeight: '90vh', backgroundColor: 'background.paper' }}>
            <Stack spacing={2}>
                <Typography>Notes</Typography>
                <Divider />
                {content}
            </Stack>
        </Container>
    )
}

export default NoteList