import React from 'react';

const Avatar = ({ username }) => {
  const getRandomColor = () => {
    const colors = ['#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33A1FF'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const avatarStyle = {
    backgroundColor: getRandomColor(),
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
  };

  const getFirstLetter = () => {
    return username ? username.charAt(0).toUpperCase() : '';
  };

  return (
    <div style={avatarStyle}>
      {getFirstLetter()}
    </div>
  );
};

export default Avatar;
