import { Seeder } from 'mongoose-data-seed';
import { Users } from '../backend/api/users/users.controller';

const data = [{
  {
    username: 'shahjalal'
    email: 'mdjalal2012@gmail.com', //12345678
    password: '$2b$10$WhDP3lO5avHB1vXaC.dpnejHso87gVAS.Hxz9iwJN6TZ0b95vV/IW',
  },
  {
    username: 'shahjalal7311'
    email: 'developers@reivo.co.jp',
    password: '$2b$10$WhDP3lO5avHB1vXaC.dpnejHso87gVAS.Hxz9iwJN6TZ0b95vV/IW'
  }
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Users.createUser(data);
  }
}

export default UsersSeeder;
