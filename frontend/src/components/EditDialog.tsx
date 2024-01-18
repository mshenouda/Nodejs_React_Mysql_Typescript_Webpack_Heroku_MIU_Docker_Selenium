import React, { useState, FC, ChangeEvent, EventHandler, FormEvent } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { TextField, Button, Container, Stack, Checkbox, Switch, Modal, Box } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface EditDialogProps {
    openModal: boolean;
    id: number;
}

export default function EditDialog(props: EditDialogProps) {
    const {openModal, id} = props;
    const [open, setOpen] = React.useState(openModal);
   
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePublished = (e: ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'title': title, "description": description, "published": published })
        };
        fetch("http://localhost:8080/api/tutorials/" + id, requestOptions)
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };


  return (
    <div>
    
    <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
    <Box sx={style}>
        <ListItemButton onClick={() => setOpen(false)} >
            <ListItemIcon sx={{color: "red"}}><CloseIcon /></ListItemIcon>
        </ListItemButton>    
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
    </Box>
    </Modal>
    </div>
  );
}

