import axios from "axios";

export const onSearchResult = async (value: string) => {
  try {
    let imageURL = "test";
    const API_KEY = "AIzaSyA3oVpSzmLMb69xF5uBCO6zp5j2-u9ZGxY";
    const response = await axios.get(
      `https://tenor.googleapis.com/v2/search?q=${value}&key=${API_KEY}&limit=${50}`
    );
    const { results } = response?.data;
    imageURL = results[0].media_formats.gif.url;
    return imageURL;
  } catch (err) {
    return null;
  }
};
