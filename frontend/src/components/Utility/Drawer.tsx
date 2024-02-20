import React, { useState, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DesktopWindowsSharpIcon from '@mui/icons-material/DesktopWindowsSharp';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SensorProvider } from '../../contexts/SensorFormContext';
import Disclaimer from './Disclaimer';
import Dashboard from './Grid';

import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'; 
import { UserNameContext } from "../../contexts/UserNameContext";

const drawerWidth = 240;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

type Program = {
    dashboard: boolean,
    disclaimer: boolean
}

enum Programs {
    DASHBOARD = 0,
    DISCLAIMER
}

export default function PersistentDrawerLeft() {

    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [program, setProgram] = useState<Program>({ dashboard: true, disclaimer: false });
    const {userName} = useContext(UserNameContext);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    function handleProgram(val: Programs) {
        if (val === Programs.DASHBOARD)
            setProgram((prev: Program) => { return { 'dashboard': true, 'disclaimer': false } })
        else if (val === Programs.DISCLAIMER)
            setProgram((prev: Program) => { return { 'dashboard': false, 'disclaimer': true } })
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Menu
                    </Typography>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                        Hello, {userName} !
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem key={"Dashboard"} disablePadding>
                        <ListItemButton onClick={() => handleProgram(Programs.DASHBOARD)}>
                            <ListItemIcon><DashboardIcon /></ListItemIcon>
                            <ListItemText primary={'Dashboard'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={"Disclaimer"} disablePadding >
                        <ListItemButton onClick={() => handleProgram(Programs.DISCLAIMER)}>
                            <ListItemIcon><DesktopWindowsSharpIcon /></ListItemIcon>
                            <ListItemText primary={'Disclaimer'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                {/* <List>
                    {['Implemented', 'Not implemented'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List> */}
                <Divider />
                <ListItemButton  style={{ position: "absolute", bottom: "0" }} key={"Signout"} onClick={() => navigate('/logout')}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Sign out'} />
                </ListItemButton>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <SensorProvider>
                    {program.dashboard && <Dashboard />}
                </SensorProvider>
                {program.disclaimer && <Disclaimer />}
            </Main>
        </Box>
    );
}

