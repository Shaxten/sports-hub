import React, { useEffect, useState } from "react";

type Team = {
  id: number;
  teamAbbrev: { default: string };
  teamLogo: string;
  wins: number;
  losses: number;
  otLosses: number;
  points: number;
  divisionName: string;
};

const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch("https://backend-sports-9j9z.onrender.com/api/standings"); // proxy via backend
        const data = await res.json();

        const allTeams: Team[] = data.standings?.map((team: Team) => ({
          id: team.teamAbbrev.default, // use abbrev as unique key
          teamLogo: team.teamLogo,
          wins: team.wins ?? 0,
          losses: team.losses ?? 0,
          otLosses: team.otLosses ?? 0,
          points: team.points ?? 0,
          divisionName: team.divisionName ?? "Unknown",
        })) || [];

        setTeams(allTeams);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  if (loading) return <p>Loading...</p>;

  // Group by division
  const divisions = Array.from(new Set(teams.map(t => t.divisionName)));

  return (
    <div>
      <h1>NHL Teams Standings</h1>
      {divisions.map(division => {
        const divisionTeams = teams
          .filter(t => t.divisionName === division)
          .sort((a, b) => b.points - a.points);

        return (
          <div key={division} style={{ marginBottom: "30px" }}>
            <h2>{division}</h2>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Logo</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Wins</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Losses</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>OT Losses</th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>Points</th>
                </tr>
              </thead>
              <tbody>
                {divisionTeams.map(team => (
                  <tr key={team.id}>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                      <img src={team.teamLogo} width={75} />
                    </td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{team.wins}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{team.losses}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{team.otLosses}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px" }}>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Teams;