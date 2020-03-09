const getLineColor = groupOfLine => {
  if (!groupOfLine || groupOfLine === "tunnelbanans röda linje") {
    return "#d71d24";
  } else if (
    groupOfLine === "blåbuss" ||
    groupOfLine === "tunnelbanans blå linje"
  ) {
    return "#019cd5";
  } else {
    return "#179d4d";
  }
};

export default getLineColor;
