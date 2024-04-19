import { useState, useEffect } from "react";
import axios from "axios";

function AnimeApi() {
  const [data, setData] = useState("");

  const fetchData = async () => {
    try {
      const { data } = await axios({
        method: "get",
        url: `${import.meta.env.VITE_BASE_URL}/anime`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token,
        },
      });
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {data && (
        <img
          src={data}
          alt="gif anime"
          style={{
            width: "5rem",
            height: "5rem",
          }}
        />
      )}
    </>
  );
}

export default AnimeApi;
