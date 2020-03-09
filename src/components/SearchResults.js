import React from "react";
import styled from "styled-components";

const StyledSearchResults = styled.ul`
  margin-top: 2rem;

  li {
    width: 100%;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
    border-bottom: 0.5px solid grey;
  }
`;

const SearchResults = ({ results, setSelectedStation }) => {
  return (
    <StyledSearchResults>
      {results.map(result => (
        <li key={result.Name} onClick={() => setSelectedStation(result)}>
          {result.Name}
        </li>
      ))}
    </StyledSearchResults>
  );
};

export default SearchResults;
