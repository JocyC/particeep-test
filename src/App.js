import { useEffect, useState } from "react";
import styled from "styled-components";
import { movies$ } from "./movies";
import Pagination from "./Pagination";

function App() {
  const [movieList, setMovieList] = useState([]);
  const getMovies = async () => {
    try {
      const data = await movies$;
      setMovieList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  const handleDelete = (movie) => {
    const newList = movieList.filter((item) => item.id !== movie.id);
    setMovieList(newList);
  };

  // Get unique categories dynamically
  const allCategories = Array.from(
    new Set(
      movieList.map((item) => {
        return item.category;
      })
    )
  );
  const cateOptions = ["all", ...allCategories];
  const [options, setOptions] = useState(["all"]);

  // filter buttons
  const handleChange = (e) => {
    const opt = e.target.textContent;
    if (opt === "all") {
      setOptions(["all"]);
    } else if (options.includes(opt)) {
      setOptions([...options.filter((item) => item !== opt && item !== "all")]);
    } else {
      setOptions([...options.filter((item) => item !== "all"), opt]);
    }
  };

  // filter movies
  const filteredList = movieList.filter((item) => {
    return options.includes("all") || options.includes(item.category);
  });

  return (
    <Wrapper>
      <h2>Check out your next movie!</h2>
      <div className="filter">
        {cateOptions.map((option, index) => {
          return (
            <button
              key={index}
              className={options.includes(option) ? "btn active" : "btn"}
              onClick={handleChange}
            >
              {option}
            </button>
          );
        })}
      </div>
      <Pagination data={filteredList} deleteMovie={handleDelete} />
      {/* <div className="movies-container">
        {filteredList.map((movie, index) => {
          return (
            <MovieCard movie={movie} key={index} deleteMovie={handleDelete} />
          );
        })}
      </div> */}
      <div className="pagination"></div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  color: var(--clr-primary-2);
  .movies-container {
    margin: 0 auto;
    margin-top: 2rem;
    width: 90%;
    display: grid;
    grid-template-columns: 1fr;
  }
  @media (min-width: 769px) {
    .movies-container {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 1024px) {
    .movies-container {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  .filter {
    justify-content: space-between;
    margin-top: 2rem;
  }
  .active {
    background: var(--clr-primary-5);
    color: var(--clr-white);
  }
`;

export default App;
