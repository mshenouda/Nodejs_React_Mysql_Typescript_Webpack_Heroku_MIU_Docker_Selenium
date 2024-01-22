//React
import React, { useState, useEffect, FC } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const columns = [
    { id: 'id', label: 'id', minWidth: 20, align: "left" },
    { id: 'timestamp', label: 'timestamp', minWidth: 50, align: 'left' },
    { id: 'level', label: 'level', minWidth: 50, align: 'left'},
    { id: 'func', label: 'func', minWidth: 200, align: 'left' },
    { id: 'message', label: 'message', minWidth: 300, align: 'left' },
];

interface ILogger {
    id: number,
    timestamp: string,
    level: string,
    func: string,
    message: string,
}


const styles = {
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
        fontSize: 20,
        fontWeight: "600",
        color: "black"
    },
    severity: {
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
};

const Logger: React.FC<{}> = () => {

    //Hooks
    interface INumber {
        value: number;
    }
    const [page, setPage] = useState<number>(0);
    const [logsPerPage, setlogsPerPage] = useState<INumber>({ value: 10 });
    const [logs, setLogs] = useState<ILogger[]>([]);
    const [refreshInterval, setRefreshInterval] = useState<INumber>({ value: 1000 });

    function formatTimeStamp(ts: string): string {
        const formatted = new Date(ts).toLocaleString(
            "en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit", 
                minute: "2-digit", 
                second: "2-digit",
                dayPeriod: "long",
        });
        //const formatted = new Date(ts).toLocaleString("en-US");
        return formatted;
    }

    // const handleChangePage = (event, newPage) => setPage(newPage);
    // const handleChangelogsPerPage = (event) => {
    //     setlogsPerPage(+event.target.value);
    //     setPage(0);
    // };

    //Fetch API
    const getData = () => {
        fetch("http://localhost:8080/api/loggers")
        .then(res => res.json())
        .then(data => setLogs(data))
        .catch(err => console.log(err));
    };
    
    useEffect(() => {
        if (refreshInterval.value && refreshInterval.value > 0) {
            const interval = setInterval(getData, refreshInterval.value);
            return () => clearInterval(interval);
        }
    }, [refreshInterval]);

    return (
        <Paper sx={styles.root}>
            <TableContainer sx={styles.root}>
                <Table stickyHeader size="small" aria-label="sticky table">
                    <TableHead sx={styles.header}>
                        <TableRow>
                            {columns.map(column => (
                                <TableCell variant="head"
                                sx={styles.header} key={column.id} /*align={column.align}*/
                                style={{ minWidth: column.minWidth }}>
                                {column.label.toUpperCase()}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map(log => (
                            <TableRow sx={styles.body} key={log.id}>
                                <TableCell>{log.id}</TableCell>
                                <TableCell>{formatTimeStamp(log.timestamp)}</TableCell>
                                <TableCell variant="body" sx={styles.severity}>{log.level}</TableCell>
                                <TableCell>{log.func}</TableCell>
                                <TableCell>{log.message}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default Logger;


