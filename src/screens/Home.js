import React from 'react';
import { useHistory } from 'react-router';
import { logUserOut } from '../apollo';

const Home = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Welcome we did it</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
