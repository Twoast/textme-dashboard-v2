import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { withTheme } from '@mui/styles';
import ReactCountryFlag from 'react-country-flag';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import withPaginatedApi from 'src/components/Content/APIPage';

const API_ENDPOINT = 'phone_numbers/parked';
const ParkedNumberComponent = (props) => {
  return (
    <Card>
      <Card>
        <CardHeader title="Parked Numbers" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Number #</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.apiData.map((phoneNumber, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                        style={{ width: 150 }}
                      >
                        {props.isLoading ? <Skeleton /> : phoneNumber.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap style={{ width: 70 }}>
                        {props.isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <ReactCountryFlag countryCode={phoneNumber.iso_country} /> <small>({phoneNumber.iso_country})</small>
                          </>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {props.isLoading ? (
                        <Skeleton />
                      ) : (
                        <Tooltip title="Unpark number" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: props.theme.colors.primary.lighter,
                              },
                              color: props.theme.palette.primary.main,
                            }}
                            color="inherit"
                            size="small"
                          >
                            <LockOpenOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          {props.isLoading ? (
            <Skeleton />
          ) : (
            <TablePagination
              component="div"
              count={props.dataCount}
              onPageChange={props.handlePageChange}
              onRowsPerPageChange={props.handleLimitChange}
              page={props.pageLimit.page}
              rowsPerPage={props.pageLimit.limit}
              rowsPerPageOptions={[25, 50, 75, 100]}
            />
          )}
        </Box>
      </Card>
    </Card>
  );
};

export default withPaginatedApi(withTheme(ParkedNumberComponent), API_ENDPOINT);
