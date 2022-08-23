import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const Search = (props: Props) => {
  const navigate = useNavigate();
  let { searchquery } = useParams();
  const [searchValue, setSearchValue] = useState<string>(searchquery || "");
  const [searchImageList, setSearchImageList] = useState<string[]>([]);
  const [gifLoading, setGifLoading] = useState<boolean>(false);

  useEffect(() => {
    if (searchquery) {
      onSearchResult(searchquery);
    }
  }, [searchquery]);

  const onSearchResult = async (value: string) => {
    try {
      setGifLoading(true);
      const API_KEY = "AIzaSyA3oVpSzmLMb69xF5uBCO6zp5j2-u9ZGxY";
      axios({
        method: "GET",
        url: `https://tenor.googleapis.com/v2/search`,
        params: {
          key: API_KEY,
          client_key: "my_test_app",
          q: value,
          country: "IN",
        },
      }).then((response) => {
        const { results } = response?.data;
        const data = results.map(
          (item: { media_formats: { gif: { url: string } } }) => {
            return item.media_formats.gif.url;
          }
        );
        setSearchImageList(data);
        setGifLoading(false);
      });
    } catch (err) {
      return null;
    }
  };

  const onSearch = (event: any, value: string) => {
    if (event.keyCode === 13) {
      onSearchResult(value);
      navigate(`/search/${value}`);
    }
  };
  return (
    <div className="">
      <nav className="flex items-center justify-between max-w-3xl px-4 py-1 mx-auto ">
        <p
          className="font-semibold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Tenor
        </p>

        <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <li className="hidden lg:block">
            <div className="inline-block px-3 py-3 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring">
              Create
            </div>
          </li>

          <li>
            <div className="inline-block px-3 py-3 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
              sign in
            </div>
          </li>
        </ul>
      </nav>
      <div className=" flex items-center justify-center h-[4.7rem] w-full bg-blue-500 ">
        <div className="flex w-[70.375rem] items-center sm:justify-between sm:gap-4">
          <div className="relative hidden sm:block">
            <input
              className="w-full h-10 pl-4 pr-10 text-sm bg-white border-none rounded-lg shadow-sm sm:w-[70.375rem]"
              id="search"
              type="search"
              placeholder="Search website..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => onSearch(e, searchValue)}
            />

            <button
              className="absolute p-2 text-gray-600 transition -translate-y-1/2 rounded-md hover:text-gray-700 bg-gray-50 top-1/2 right-1"
              type="button"
              aria-label="Submit Search"
              onClick={() => onSearchResult(searchValue)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 font-bold">GIFS</div>
      <div className="flex flex-row flex-wrap my-3 ml-3 justify-items-start basis-1">
        {searchImageList?.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row flex-wrap m-2 justify-items-start basis-1"
            >
              <div className="w-[16.45rem] h-[20.43rem]">
                {gifLoading ? (
                  <div className="w-[16.45rem] h-[20.43rem] bg-gray-100 rounded-tr rounded-tl animate-pulse"></div>
                ) : (
                  <img
                    src={item}
                    className="object-cover w-[16.45rem] h-[20.43rem] m-2 rounded-md"
                    alt="gif"
                    id={`${index}`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
