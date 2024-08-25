import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/en-gb";
import { NewsContext } from "../../contexts/NewsContext";
import Pagination from "./Pagination";
import Loading from "./Loading";
import summarizeArticle from './summarizeArticle'; // Import the summarization function

const NewsPage = () => {
  const { newsItems, isLoading, filteredNewsItems } = useContext(NewsContext);
  const [summaries, setSummaries] = useState({});

  // Combine and filter news items
  const allNews = [...newsItems, ...filteredNewsItems];

  // Sort news by date in descending order (latest first)
  allNews.sort((a, b) => moment(b.date).unix() - moment(a.date).unix());

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allNews.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  useEffect(() => {
    // Ensure the current page is valid after filtering or reloading data
    const validatedPage = Math.max(1, Math.min(currentPage, totalPages));
    if (currentPage !== validatedPage) {
      setCurrentPage(validatedPage);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    // Fetch summaries for all news items
    const fetchSummaries = async () => {
      const newSummaries = {};
      for (let item of allNews) {
        if (!summaries[item.title]) {
          const summary = await summarizeArticle(item.content || item.title);
          newSummaries[item.title] = summary;
        }
      }
      setSummaries((prevSummaries) => ({ ...prevSummaries, ...newSummaries }));
    };

    fetchSummaries();
  }, [allNews]);

  // Calculate the range of news items to display for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allNews.slice(startIndex, endIndex);

  // Function to handle the trade action
  const handleTrade = async (stock, action) => {
    try {
      const response = await fetch("/api/trade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock, action }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`Trade executed: ${result.message}`);
      } else {
        console.error("Trade failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error executing trade:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center mb-7">
        <h1 className="text-5xl font-bold mb-2 text-gray-900">
          <span className="text-blue-600">DEV</span>
          <span className="sliding-news">NEWS</span>
        </h1>
        <div className="w-20 h-1 bg-blue-600 mb-8"></div>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 xl:gap-8">
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden shadow-lg bg-gray-800 hover:shadow-xl transition-all duration-300"
              >
                <a
                  href={item.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-48 object-cover object-center"
                  />
                </a>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2 text-white">
                    {item.title}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-gray-400 text-md font-bold mb-4">
                      {moment(item.date).fromNow()}
                    </p>
                    <a
                      href={item.postUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-blue-500 text-blue-500 py-2 px-4 rounded-md hover:bg-blue-500 hover:text-white transition-all duration-200"
                    >
                      Read More
                    </a>
                  </div>
                  <div className="flex justify-between mt-4">
                    {/* Trade buttons */}
                  </div>
                  {/* Summary Box */}
                  <div className="mt-4 p-2 bg-gray-700 text-white rounded">
                    <p>{summaries[item.title] || "Loading summary..."}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default NewsPage;
