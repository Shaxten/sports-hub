const res = await axios.get("https://api-web.nhle.com/v1/skater-stats-leaders/current?categories=goals&limit=5");
const { goals, assists, points } = res.data;

// Merge them by playerId
const mergedPlayers = {};

[...goals, ...assists, ...points].forEach((p) => {
  if (!mergedPlayers[p.playerId]) mergedPlayers[p.playerId] = { ...p, goals: 0, assists: 0, points: 0 };
  if (goals.includes(p)) mergedPlayers[p.playerId].goals = p.value;
  if (assists.includes(p)) mergedPlayers[p.playerId].assists = p.value;
  if (points.includes(p)) mergedPlayers[p.playerId].points = p.value;
});

const topPlayers = Object.values(mergedPlayers)
  .sort((a,b) => b.points - a.points)
  .slice(0, 20);