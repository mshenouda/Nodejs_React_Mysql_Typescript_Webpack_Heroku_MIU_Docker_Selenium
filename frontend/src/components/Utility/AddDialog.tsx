import React, { useState, FC, ChangeEvent, EventHandler, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { TextField, Button, Container, Stack, Checkbox, Switch } from '@mui/material';
import {useNavigate, redirect} from 'react-router-dom'; 

export interface SimpleDialogProps {
    open: boolean;
    onClose: ()=>void;
}

const styles = {
    xIcon: {
        color: "red",
    }
};

function SimpleDialog(props: SimpleDialogProps) {
    const { open, onClose } = props;
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);

    const navigate = useNavigate();
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePublished = (e: ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin":"*",
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ 'title': title, "description": description, "published": published })
        };
        fetch(`http://${process.env.HOST}:${process.env.PORT}/api/tutorials`, requestOptions)
        .then(res => res.json())
        .then(()=>onClose()) 
        .catch(err => console.log(err));
    };

    return (
        <Dialog open={open}>
            <ListItemButton onClick={onClose} >
                <ListItemIcon sx={styles.xIcon}><CloseIcon /></ListItemIcon>
            </ListItemButton>  
            <DialogTitle sx={{ fontWeight: 700, padding: 2 }}>Add Form</DialogTitle>
            <form onSubmit={handleSubmit}>
                <TextField sx={{ padding: 2 }}
                    type="text"
                    color='primary'
                    placeholder="Title"
                    required
                    onChange={handleTitle}
                    value={title}
                    fullWidth />
                <TextField sx={{ padding: 2 }}
                    type="text"
                    variant='outlined'
                    color='primary'
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
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddCircleIcon /> Add item
            </Button>
            <SimpleDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}


