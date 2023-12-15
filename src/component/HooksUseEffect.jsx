// https://randomuser.me/api/

import {useEffect, useState} from "react";
import axios from "axios";

function RandomUser({user}) {
  return (
    <div className="user">
      <img src={user.thumbnail} alt="thumbnail"/>
      <p>{user.firstName} {user.lastName}</p>
      <p>{user.email}</p>
    </div>
  );
}

function HooksUseEffect() {

  const [users, setUsers] = useState([]);

  const loadUser = async () => {
    const response = await axios.get('https://randomuser.me/api/');
    const randomUser = await response.data.results[0];
    return ({
      firstName: randomUser.name.first,
      lastName: randomUser.name.last,
      email: randomUser.email,
      thumbnail: randomUser.picture.thumbnail,
    })
  }

  useEffect(() => {
    loadUser().then(newUser => setUsers([newUser]));
  }, []);

  const appendUser = () => {
    loadUser().then(newUser =>
      setUsers((users) => [...users, newUser])
    );

  }

  return (
    <div className="container">
      <button onClick={appendUser}>Load more...</button>
      {users.length === 0 ? <p>Loading...</p> :
        <div>
          {users.map((user, i) => <RandomUser key={i} user={user}/>)}
        </div>
      }
    </div>
  );
}

export default HooksUseEffect;
