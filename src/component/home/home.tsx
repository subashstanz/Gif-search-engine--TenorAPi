import axios from "axios";
import React, { useState } from "react";
import FeaturedGIFS from "./featureGIF";
import TrendingSearch from "./trendingSearch";
import { useNavigate } from "react-router-dom";

type Props = {};

const Home = (props: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const onSearchResult = (event: any, value: string) => {
    if (event.keyCode === 13) {
      navigate(`/search/${value}`);
    }
  };
  return (
    <div className="">
      <nav className="sticky top-0 flex items-center justify-between max-w-3xl px-4 py-1 mx-auto bg-white ">
        <p
          className="mr-10 text-2xl font-semibold text-blue-700 cursor-pointer "
          onClick={() => navigate("/")}
        >
          Tenor
        </p>

        <ul className="flex items-center space-x-2 text-sm font-medium text-gray-500">
          <li className="hidden lg:block">
            <div className="inline-block px-2 py-2 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring">
              Create
            </div>
          </li>

          <li>
            <div className="inline-block px-2 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
              sign in
            </div>
          </li>
        </ul>
      </nav>
      <div className="sticky top-0 flex items-center justify-center h-[4.7rem] w-full mt-0 bg-blue-500 mb-2">
        <div className="flex w-[70.375rem] items-center sm:justify-between sm:gap-4">
          <div className="relative hidden sm:block">
            <input
              className="w-full h-10 pl-4 pr-10 text-sm bg-white border-none rounded-lg shadow-sm sm:w-[70.375rem]"
              id="search"
              type="search"
              placeholder="Search website..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => onSearchResult(e, searchValue)}
            />

            <button
              className="absolute p-2 text-gray-600 transition -translate-y-1/2 rounded-md hover:text-gray-700 bg-gray-50 top-1/2 right-1"
              type="button"
              aria-label="Submit Search"
              onClick={() => navigate(`/search/${searchValue}`)}
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
      <div className="flex items-center justify-center w-full">
        <TrendingSearch />
      </div>
      <div className="flex items-center justify-center w-full">
        <FeaturedGIFS />
      </div>
    </div>
  );
};

export default Home;
