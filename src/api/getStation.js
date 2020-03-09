const getStation = async siteId => {
  const res = await fetch(
    `http://localhost:8080/https://api.sl.se/api2/realtimedeparturesV4.json?key=${process.env.REACT_APP_SL_REALTID}&siteid=${siteId}&timewindow=60`
  );
  const { ResponseData } = await res.json();

  return ResponseData;
};

export default getStation;
