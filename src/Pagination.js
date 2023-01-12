import { useState, useEffect } from "react";
import paginate from "./paginate";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

const Pagination = ({ data, deleteMovie }) => {
  // pagination
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const fullList = paginate(data, perPage);
  const [pageList, setPageList] = useState(fullList);
  const getPageList = () => {
    setPageList(fullList);
  };
  const currentPage = pageList[page];

  useEffect(() => {
    getPageList();
  }, [page, perPage]);

  //   console.log(displayList);
  //   setDisplayList(fullList[0]);
  //   console.log(displayList);
  //   console.log(fullList[0]);
  //   useEffect(() => {
  //     // console.log(fullList[page]);
  //     setDisplayList(fullList[page]);
  //     // console.log(displayList);
  //   }, [page, perPage]);

  //   const handlePage = (index) => {
  //     setPage(index);
  //   };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = fullList.length - 1;
      }
      return prevPage;
    });
  };
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > fullList.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const handleChange = (e) => {
    const newPerPage = e.target.value;
    setPerPage(newPerPage);
  };

  return (
    <Wrapper>
      <div className="movies-container">
        {currentPage.map((movie, index) => {
          return (
            <MovieCard movie={movie} key={index} deleteMovie={deleteMovie} />
          );
        })}
      </div>
      <div className="page-btn-container">
        <div>
          <select
            name="perPage"
            value={perPage}
            onChange={handleChange}
            className="form-select"
          >
            {[4, 8, 12].map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </select>{" "}
          <label htmlFor="perpage" className="form-label">
            movies per page
          </label>
        </div>
        <button className="btn page-btn" onClick={prevPage}>
          <AiOutlineDoubleLeft />
        </button>{" "}
        <button className="btn page-btn" onClick={nextPage}>
          <AiOutlineDoubleRight />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-select {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .page-btn {
    border: transparent;
  }
  .form-select {
    border: solid 0.5px var(--clr-primary-4);
    border-radius: var(--radius);
    padding: 0.2rem;
    margin-right: 0.5rem;
  }
`;

export default Pagination;
