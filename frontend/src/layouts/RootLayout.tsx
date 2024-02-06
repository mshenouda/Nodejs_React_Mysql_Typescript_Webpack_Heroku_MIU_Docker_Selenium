import React, {FC} from 'react';
import {NavLink, Outlet} from 'react-router-dom'; 

const RootLayout: FC<{}> = () => {
    return(
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    );
};
export default RootLayout;