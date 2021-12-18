import { useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

const Team = (props) => {
  const { teamObj } = props;
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const { isLoading, apiData } = useFetch(`api/v1/teams/${teamObj.id}/roster`);

  return (
    <div className="inner-container">
      <button className="team-button" onClick={toggle}>
        <img
          className="team-logo"
          src={`https://www.mlbstatic.com/team-logos/${teamObj.id}.svg`}
          alt={`${teamObj.name} logo`}
        />
        <h2>{teamObj.name}</h2>
        {expanded ? (
          <i className="fas fa-chevron-up"></i>
        ) : (
          <i className="fas fa-chevron-down"></i>
        )}
      </button>
      {expanded && (
        <div className="team-container">
          <h3>Player Roster:</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="team-roster">
              {apiData.data.roster.map((player) => {
                return (
                  <li key={player.person.id}>
                    <Link to={`/player/${player.person.id}`}>
                      {player.person.fullName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Team;
