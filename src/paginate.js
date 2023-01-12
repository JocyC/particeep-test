const paginate = (movies, perPage) => {
  const pages = Math.ceil(movies.length / perPage);
  const displayList = Array.from({ length: pages }, (_, index) => {
    const start = index * perPage;
    return movies.slice(start, start + perPage);
  });
  return displayList;
};

export default paginate;
