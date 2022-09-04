import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getCorrectedText } from 'utils/helpers';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 740,
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 150,
  },
  row: {
    whiteSpace: 'nowrap',
  },
});

export interface IColumn {
  id: any;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any, row?: any) => any;
}

interface IMuiTableProps {
  columns: IColumn[];
  data: any;
  isBusy?: boolean;
}

export const MuiTable = ({ columns, data, isBusy }: IMuiTableProps) => {
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (isBusy) {
    return (
      <div className={classes.loading}>
        <CircularProgress size={80} />
      </div>
    );
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={uuid()} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={uuid()}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={uuid()} align={column.align} className={classes.row}>
                        {column.format ? column.format(value, row) : getCorrectedText(value)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
