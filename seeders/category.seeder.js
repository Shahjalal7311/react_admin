import { Seeder } from 'mongoose-data-seed';
import { Categorys } from '../backend/api/category/category.model';

const data = [{
  {
    title: 'shahjalal',
    slug: 'cat-03', //12345678
    description: 'test ttt',
    order: '1'
  },
  {
    title: 'shahjalal 1231314',
    slug: 'cat-04', //12345678
    description: 'test ttt dffdfdfdf',
    order: '2'
  }
}];

class CategorySeeder extends Seeder {

  async shouldRun() {
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default CategorySeeder;
