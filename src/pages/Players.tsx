import React, { useEffect, useState } from "react";

type Player = {
  id: number;
  firstName: { default: string };
  lastName: { default: string };
  sweaterNumber: number;
  headshot: string;
  teamLogo: string;
  teamName: { default: string };
  position: string;
  value: number; // goals
  points?: number; // total points
  assists?: number; // assists points
};

const Players: React.FC = () => {
  const [stats, setStats] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"goals" | "points" | "assists">("goals");

  useEffect(() => {
    fetch("https://backend-sports-9j9z.onrender.com/api/skater-stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data.stats || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

const sortedStats = [...stats].sort((a, b) => {
  if (sortBy === "goals") return b.value - a.value;
  if (sortBy === "points") return (b.points || 0) - (a.points || 0);
  return (b.assists || 0) - (a.assists || 0); // sort by assists
});

  return (
    <div>
      <h1>Top NHL Players</h1>

      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>#</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Player</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Team</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Position</th>
            <th
              style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
              onClick={() => setSortBy("goals")}
            >
              Goals
            </th>
                        <th
              style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
              onClick={() => setSortBy("assists")}
            >
              Assists
            </th>
            <th
              style={{ border: "1px solid #ddd", padding: "8px", cursor: "pointer" }}
              onClick={() => setSortBy("points")}
            >
              Points
            </th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Headshot</th>
          </tr>
        </thead>
        <tbody>
          {sortedStats.slice(0, 20).map((player) => (
            <tr key={player.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.sweaterNumber}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {player.firstName.default} {player.lastName.default}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <img src={player.teamLogo} alt={player.firstName.default} width={75} />
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.position}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.value}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.assists}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{player.points}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <img src={player.headshot} alt={player.firstName.default} width={75} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;