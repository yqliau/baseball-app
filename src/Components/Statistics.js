import { useEffect, useState } from "react";

const Statistics = (props) => {
  const { statsArray } = props;
  const [relevantStatsArray, setRelevantStatsArray] = useState(null);

  // set relevant pitching/batting objects in state
  useEffect(() => {
    const newStatsArray = [];

    statsArray.forEach((typeObj) => {
      if (
        typeObj.group.displayName === "hitting" ||
        typeObj.group.displayName === "pitching"
      ) {
        const newStatsObj = {
          name: typeObj.group.displayName,
          splits: typeObj.splits,
        };

        newStatsArray.push(newStatsObj);
      }

      setRelevantStatsArray(newStatsArray);
    });
  }, [statsArray]);

  // helper function for batting stats
  const outputBatting = (seasonObj) => {
    const {
      gamesPlayed,
      atBats,
      runs,
      hits,
      doubles,
      triples,
      homeRuns,
      avg,
      obp,
      slg,
      ops,
    } = seasonObj.stat;

    return (
      <tr key={seasonObj.season + `${avg}`}>
        <td>{seasonObj.season && seasonObj.season}</td>
        <td>{seasonObj.team && seasonObj.team.name}</td>
        <td>{gamesPlayed && gamesPlayed}</td>
        <td>{atBats && atBats}</td>
        <td>{runs && runs}</td>
        <td>{hits && hits}</td>
        <td>{doubles && doubles}</td>
        <td>{triples && triples}</td>
        <td>{homeRuns && homeRuns}</td>
        <td>{avg && avg}</td>
        <td>{obp && obp}</td>
        <td>{slg && slg}</td>
        <td>{ops && ops}</td>
      </tr>
    );
  };

  // helper function for pitching stats
  const outputPitching = (seasonObj) => {
    const {
      gamesPlayed,
      gamesStarted,
      wins,
      losses,
      winPercentage,
      era,
      whip,
      inningsPitched,
      strikeOuts,
      strikeoutWalkRatio,
      hits,
      runs,
    } = seasonObj.stat;

    return (
      <tr key={seasonObj.season + `${strikeoutWalkRatio}`}>
        <td>{seasonObj.season}</td>
        <td>{seasonObj.team.name}</td>
        <td>{gamesPlayed}</td>
        <td>{gamesStarted}</td>
        <td>{wins}</td>
        <td>{losses}</td>
        <td>{winPercentage}</td>
        <td>{era}</td>
        <td>{whip}</td>
        <td>{inningsPitched}</td>
        <td>{strikeOuts}</td>
        <td>{strikeoutWalkRatio}</td>
        <td>{hits}</td>
        <td>{runs}</td>
      </tr>
    );
  };

  return (
    <>
      {relevantStatsArray &&
        relevantStatsArray.map((statsObj) => {
          return (
            <div key={`${statsObj.name}`} className="statistics">
              <h2>
                {statsObj.name === "hitting" ? "Batting" : "Pitching"}{" "}
                Statistics
              </h2>
              <table cellSpacing="0">
                {statsObj.name === "hitting" ? (
                  // table to be returned if batting
                  <tbody>
                    <tr>
                      <th>Season</th>
                      <th>Team</th>
                      <th>GP</th>
                      <th>AB</th>
                      <th>R</th>
                      <th>H</th>
                      <th>2B</th>
                      <th>3B</th>
                      <th>HR</th>
                      <th>AVG</th>
                      <th>OBP</th>
                      <th>SLG</th>
                      <th>OPS</th>
                    </tr>
                    {[...statsObj.splits].reverse().map((seasonObj) => {
                      return outputBatting(seasonObj);
                    })}
                  </tbody>
                ) : (
                  // table to be returned if pitching
                  <tbody>
                    <tr>
                      <th>Season</th>
                      <th>Team</th>
                      <th>GP</th>
                      <th>GS</th>
                      <th>W</th>
                      <th>L</th>
                      <th>W%</th>
                      <th>ERA</th>
                      <th>WHIP</th>
                      <th>IP</th>
                      <th>K</th>
                      <th>K/BB</th>
                      <th>H</th>
                      <th>R</th>
                    </tr>
                    {[...statsObj.splits].reverse().map((seasonObj) => {
                      return outputPitching(seasonObj);
                    })}
                  </tbody>
                )}
              </table>
            </div>
          );
        })}
    </>
  );
};

export default Statistics;
