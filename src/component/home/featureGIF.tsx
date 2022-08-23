import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { Canceler } from "axios";

type Props = {};

const FeaturedGIFS = (props: Props) => {
  const [gifList, setGifList] = useState<string[]>([]);
  const [gifTail, setGifTail] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(false);
  const observer: any = useRef();

  useEffect(() => {
    setGifList([]);
  }, []);

  useEffect(() => {
    getFeaturedGIFS();
  }, []);

  const lastGifElement = useCallback(
    (node: any) => {
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && gifTail) {
          getFeaturedGIFS(gifTail);
        }
      });
      if (node) observer.current.observe(node);
    },
    [gifTail, hasMore]
  );
  const getFeaturedGIFS = async (position?: string) => {
    try {
      let cancel: Canceler;
      const API_KEY = "AIzaSyA3oVpSzmLMb69xF5uBCO6zp5j2-u9ZGxY";
      axios({
        method: "GET",
        url: `https://tenor.googleapis.com/v2/featured?key=  ${API_KEY}&client_key=my_test_app&limit=${20}${
          position ? `&pos=${position}` : ""
        }`,
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      }).then((response) => {
        const { results, next } = response?.data;
        setGifTail(next);
        const gifs = results.map(
          (gif: { media_formats: { gif: { url: string } } }) => {
            return gif.media_formats.gif.url;
          }
        );
        const final = gifList.concat(gifs);
        setGifList(final);
        setGifTail(response.data.next);
        setHasMore(results.length > 0);
        return () => cancel();
      });
    } catch (error) {}
  };

  return (
    <div className="flex flex-col w-[75rem] mt-5">
      <div className="flex justify-start ml-2 text-2xl font-bold">
        Featured GIF
      </div>
      <div className="flex flex-row flex-wrap ml-2 justify-items-start basis-1">
        {gifList?.length
          ? gifList?.map((gif, index) => {
              if (gifList.length === index + 1) {
                return (
                  <img
                    src={gif}
                    ref={lastGifElement}
                    className="object-cover w-[16.45rem] h-[20.43rem] m-2 rounded-md"
                    alt="gif"
                    id={`${index}`}
                  />
                );
              } else {
                return (
                  <img
                    src={gif}
                    className="object-cover w-[16.45rem] h-[20.43rem] m-2 rounded-md"
                    alt="gif"
                    id={`${index}`}
                  />
                );
              }
            })
          : null}
      </div>
    </div>
  );
};

export default FeaturedGIFS;
