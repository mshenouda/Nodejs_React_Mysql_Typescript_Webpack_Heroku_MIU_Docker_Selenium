import React, {FC} from 'react';

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