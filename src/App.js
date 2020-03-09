import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";

import useDebounce from "./hooks/useDebounce";
import searchStations from "./api/searchStations";

import SearchResults from "./components/SearchResults";
import SelectedStation from "./components/SelectedStation";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    html {
        box-sizing: border-box;
        font-size: 16px;
    }

    *, *:before, *:after {
        box-sizing: inherit;
    }

    body {
        margin: 0;
        padding: 0;
        font-size: 1rem;
        font-family: 'Roboto', sans-serif;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
    }

    a {
        text-decoration: none;
    }

    fieldset {
      border: none;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style: none;
    }

    button {
      user-select: none;
      appearance: none;
      font-family: inherit;
      outline: none;
      border: none;
    }
`;

const StyledApp = styled.div`
  /* margin: 1rem; */
`;

const StyledInput = styled.div`
  display: flex;
  background-color: #019cd5;
  height: 4rem;
  align-items: center;

  input {
    width: 100%;
    margin: 0 1rem;
    padding: 0 1rem;
    height: 2rem;
    border: none;
  }
`;

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsLoading(true);
      searchStations(debouncedSearchTerm).then(res => {
        setIsLoading(false);
        setResults(res);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <GlobalStyle />
      <StyledApp>
        {selectedStation ? (
          <SelectedStation
            data={selectedStation}
            setSelectedStation={setSelectedStation}
          />
        ) : (
          <>
            <StyledInput>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Sök efter station eller hållplats"
              />
            </StyledInput>
            {isLoading ? <div>Laddar...</div> : null}
            <SearchResults
              results={results}
              setSelectedStation={setSelectedStation}
            />
          </>
        )}
      </StyledApp>
    </>
  );
}

export default App;
