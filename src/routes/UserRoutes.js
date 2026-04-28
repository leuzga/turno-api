import UserController from '../controller/UserController.js';

const UserRoutes = [
  {
    method: 'GET',
    url: '/usuarios',
    handler: UserController.getAll.bind(UserController),
  },
  {
    method: 'GET',
    url: '/usuarios/:id',
    handler: UserController.getOne.bind(UserController),
  },
  {
    method: 'POST',
    url: '/usuarios',
    handler: UserController.create.bind(UserController),
  },
  {
    method: 'PUT',
    url: '/usuarios/:id',
    handler: UserController.update.bind(UserController),
  },
  {
    method: 'DELETE',
    url: '/usuarios/:id',
    handler: UserController.delete.bind(UserController),
  },
];

export default UserRoutes;
