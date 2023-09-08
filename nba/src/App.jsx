import { useState } from 'react'
import { useEffect } from 'react';
import react from 'react'
import Home from './Pages/Home';
import './App.css'

function App() {
  const [year, setyear] = useState(2023)
  const [dataplayer, setDataplayer] = useState([]);
  const[topscorers, settopscorers] = useState([])
  const[topasist, settopasist] = useState([])
  const [toprebund, settoprebund] = useState([])

  async function fetchdata() {
    try {
      const response = await fetch(`https://nba-stats-db.herokuapp.com/api/playerdata/season/${year}`);
      const jsonData = await response.json();
      setDataplayer(jsonData.results);
      const response2 = await fetch(`https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/${year}/`)
      const jsonData2 = await response2.json();
      settopscorers(jsonData2.results);
      const response3 = await fetch(`https://nba-stats-db.herokuapp.com/api/top_assists/totals/${year}/`);
      const jsonData3 = await response3.json();
      settopasist(jsonData3.results);
      const response4 = await fetch(`https://nba-stats-db.herokuapp.com/api/top_rebounds/totals/${year}/`);
      const jsonData4 = await response4.json();
      settoprebund(jsonData4.results);

    } catch (error) {
    }
  }
  
  useEffect(() => {
    fetchdata();
  }, [year])

  const datas =[dataplayer, topscorers, topasist, toprebund]

  console.log(datas)


  const changeyear = (year) =>{
    let yr = Number(year)
    setyear(yr)
  }


  
  return (
    <>
    <div className="main">
      <Home data = {datas} yearfunc={changeyear} year={year}/>
      </div>
    </>
    
  )
}

export default App


// Points (PTS): This is one of the most crucial statistics, as it directly reflects a player's scoring ability and offensive contribution.

// Assists (AST): Assists demonstrate a player's ability to create scoring opportunities for teammates, showcasing their playmaking skills.

// Rebounds (TRB): Total rebounds (combining offensive and defensive rebounds) provide insights into a player's presence in the paint and their ability to secure possessions.

// Field Goal Percentage (FG%): Efficiency in field goal shooting is significant as it indicates how successful a player is in converting their field goal attempts.

// Three-Point Percentage (3P%): This highlights a player's proficiency in long-range shooting, which is a crucial aspect of modern basketball.

// Free Throw Percentage (FT%): Free throw accuracy is important, especially during clutch moments and when drawing fouls.

// Steals (STL): Steals indicate a player's defensive prowess and their ability to disrupt opponents.

// Blocks (BLK): Blocks showcase a player's shot-blocking ability and defensive impact near the rim.

// Minutes Played (MP): Playing time is a good indicator of a player's importance to the team and their overall fitness.

// Games Played (GP): Availability is key, and knowing how many games a player has participated in provides insight into their consistency and durability.