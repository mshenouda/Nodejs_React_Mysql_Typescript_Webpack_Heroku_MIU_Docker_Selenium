import React, { useState, useContext, useEffect, ChangeEvent, FormEvent, FC } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { TextField, Button, Switch } from '@mui/material';
import endPoint from '../Common/EndPoint';
import {useNavigate} from 'react-router-dom';
import { SensorFormContext } from "../../contexts/SensorFormContext";

export interface SimpleDialogProps {
    open: boolean;
    id: number;
    onClose: ()=>void;
}

const styles = {
    xIcon: {
        color: "red",
    }
};

function SimpleDialog(props: SimpleDialogProps) {
    const { open, id, onClose } = props;
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [published, setPublished] = useState<boolean>(false);
    const { setRefresh, setEditedData } = useContext(SensorFormContext);

    useEffect(() => {
        if (!open) return;
        fetch(`${endPoint}/api/tutorials/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
        })
        .then(res => res.json())
        .then((data) => {
            if (!data || data.message) return;
            setTitle(data.title ?? '');
            setDescription(data.description ?? '');
            setPublished(Boolean(data.published));
        })
        .catch(err => console.log(err));
    }, [open, id]);

    const navigate = useNavigate();
    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const handleDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
    const handlePublished = (e: ChangeEvent<HTMLInputElement>) => setPublished(e.target.checked);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEditedData({id: id, title: title, description: description, published: published});
        const requestOptions = {
            method: 'PUT',
            headers: {
                "Access-Control-Allow-Origin":"*",
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({ 'title': title, "description": description, "published": published })
        };
        fetch(`${endPoint}/api/tutorials/`+id, requestOptions)
        .then(res => {
            if(res.status === 201 || res.status === 200) {
                setRefresh(true);
                setTimeout(() => {
                    navigate('/main');
                }, 1000);
            }
        })
        .then(()=>onClose())
        .catch(err => console.log(err));
    };

    return (
        <Dialog open={open}>
            <ListItemButton onClick={onClose} >
                <ListItemIcon sx={styles.xIcon}><CloseIcon /></ListItemIcon>
            </ListItemButton>  
            <DialogTitle sx={{ fontWeight: 700, padding: 2 }}>Edit Form</DialogTitle>
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

interface Props {
    readonly id: number,
}

const EditDialog:FC<Props> = ({id}) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                <EditNoteIcon /> Edit item
            </Button>
            <SimpleDialog
                open={open}
                id={id}
                onClose={handleClose}
            />
        </div>
    );
};

export default EditDialog;

