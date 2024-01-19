//React libraries
import React, {FC} from 'react';
//Material ui
import Typography from '@mui/material/Typography';


const Copyright: FC<{}> = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © ${new Date().getFullYear()} IntegratedSuite All rights reserved `}
    </Typography>
  );
}
export default Copyright;

