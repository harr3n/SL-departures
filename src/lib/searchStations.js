const searchStation = async searchTerm => {
  const res = await fetch(
    `http://localhost:8080/https://api.sl.se/api2/typeahead.json?key=${process.env.REACT_APP_SL_PLATSUPPSLAG}&searchstring=${searchTerm}`
  );
  const { ResponseData } = await res.json();

  return ResponseData;
};

export default searchStation;
