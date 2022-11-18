import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';

const withPaginatedApi = (Component, endpoint) => (props) => {
  const { data: session } = useSession();
  const address = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;
  const [isLoading, setLoading] = useState(true);
  const [pageLimit, setPageLimit] = useState({ page: 0, limit: 25 });
  const [apiData, setApiData] = useState([...Array(pageLimit.limit).keys()]);
  const [apiDataCount, setApiDataCount] = useState(0);
  const applyPagination = (data, page, limit) => data.slice(page * limit, page * limit + limit);

  const fetcher = async (url) =>
    await axios
      .get(url, {
        headers: { Authorization: `JWT ${session.accessToken}` },
      })
      .then((res) => res.data);
  const { data, error } = useSWR(address, fetcher);

  if (error) toast.error("API didn't respond. Please contact tech team");
  if (data && isLoading) {
    setLoading(false);
    setApiDataCount(data.count);
    setApiData(applyPagination(data.results, pageLimit.page, pageLimit.limit));
  }

  const handlePageChange = (_event, newPage) => {
    setLoading(true);
    setPageLimit({ ...pageLimit, page: newPage });
  };

  const handleLimitChange = (event) => {
    setLoading(true);
    const limit = parseInt(event.target.value);
    let page = Math.ceil((pageLimit.page * pageLimit.limit) / limit) - 1;
    page = page <= 1 ? 0 : page;
    setApiData([...Array(limit).keys()]);
    setPageLimit({ page, limit });
  };

  const newProps = {
    isLoading,
    setLoading,
    pageLimit,
    setPageLimit,
    apiData,
    setApiData,
    apiDataCount,
    setApiDataCount,
    handlePageChange,
    handleLimitChange,
    ...props,
  };

  return <Component {...newProps} />;
};

export default withPaginatedApi;
