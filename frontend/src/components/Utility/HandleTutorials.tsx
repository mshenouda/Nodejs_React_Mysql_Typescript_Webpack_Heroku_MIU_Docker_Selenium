import React, { useState, useEffect, FC } from 'react';
import { withStyles, makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import { styled } from '@mui/system';
import {
  TablePagination,
  tablePaginationClasses as classes,
} from '@mui/base/TablePagination';
import {
  Button, Table, TableBody,
  TableCell, TableHead, TableRow, Paper,
  TableContainer, Grid, ListItemIcon,
  ListItemButton, ListItemText, ListItem, Stack
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';

const Root = styled('div')
(({ theme }) => `
  table {
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    text-align: left;
    padding: 6px;
  }

  th {
    background-color: ${theme.palette.mode === 'dark' ? blue[900] : blue[50]};
  }
  `,
);


const CustomTablePagination = styled(TablePagination)(
  ({ theme }) => `
  & .${classes.spacer} {
    display: none;
  }

  & .${classes.toolbar}  {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.select}{
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }

  & .${classes.displayedRows} {
      margin: 0;
  
    #@media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.actions} {
    padding: 2px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[200]};
    border-radius: 50px;
    text-align: center;
  }

  & .${classes.actions} > button {
    margin: 0 8px;
    border: transparent;
    border-radius: 2px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
    }

    &:focus {
      outline: 1px solid ${theme.palette.mode === 'dark' ? blue[400] : blue[200]};
    }
  }
  `,
);


const blue = {
  50: '#F0F7FF',
  200: '#A5D8FF',
  400: '#3399FF',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

interface IData {
  readonly id: number,
  title: string,
  description: string,
  published: boolean,

}

const HandleTutorials: React.FC<{}> = () => {
  const [datas, setData] = useState<IData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const [refreshInterval, setRefreshInterval] = useState<INumber>({ value: 1000 });

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;
  console.log(emptyRows);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  useEffect(() => {
      if (refreshInterval.value && refreshInterval.value > 0) {
          const interval = setInterval(showAll, refreshInterval.value);
          return () => clearInterval(interval);
      }
  }, [refreshInterval]);

  const showAll = (): void => {
    {
      fetch(`http://localhost:${process.env.SERVER_PORT}/api/tutorials`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(newData => {setData((prev) => [...prev, ...newData]);})
      .catch(err => console.log(err));
    }
  }

  function handleDelete(id: number) {
    fetch(`http://localhost:${process.env.SERVER_PORT}/api/tutorials/` + id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    setTimeout(() => {
      setData(prev => prev.filter((el) =>el.id != id));
    },  500);
  }

  

  return (
    <>
      <ListItem key={"AddIcon"} disablePadding>
        <AddDialog />
      </ListItem>
      <Root sx={{ width: 1000, maxWidth: '100%' }}>
        <table aria-label="custom pagination table">
          <thead>
            <tr>
              <th align="justify">ID</th>
              <th align="justify">Title</th>
              <th align="justify">Description</th>
              <th align="justify">Published</th>
              <th align="justify">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : datas
            ).map((row) => ( 
              <tr key={row.id}>
                <td style={{ width: 10, height: 2 }} align="justify">{row.id}</td>
                <td style={{ width: 50, height: 2 }} align="justify">{row.title} </td>
                <td style={{ width: 120, wordWrap: "break-word" }} align="justify">{row.description} </td>
                <td style={{ width: 20 }} align="justify">{row.published ? "Published" : "Not Published"} </td>
                <td style={{ width: 20 }}>
                  <Stack spacing={1} sx={{ padding: 5 }} direction="row">
                  <ListItem key={"EditIcon"} disablePadding>
                    <EditDialog id={row.id}/>
                  </ListItem>
                    <ListItemButton onClick={() => handleDelete(row.id)}>
                      <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                    </ListItemButton>
                  </Stack>
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr style={{ height: 2 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={datas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page',
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </>
  );
}

export default HandleTutorials;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';

// interface Column {
//   id: 'name' | 'code' | 'population' | 'size' | 'density';
//   label: string;
//   minWidth?: number;
//   align?: 'right';
//   format?: (value: number) => string;
// }

// const columns: Column[] = [
//   { id: 'name', label: 'Name', minWidth: 170 },
//   { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
//   {
//     id: 'population',
//     label: 'Population',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'size',
//     label: 'Size\u00a0(km\u00b2)',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: 'density',
//     label: 'Density',
//     minWidth: 170,
//     align: 'right',
//     format: (value: number) => value.toFixed(2),
//   },
// ];

// interface Data {
//   name: string;
//   code: string;
//   population: number;
//   size: number;
//   density: number;
// }

// function createData(name: string, code: string, population: number, size: number): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

// const rows = [
//   createData('India', 'IN', 1324171354, 3287263),
//   createData('China', 'CN', 1403500365, 9596961),
//   createData('Italy', 'IT', 60483973, 301340),
//   createData('United States', 'US', 327167434, 9833520),
//   createData('Canada', 'CA', 37602103, 9984670),
//   createData('Australia', 'AU', 25475400, 7692024),
//   createData('Germany', 'DE', 83019200, 357578),
//   createData('Ireland', 'IE', 4857000, 70273),
//   createData('Mexico', 'MX', 126577691, 1972550),
//   createData('Japan', 'JP', 126317000, 377973),
//   createData('France', 'FR', 67022000, 640679),
//   createData('United Kingdom', 'GB', 67545757, 242495),
//   createData('Russia', 'RU', 146793744, 17098246),
//   createData('Nigeria', 'NG', 200962417, 923768),
//   createData('Brazil', 'BR', 210147125, 8515767),
// ];

// const useStyles = makeStyles({
//   // root: {
//   //   width: '100%',
//   // },
//   // container: {
//   //   maxHeight: 440,
//   // },
// });

// export default function StickyHeadTable() {
//   const classes = useStyles();
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     // <Paper className={classes.root}>
//     <div>
//       <TableContainer >
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align}
//                   style={{ minWidth: column.minWidth }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
//               return (
//                 <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                   {columns.map((column) => {
//                     const value = row[column.id];
//                     return (
//                       <TableCell key={column.id} align={column.align}>
//                         {column.format && typeof value === 'number' ? column.format(value) : value}
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 15]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//     // </Paper>
//   );
// }


// import React from 'react';
// import clsx from 'clsx';
// import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
// import TableCell from '@material-ui/core/TableCell';
// import Paper from '@material-ui/core/Paper';
// import { AutoSizer, Column, Table, TableCellRenderer, TableHeaderProps } from 'react-virtualized';

// declare module '@material-ui/core/styles/withStyles' {
//   // Augment the BaseCSSProperties so that we can control jss-rtl
//   interface BaseCSSProperties {
//     /*
//      * Used to control if the rule-set should be affected by rtl transformation
//      */
//     flip?: boolean;
//   }
// }

// const styles = (theme: Theme) =>
//   createStyles({
//     flexContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       boxSizing: 'border-box',
//     },
//     table: {
//       // temporary right-to-left patch, waiting for
//       // https://github.com/bvaughn/react-virtualized/issues/454
//       '& .ReactVirtualized__Table__headerRow': {
//         flip: false,
//         paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
//       },
//     },
//     tableRow: {
//       cursor: 'pointer',
//     },
//     tableRowHover: {
//       '&:hover': {
//         backgroundColor: theme.palette.grey[200],
//       },
//     },
//     tableCell: {
//       flex: 1,
//     },
//     noClick: {
//       cursor: 'initial',
//     },
//   });

// interface ColumnData {
//   dataKey: string;
//   label: string;
//   numeric?: boolean;
//   width: number;
// }

// interface Row {
//   index: number;
// }

// interface MuiVirtualizedTableProps extends WithStyles<typeof styles> {
//   columns: ColumnData[];
//   headerHeight?: number;
//   onRowClick?: () => void;
//   rowCount: number;
//   rowGetter: (row: Row) => Data;
//   rowHeight?: number;
// }

// class MuiVirtualizedTable extends React.PureComponent<MuiVirtualizedTableProps> {
//   static defaultProps = {
//     headerHeight: 48,
//     rowHeight: 48,
//   };

//   getRowClassName = ({ index }: Row) => {
//     const { classes, onRowClick } = this.props;

//     return clsx(classes.tableRow, classes.flexContainer, {
//       [classes.tableRowHover]: index !== -1 && onRowClick != null,
//     });
//   };

//   cellRenderer: TableCellRenderer = ({ cellData, columnIndex }) => {
//     const { columns, classes, rowHeight, onRowClick } = this.props;
//     return (
//       <TableCell
//         component="div"
//         className={clsx(classes.tableCell, classes.flexContainer, {
//           [classes.noClick]: onRowClick == null,
//         })}
//         variant="body"
//         style={{ height: rowHeight }}
//         align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
//       >
//         {cellData}
//       </TableCell>
//     );
//   };

//   headerRenderer = ({ label, columnIndex }: TableHeaderProps & { columnIndex: number }) => {
//     const { headerHeight, columns, classes } = this.props;

//     return (
//       <TableCell
//         component="div"
//         className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
//         variant="head"
//         style={{ height: headerHeight }}
//         align={columns[columnIndex].numeric || false ? 'right' : 'left'}
//       >
//         <span>{label}</span>
//       </TableCell>
//     );
//   };

//   render() {
//     const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
//     return (
//       <AutoSizer>
//         {({ height, width }) => (
//           <Table
//             height={height}
//             width={width}
//             rowHeight={rowHeight!}
//             gridStyle={{
//               direction: 'inherit',
//             }}
//             headerHeight={headerHeight!}
//             className={classes.table}
//             {...tableProps}
//             rowClassName={this.getRowClassName}
//           >
//             {columns.map(({ dataKey, ...other }, index) => {
//               return (
//                 <Column
//                   key={dataKey}
//                   headerRenderer={(headerProps) =>
//                     this.headerRenderer({
//                       ...headerProps,
//                       columnIndex: index,
//                     })
//                   }
//                   className={classes.flexContainer}
//                   cellRenderer={this.cellRenderer}
//                   dataKey={dataKey}
//                   {...other}
//                 />
//               );
//             })}
//           </Table>
//         )}
//       </AutoSizer>
//     );
//   }
// }

// //const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);
// const VirtualizedTable = withStyles()(MuiVirtualizedTable);

// // ---

// interface Data {
//   calories: number;
//   carbs: number;
//   dessert: string;
//   fat: number;
//   id: number;
//   protein: number;
// }
// type Sample = [string, number, number, number, number];

// const sample: Sample[] = [
//   ['Frozen yoghurt', 159, 6.0, 24, 4.0],
//   ['Ice cream sandwich', 237, 9.0, 37, 4.3],
//   ['Eclair', 262, 16.0, 24, 6.0],
//   ['Cupcake', 305, 3.7, 67, 4.3],
//   ['Gingerbread', 356, 16.0, 49, 3.9],
// ];

// function createData(
//   id: number,
//   dessert: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ): Data {
//   return { id, dessert, calories, fat, carbs, protein };
// }

// const rows: Data[] = [];

// for (let i = 0; i < 200; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
//   rows.push(createData(i, ...randomSelection));
// }

// export default function ReactVirtualizedTable() {
//   return (
//     <Paper style={{ height: 400, width: '100%' }}>
//       <VirtualizedTable
//         rowCount={rows.length}
//         rowGetter={({ index }) => rows[index]}
//         columns={[
//           {
//             width: 200,
//             label: 'Dessert',
//             dataKey: 'dessert',
//           },
//           {
//             width: 120,
//             label: 'Calories\u00A0(g)',
//             dataKey: 'calories',
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: 'Fat\u00A0(g)',
//             dataKey: 'fat',
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: 'Carbs\u00A0(g)',
//             dataKey: 'carbs',
//             numeric: true,
//           },
//           {
//             width: 120,
//             label: 'Protein\u00A0(g)',
//             dataKey: 'protein',
//             numeric: true,
//           },
//         ]}
//       />
//     </Paper>
//   );
// }