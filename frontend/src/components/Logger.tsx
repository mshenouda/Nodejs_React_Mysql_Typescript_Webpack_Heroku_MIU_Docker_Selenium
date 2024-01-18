//React
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
// import { URL } from './constants.js';

const columns = [
    { id: 'id', label: 'id', minWidth: 20, align: 'left', },
    { id: 'timestamp', label: 'timestamp', minWidth: 50, align: 'left', },
    { id: 'level', label: 'level', minWidth: 50, align: 'left', },
    { id: 'func', label: 'func', minWidth: 200, align: 'left', },
    { id: 'message', label: 'message', minWidth: 300, align: 'left', },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxHeight: 440,
            overflow: 'auto',
        },
        header: {
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#333333",
            padding: '10px',
        },
        body: {
            "& [data-value='Info']": {
                color: 'white',
                textTransform: "uppercase",
                fontWeight: "bold",
            },
            "& [data-value='Warning']": {
                color: 'yellow',
                textTransform: "uppercase",
                fontWeight: "bold",
            },
            "& [data-value='Error']": {
                color: 'red',
                textTransform: "uppercase",
                fontWeight: "bold",
            },
            "& [data-value='Debug']": {
                color: 'blue',
                textTransform: "uppercase",
                fontWeight: "bold",
            },
            children: {
                backgroundColor: 'black',
            }
        }
    }));

export default function Logger() {

    //Hooks
    interface INumber {
        value: number;
    }
    const classes = useStyles();
    const [page, setPage] = useState<number>(0);
    const [logsPerPage, setlogsPerPage] = useState<INumber>({ value: 10 });
    const [logs, setLogs] = useState([]);
    const [refreshInterval, setRefreshInterval] = useState<INumber>({ value: 1000 });
    // const handleChangePage = (event, newPage) => setPage(newPage);
    // const handleChangelogsPerPage = (event) => {
    //     setlogsPerPage(+event.target.value);
    //     setPage(0);
    // };

    //Fetch API
    // const getData = () => fetch(`${URL}/api/logger/`).then(res => res.json()).then(data => setLogs(data));
    // useEffect(() => {
    //     if (refreshInterval.value && refreshInterval.value > 0) {
    //         const interval = setInterval(getData, refreshInterval.value);
    //         return () => clearInterval(interval);
    //     }
    // }, [refreshInterval]);

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.root}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead className={classes.header}>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell variant="head" className={classes.header} key={column.id} /*align={column.align}*/ style={{ minWidth: column.minWidth }}>{column.label.toUpperCase()}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {logs.map(log => (
                            <TableRow key={log.id}>
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{log.timestamp}</TableCell>
                                <TableCell variant="body" className={classes.body}>{log.level}</TableCell>
                                <TableCell>{log.func}</TableCell>
                                <TableCell>{log.message}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}


