import React, { useState, FC, ChangeEvent, EventHandler, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { TextField, Button, Container, Stack, Checkbox, Switch } from '@mui/material';


export interface SimpleDialogProps {
    open: boolean;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { open } = props;
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);

    const handleClose = () => {};
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePublished = (e: ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        //console.log(title, description, published);
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'title': title, "description": description, "published": published })
        };
        fetch("http://localhost:8080/api/tutorials", requestOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));

    };

    return (
        <Dialog open={open}>
            <DialogTitle sx={{ fontWeight: 700, padding: 2 }}>Add Form</DialogTitle>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ padding: 2 }}
                    type="text"
                    color='secondary'
                    placeholder="Title"
                    required
                    onChange={handleTitle}
                    value={title}
                    fullWidth />
                <TextField sx={{ padding: 2 }}
                    type="text"
                    variant='outlined'
                    color='secondary'
                    placeholder="Description"
                    onChange={handleDescription}
                    value={description}
                    fullWidth
                    required />
                <label style={{ fontWeight: 400, padding: 2 }}>Published: </label>
                <Switch sx={{ padding: 2 }}
                    checked={published}
                    onChange={handlePublished}
                    inputProps={{ 'aria-label': 'controlled' }}
                /><br />
                <Button color="primary" sx={{ fontWeight: 400, height: 50 }} fullWidth type="submit">Submit</Button>
            </form>
        </Dialog>
    );
}

export default function AddDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    //const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddCircleIcon /> Add item
            </Button>
            <SimpleDialog
                open={open}
                //onClose={handleClose}
            />
        </div>
    );
}


