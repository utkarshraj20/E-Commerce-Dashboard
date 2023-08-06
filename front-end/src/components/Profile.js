import React from 'react';
import Card from 'react-bootstrap/Card';

const Profile = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  return (

    <div className='Profile'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfSWk_PgjeHxLl46ThEz0MIpGAx5MRV1WIHN5AoB9vOA&usqp=CAU&ec=48665701"
        className='profileimg' alt="Responsive image"></img>
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>Name : {user.name}</Card.Title>
          <br />
          <Card.Title>Email : {user.email}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;