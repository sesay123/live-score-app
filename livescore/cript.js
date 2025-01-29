const apiKey = '1da2afd203c04005864f149ac22fd29e'; // Your API key
const apiUrl = 'https://api.football-data.org/v2/competitions/UCL/matches?status=LIVE'; // Corrected URL string

async function fetchLiveScore() {
  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Auth-Token': apiKey }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    const team1Element = document.getElementById('team1');
    const team2Element = document.getElementById('team2');
    const scoreElement = document.getElementById('score');

    if (data.matches && data.matches.length > 0) {
      const match = data.matches[0]; // Assuming there's at least one live match
      if (team1Element) team1Element.innerText = match.homeTeam.name;
      if (team2Element) team2Element.innerText = match.awayTeam.name;
      if (scoreElement) scoreElement.innerText = `${match.score.fullTime.home} - ${match.score.fullTime.away}`; // Corrected template literal syntax
    } else {
      if (scoreElement) scoreElement.innerText = 'No live matches currently';
    }
  } catch (error) {
    console.error('Error fetching live score:', error);
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = 'Error loading score';
  }
}

// Call the function to fetch live scores
fetchLiveScore();




