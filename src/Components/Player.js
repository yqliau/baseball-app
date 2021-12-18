import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import Statistics from "./Statistics";

const Player = () => {
  const { playerID } = useParams();
  const { isLoading, apiData } = useFetch(
    `/api/v1/people/${playerID}?hydrate=stats(group=[hitting,pitching,fielding],type=[yearByYear])`
  );

  return (
    <div className="player-outer-container">
      <div className="player-inner-container">
        {/* contains player picture and general information */}
        <div className="player-general-info">
          <div className="headshot-container">
            <img
              src={`https://content.mlb.com/images/headshots/current/60x60/${playerID}@4x.png`}
              alt="Headshot"
            />
          </div>
          {isLoading && <p>Loading...</p>}
          {apiData && (
            <ul className="player-info">
              <li>
                <h2>{apiData.data.people[0].fullName}</h2>
              </li>
              <li>
                <span className="bolded">Age:</span>{" "}
                {apiData.data.people[0].currentAge}
              </li>
              <li>
                <span className="bolded">Height:</span>{" "}
                {apiData.data.people[0].height}
              </li>
              <li>
                <span className="bolded">Weight:</span>{" "}
                {apiData.data.people[0].weight} lbs
              </li>
            </ul>
          )}
        </div>

        {/* contains statistics */}
        {apiData && apiData.data.people[0].stats ? (
          <Statistics statsArray={apiData.data.people[0].stats} />
        ) : (
          <p>Sorry, no stats are available for this player.</p>
        )}

        {/* back button */}
        <Link to={"/"}>
          <i className="fas fa-chevron-left"> Back</i>
        </Link>
      </div>
    </div>
  );
};

export default Player;
