import { useState, useEffect } from "react";
import axios from "axios";

const TriviaApi = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/trivia`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading Trivia...</div>;
  }

  return (
    <div className="api-content">
      {data && (
        <div>
          {data.number} is {data.text}
        </div>
      )}
    </div>
  );
};

export default TriviaApi;
