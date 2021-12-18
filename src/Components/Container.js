import useFetch from "../hooks/useFetch";
import Team from "./Team";

const Container = () => {
  const { isLoading, apiData } = useFetch("api/v1/teams?sportId=1");

  return (
    <>
      <h1>Team and Player Stats</h1>
      <div className="outer-container">
        {/* display all teams */}
        {isLoading && <p>Loading...</p>}
        {apiData &&
          apiData.data.teams.map((team) => {
            return <Team key={team.id} teamObj={team} />;
          })}
      </div>
    </>
  );
};

export default Container;
