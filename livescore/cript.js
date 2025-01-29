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

// Fetch live scores every 30 seconds
setInterval(fetchLiveScore, 30000);
fetchLiveScore();

// Fetch live scores every 30 seconds
setInterval(fetchLiveScore, 30000);
fetchLiveScore();

function countDownToNextMatch(matchTime) {
    const matchDate = new Date(matchTime);
    const now = new Date();
    const timeRemaining = matchDate - now;

    if (timeRemaining > 0) {
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById('score').innerText = `Next match in: ${hours} hours ${minutes} minutes`; // Corrected string interpolation
    } else {
        document.getElementById('score').innerText = 'Match live now!';
    }
}

// Example: Run countDownToNextMatch when a match is scheduled.
countDownToNextMatch('2025-02-14T21:00:00Z'); // Set this to the time of the next match.
