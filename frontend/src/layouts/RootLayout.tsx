import React from 'react';
import {NavLink, Outlet} from 'react-router-dom'; 
import PersistentDrawerLeft from '../components/Utility/Drawer';


const RootLayout: React.FC<{}> = () => {
    return(
        <div>
            <header>    
                {/* <NavLink to="/">Login</NavLink>
                <NavLink to="register">Register</NavLink>
                <NavLink to="logout">Logout</NavLink>
                <NavLink to="forget">Forget</NavLink>
                <NavLink to="main">Main</NavLink> */}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default RootLayout;