import axios from "axios";
import React, { useEffect, useState } from "react";
import { onSearchResult } from "../../helper/onSearch";
import ImageSlider from "./imageSlider";

type Props = {};

export type trendingSearchI = {
  title: string;
  url: string;
};

const TrendingSearch = (props: Props) => {
  const [trendingSearch, setTrendingSearch] = useState<any[]>([]);
  const [gifLoading, setGifLoading] = useState<boolean>(false);

  useEffect(() => {
    getTrendingSearch();
  }, []);

  const getTrendingSearch = async () => {
    try {
      setGifLoading(true);
      const API_KEY = "AIzaSyA3oVpSzmLMb69xF5uBCO6zp5j2-u9ZGxY";
      axios({
        method: "GET",
        url: `https://tenor.googleapis.com/v2/trending_terms`,
        params: { key: API_KEY, client_key: "my_test_app", country: "IN" },
      }).then(async (response) => {
        const { results } = response?.data;
        const FinalListData = await Promise.all(
          results.map(async (result: string) => {
            const response = await onSearchResult(result);
            return { title: result, url: response };
          })
        );
        setTrendingSearch(FinalListData);
        const perChunk = 5;
        const result = FinalListData.reduce((resultArray, item, index) => {
          const chunkIndex = Math.floor(index / perChunk);

          if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [];
          }
          resultArray[chunkIndex].push(item);
          return resultArray;
        }, []);
        setTrendingSearch(result);
        setGifLoading(false);
      });
    } catch (error) {}
  };
  return (
    <div className="flex flex-col w-[75rem] mt-2">
      <div className="flex justify-start ml-2 text-2xl font-bold">
        Trending Tenor Search
      </div>
      <div className="flex w-full">
        <ImageSlider slides={trendingSearch} loading={gifLoading} />
      </div>
    </div>
  );
};

export default React.memo(TrendingSearch);
