import React from "react";
import Page from "./Page";
// import

const Pagination = ({
  totalItemsCount,
  activePage,
  itemsCountPerPage,
  onChange,
}) => {
  const totalNumberOfLinks = Math.floor(totalItemsCount / itemsCountPerPage);
  const buildPages = () => {
    let pages = [];
    for (var i = 1; i <= totalNumberOfLinks; i++) {
      pages.push(
        <Page
          key={i}
          pageNumber={i}
          isActive={i === activePage}
          onClick={onChange}
        />
      );
    }

    return pages;
  };

  const builtPages = buildPages();
  return (
    <div className="flex justify-center items-center gap-2 my-4">
      {builtPages}
    </div>
  );
};

export default Pagination;
