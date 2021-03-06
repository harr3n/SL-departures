import React, { useState, useEffect } from "react";
import styled from "styled-components";

import getStation from "../lib/getStation";
import getLineColor from "../lib/getLineColor";
import { ReactComponent as BusIcon } from "../icons/bus.svg";
import { ReactComponent as MetroIcon } from "../icons/metro.svg";

const StyledName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 5rem;
  background-color: #019cd5;
  color: white;
  font-size: 1.5rem;

  button {
    margin-top: 1rem;
    background-color: inherit;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const StyledDepartures = styled.ul`
  margin-top: 2rem;

  li {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 0.5px solid grey;

    .line {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .time {
      font-size: 0.8rem;
    }
  }
`;

const LineNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color};
  color: white;
  min-width: 20px;
  height: 15px;
  border-radius: 2px;
  margin: 0 0.2rem;
  font-size: 0.8rem;
  text-align: center;
`;

const Station = ({ data, setSelectedStation }) => {
  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    getStation(data.SiteId).then(res => {
      res = [...res.Metros, ...res.Buses];
      res.sort((a, b) => {
        const dateA = new Date(a.ExpectedDateTime);
        const dateB = new Date(b.ExpectedDateTime);

        return dateA - dateB;
      });

      setDepartures(res);
    });
  }, [data]);

  return (
    <div>
      <StyledName>
        {data.Name}
        <button type="button" onClick={() => setSelectedStation(null)}>
          Välj en annan station >
        </button>
      </StyledName>

      <StyledDepartures>
        {departures.map(departure => (
          <li key={departure.JourneyNumber}>
            <div className="line">
              {departure.TransportMode === "BUS" ? (
                <BusIcon style={{ height: "15px" }} />
              ) : (
                <MetroIcon style={{ height: "15px" }} />
              )}
              <LineNumber color={getLineColor(departure.GroupOfLine)}>
                {departure.LineNumber}
              </LineNumber>
              {departure.Destination}
            </div>
            <div className="time">{departure.DisplayTime}</div>
          </li>
        ))}
      </StyledDepartures>
    </div>
  );
};

export default Station;
