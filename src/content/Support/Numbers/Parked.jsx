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
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const ParkedNumbers = () => {
  const theme = useTheme();
  const [isLoading, setLoading] = useState(true);
  const [pageLimit, setPageLimit] = useState({ page: 0, limit: 25 });
  const [phoneNumbers, setPhoneNumbers] = useState([...Array(pageLimit.limit).keys()]);
  const [phoneNumberCount, setPhoneNumberCount] = useState(0);

  const address = `https://mocki.io/v1/232690ad-a65f-4380-a1d1-ca906d5c27d9?page=${pageLimit.page + 1}&limit=${pageLimit.limit}`;
  const fetcher = async (url) => await axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  const applyPagination = (phoneNumbers, page, limit) => {
    return phoneNumbers.slice(page * limit, page * limit + limit);
  };

  if (error) toast.error("Couldn't fetch data");
  if (data && isLoading) {
    setLoading(false);
    setPhoneNumberCount(data.total);
    setPhoneNumbers(applyPagination(data.results, pageLimit.page, pageLimit.limit));
  }

  const handlePageChange = (_event, newPage) => {
    setLoading(true);
    setPageLimit({ ...pageLimit, page: newPage });
  };

  const handleLimitChange = (event) => {
    setLoading(true);
    const limit = parseInt(event.target.value);
    const page = Math.ceil((pageLimit.page * pageLimit.limit) / limit) - 1;
    page = page <= 1 ? 0 : page;
    setPhoneNumbers([...Array(limit).keys()]);
    setPageLimit({ page, limit });
  };

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
              {phoneNumbers.map((phoneNumber, index) => {
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
                        {isLoading ? <Skeleton /> : phoneNumber.phone_number}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap style={{ width: 70 }}>
                        {isLoading ? (
                          <Skeleton />
                        ) : (
                          <>
                            <ReactCountryFlag countryCode={phoneNumber.iso_country} /> <small>({phoneNumber.iso_country})</small>
                          </>
                        )}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      {isLoading ? (
                        <Skeleton />
                      ) : (
                        <Tooltip title="Unpark number" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter,
                              },
                              color: theme.palette.primary.main,
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
          {isLoading ? (
            <Skeleton />
          ) : (
            <TablePagination
              component="div"
              count={phoneNumberCount}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleLimitChange}
              page={pageLimit.page}
              rowsPerPage={pageLimit.limit}
              rowsPerPageOptions={[25, 50, 75, 100]}
            />
          )}
        </Box>
      </Card>
    </Card>
  );
};

export default ParkedNumbers;
