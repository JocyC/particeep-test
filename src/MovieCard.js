import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { HiThumbUp, HiThumbDown } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";
import styled from "styled-components";
import { useState } from "react";

const MovieCart = ({ movie, deleteMovie }) => {
  const { title, category, dislikes, likes, id } = movie;
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  return (
    <Wrapper>
      <h4>{title}</h4>
      <p>Category : {category}</p>
      <div className="btn-container">
        <div>
          <button
            className="review-btn review-good"
            onClick={() => {
              setLike(!like);
            }}
          >
            {like ? <HiThumbUp /> : <FiThumbsUp />}
          </button>
          <span>{likes}</span>
        </div>
        <div>
          <button
            className="review-btn review-bad"
            onClick={() => {
              setDislike(!dislike);
            }}
          >
            {dislike ? <HiThumbDown /> : <FiThumbsDown />}
          </button>
          <span>{dislikes}</span>
        </div>
        <div>
          <button
            className="review-btn review-good"
            onClick={() => deleteMovie(movie)}
          >
            <BsTrash />
          </button>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.article`
  justify-self: center;
  align-self: center;

  margin: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: var(--radius);
  border: solid 2px var(--clr-grey-8);
  width: 20rem;
  display: grid;
  grid-template-rows: auto;
  text-align: center;
  .review-btn {
    background: transparent;
    border: transparent;
    border-radius: var(--radius);
    text-transform: uppercase;
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    font-weight: 400;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
  }
  .review-btn:hover {
    font-size: 1rem;
  }
  .review-good {
    color: var(--clr-red-dark);
  }
  .btn-container {
    max-width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-left: 1rem;
  }
`;
export default MovieCart;
