import { TableContainer, Table as MuiTable, Paper, TableProps as MuiTableProps } from '@mui/material';

interface TableProps extends MuiTableProps {
  children: React.ReactNode;
}

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable {...props}>{children}</MuiTable>
    </TableContainer>
  );
};

export default Table;
