import './ourteam.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NoImage from '../../Assets/noimage.png';
import Loader from '../../Components/Loader/Loader';

const OurTeam = () => {
  const [team, setTeam] = useState(null);
  const [filteredTeam, setFilteredTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [selectedFilter, setSelectedFilter] = useState('all'); // Add selectedFilter state

  useEffect(() => {
    // Simulate a delay of 2 seconds before fetching the data
    
      axios
        .get('http://localhost:8800/profile')
        .then((res) => {
          setTeam(res.data);
          setFilteredTeam(res.data); // Initialize filteredTeam with all users
          setIsLoading(false); // Data fetching is complete, set isLoading to false
        })
        .catch((err) => console.log(err));
  }, []);

  const handleFilter = (userType) => {
    if (userType === selectedFilter) {
      return; // Exit the function if the same filter is clicked again
    }
  
    setSelectedFilter(userType); // Set the selected filter
  
    if (userType === 'dev') {
      setFilteredTeam(team.filter((user) => user.user_type === 'dev'));
    } else if (userType === 'mentor') {
      setFilteredTeam(team.filter((user) => user.user_type === 'mentor'));
    } else {
      setFilteredTeam(team);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else {
    return (
      <section id="team">
        <div className="category-buttons">
        <button className={selectedFilter === 'all' ? 'category-button selected' : 'category-button'} onClick={() => handleFilter('all')}>
            All
          </button>
          <button className={selectedFilter === 'mentor' ? 'category-button selected' : 'category-button'} onClick={() => handleFilter('mentor')}>
            Mentor
          </button>
          <button className={selectedFilter === 'dev' ? 'category-button selected' : 'category-button'} onClick={() => handleFilter('dev')}>
            Dev
          </button>
        </div>
        <main className="cards_wrapper">
          {filteredTeam.map((card, index) => (
            <div className="personal_card" key={index}>
              <div className="card-head"></div>
              <div className="card-body">
                <img src={card.image.length > 3 ? card.image : NoImage} alt="hello world" />
                <div className="info-body">
                  <h1>{card.name}</h1>
                  <p>{card.position}</p>
                  <div className="buttons_wrp">
                  {card.user_type === 'mentor' ? (
                <button className="personal_button btn-2">View cv</button>
            ) : (
              <>
                <button className="personal_button btn-1" onClick={() => window.open(card.website_link, '_blank')}>
                  Website
                </button>
                <button className="personal_button btn-2">View cv</button>
              </>
            )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </section>
    );
  }
};

export default OurTeam;