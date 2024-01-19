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

const styles = {
    xIcon: {
        color: "red",
        textAlign: "right",
    },
    textField: {
        padding: 2
    },
    switch: {
        padding: 2
    },
    button: {
        fontWeight: 400,
        height: 50
    }
};

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
            open={openModal && open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <ListItemButton onClick={handleClose} >
                <ListItemIcon sx={styles.xIcon}><CloseIcon /></ListItemIcon>
            </ListItemButton>    
            <form onSubmit={handleSubmit}>
                <TextField sx={styles.textField}
                    type="text"
                    color='primary'
                    autoFocus
                    placeholder="Title"
                    required
                    onChange={handleTitle}
                    value={title}
                    fullWidth />
                <TextField sx={styles.textField}
                    type="text"
                    variant='outlined'
                    color='primary'
                    placeholder="Description"
                    onChange={handleDescription}
                    value={description}
                    fullWidth
                    required />
                <label style={{ fontWeight: 400, padding: 2 }}>Published: </label>
                <Switch sx={styles.switch}
                    checked={published}
                    onChange={handlePublished}
                    inputProps={{ 'aria-label': 'controlled' }}
                    /><br />
                <Button color="primary" sx={styles.button} fullWidth type="submit">Submit</Button>
            </form>
        </Box>
        </Modal>
    </div>
  );
}

