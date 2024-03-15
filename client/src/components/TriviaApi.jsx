import { useState, useEffect } from "react";
import axios from "axios";

function TriviaApi() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: "http://localhost:3000/trivia",
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
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && (
        <div>
          {data.number} is {data.text}
        </div>
      )}
    </>
  );
}

export default TriviaApi;
