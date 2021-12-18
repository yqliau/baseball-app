import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (endpoint) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  const baseURL = "https://statsapi.mlb.com/";

  useEffect(() => {
    setIsLoading(true);

    axios({
      url: baseURL + endpoint,
      method: "GET",
      dataResponse: "json",
    })
      .then((res) => {
        setApiData(res);
        setIsLoading(false);
      })
      .catch(() => {
        alert("An error occurred!");
        setIsLoading(false);
      });
  }, [endpoint]);

  return { isLoading, apiData };
};

export default useFetch;
