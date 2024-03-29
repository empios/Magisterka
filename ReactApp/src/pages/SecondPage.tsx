import React from 'react';
import NavBar from '../components/NavBar';
import LogLess from '../components/LogLess';
import UserPostTable from '../components/UserPostTable';
import FooterPage from '../components/Footer';

const SecondPage = () => {
  const userToken = localStorage.getItem('token');
  return (
    <div>
      <NavBar userToken={userToken} />
      {userToken ? (<UserPostTable />) : <LogLess />}
      <FooterPage />
    </div>
  );
};

export default SecondPage;
