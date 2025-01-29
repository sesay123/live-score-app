const apiKey = '1da2afd203c04005864f149ac22fd29e'; // Your API key
const apiUrl = 'https://api.football-data.org/v2/competitions/UCL/matches?status=LIVE'; // Corrected URL string

async function fetchLiveScore() {
  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Auth-Token': apiKey }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    
    if (data.matches.length > 0) {
      const match = data.matches[0]; // Assuming there's at least one live match
      document.getElementById('team1').innerText = match.homeTeam.name;
      document.getElementById('team2').innerText = match.awayTeam.name;
      document.getElementById('score').innerText = `${match.score.fullTime.home} - ${match.score.fullTime.away}`; // Corrected template literal syntax
    } else {
      document.getElementById('score').innerText = 'No live matches currently';
    }
  } catch (error) {
    console.error('Error fetching live score:', error);
    document.getElementById('score').innerText = 'Error loading score';
  }
}




