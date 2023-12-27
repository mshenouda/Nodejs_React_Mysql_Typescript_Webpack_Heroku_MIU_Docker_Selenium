



//     return (
//         <React.Fragment>
//             <h2>Register Form</h2>
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     type="text"
//                     color='secondary'
//                     label="Title"
//                     required
//                     onChange={handleTitle}
//                     value={title}
//                     fullWidth />
//                 <TextField
//                     type="text"
//                     variant='outlined'
//                     color='secondary'
//                     label="Description"
//                     onChange={handleDescription}
//                     value={description}
//                     fullWidth
//                     required />
//                 <TextField
//                     type="text"
//                     variant='outlined'
//                     color='secondary'
//                     label="published"
//                     onChange={handlePublished}
//                     value={published}
//                     fullWidth
//                     required
//                     sx={{ mb: 4 }}
//                 />
//                 <Switch
//                     checked={published}
//                     onChange={handlePublished}
//                     inputProps={{ 'aria-label': 'controlled' }}
//                 />
//                 <Button color="secondary" type="submit">Submit</Button>
//             </form>

//         </React.Fragment>
//     )
// };

// export default AddItem;


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
    selectedValue: string;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);

    const handleClose = () => onClose(selectedValue);
    const handleListItemClick = (value: string) => onClose(value);

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePublished = (e: ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked);
    //const handleSubmit = (e: ChangeEvent) => {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        console.log(title, description, published);
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
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle sx={{ padding: 2 }}>Add Form</DialogTitle>
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
                <label style={{ padding: 2 }}>Published: </label>
                <Switch sx={{ padding: 2 }}
                    checked={published}
                    onChange={handlePublished}
                    inputProps={{ 'aria-label': 'controlled' }}
                /><br />
                <Button color="primary" sx={{ height: 20 }} fullWidth type="submit">Submit</Button>
            </form>
        </Dialog>
    );
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <AddCircleIcon /> New item
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}


