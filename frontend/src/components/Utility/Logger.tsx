//React
import React, { useState, useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import endPoint from '../Common/EndPoint';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams , GridCellParams} from '@mui/x-data-grid';
// import log from 'loglevel';
// import remote from 'loglevel-plugin-remote';
import moment from 'moment';
import clsx from 'clsx';

interface ILogger {
  id: number,
  timestamp: string,
  level: string,
  func: string,
  message: string,
}

const styles = {
  height: 300,
  width: '100%',
  '& .level.info': {
    backgroundColor: 'rgba(16, 16, 112, 0.55)',
    color: 'black',
    fontWeight: '600',
    textTransform: 'uppercase' 
  },
  '& .level.warn': {
    backgroundColor: 'rgba(206, 217, 87, 0.49)',
    color: 'black',
    fontWeight: '600',
    textTransform: 'uppercase' 
  },
  '& .level.error': {
    backgroundColor: 'rgba(194, 35, 14, 0.49)',
    color: 'black',
    fontWeight: '600',
    textTransform: 'uppercase' 
  },
  '& .level.debug': {
    backgroundColor: 'rgba(14, 161, 32, 0.49)',
    color: 'black',
    fontWeight: '600',
    textTransform: 'uppercase'
  }
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'timestamp',
    headerName: 'Timestamp',
    width: 250,
    valueFormatter: (params) =>moment(params.value).format("lll"), 
  },
  {
    field: 'level',
    headerName: 'Level',
    width: 150,
    editable: false,
    cellClassName: (params: GridCellParams<any>) => {
      return clsx('level', {
        info: params.value === 'Info',
        error: params.value === 'Error',
        warn: params.value === 'Warn',
        debug: params.value === 'Debug',
      })}
  },
  {
    field: 'func',
    headerName: 'Func',
    type: 'string',
    width: 110,
    editable: false,
  },
  {
    field: 'message',
    headerName: 'Message',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
  },
];

interface INumber {
    value: number;
}
const Logger: FC = () => {

    const [rows, setRows] = useState<ILogger[]>([]);
    const [refreshInterval, setRefreshInterval] = useState<INumber>({ value: 1000 });

    const getData = () => {
        fetch(`${endPoint}/api/loggers`)
        .then(res => res.json())
        .then(data => setRows(data))
        .catch(err => console.log(err));
    };
    
    // useEffect(() => {
    //     if (refreshInterval.value && refreshInterval.value > 0){
    //         const interval = setInterval(getData, refreshInterval.value);
    //         return () => clearInterval(interval);
    //     }
    // }, [refreshInterval]);

    useEffect(()=>getData(), []);

    return (
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          sx={styles}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
  );

};

export default Logger;
