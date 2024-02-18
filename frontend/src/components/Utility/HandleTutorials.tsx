import React, { useState, useEffect, FC } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box, Table, TableHead, TableBody,
  TableCell, TableContainer,
  TableFooter, TablePagination, TableRow,
  Paper, Stack,  ListItemIcon, ListItemButton,
  ListItemText, ListItem
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import endPoint from '../Common/EndPoint';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface IData {
  readonly id: number,
  title: string,
  description: string,
  published: boolean,

}

const HandleTutorials: FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [datas, setData] = useState<IData[]>([]);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  // useEffect (
  //   ()=> showAll(),
  //   []);
  console.log(`im here`);
  const showAll = (): void => {
    {
      fetch(`${endPoint}/api/tutorials`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8'
        },
      })
      .then(res => console.log(res))
      // .then(newData => {setData((prev) => [...prev, ...newData]);})
      .catch(err => console.log(err));
    }
  }
  
  function handleDelete(id: number) {
    fetch(`${endPoint}/api/tutorials/` + id, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    setTimeout(() => {
      setData(prev => prev.filter((el) =>el.id != id));
    },  500);
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - datas.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <ListItem key={"AddIcon"} disablePadding>
          <AddDialog />
      </ListItem>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Title</th>
              <th align="left">Description</th>
              <th align="left">Published</th>
              <th align="left">Actions</th>
            </tr>
          </thead>
          <TableBody>
            {(rowsPerPage > 0
              ? datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : datas
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.title}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.description}
                </TableCell>
                <TableCell style={{ width: 160 }} align="left">
                  {row.published}
                </TableCell>
                <TableCell>
                  <Stack spacing={1} sx={{ padding: 1 }} direction="row">
                    <ListItem key={"EditIcon"} disablePadding>
                      <EditDialog id={row.id}/>
                    </ListItem>
                    <ListItemButton onClick={() => handleDelete(row.id)}>
                      <ListItemIcon><DeleteForeverIcon /></ListItemIcon>
                    </ListItemButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                colSpan={3}
                count={datas.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default HandleTutorials;