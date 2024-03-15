import axios from "axios";
import { useEffect, useState } from "react";

// bikin di server
function Api() {
  const [quote, setQuote] = useState();
  async function anime() {
    const options = {
      method: "GET",
      url: "https://any-anime.p.rapidapi.com/v1/anime/gif/1",
      headers: {
        "X-RapidAPI-Key": "065bb865fbmsh9869ccb03e0d80ap1fc860jsn903bdbd50c81",
        "X-RapidAPI-Host": "any-anime.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setQuote(response.data.images[0]);
    } catch (error) {
      console.error(error);
    }
  }

  //   async function fetchData() {
  //     try {
  //       const { data } = await axios({
  //         method: "get",
  //         url: "https://animechan.xyz/api/random/anime?title=Attack%20on%20Titan",
  //       });
  //       setQuote(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  useEffect(() => {
    anime();
  });
  return (
    <>
      <img src={quote} alt="" />
    </>
  );
}

export default Api;
