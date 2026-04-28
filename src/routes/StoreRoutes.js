import StoreController from '../controller/StoreController.js';

const StoreRoutes = [
  {
    method: 'GET',
    url: '/tiendas',
    handler: StoreController.getAll.bind(StoreController),
  },
  {
    method: 'GET',
    url: '/tiendas/:id',
    handler: StoreController.getOne.bind(StoreController),
  },
  {
    method: 'POST',
    url: '/tiendas',
    handler: StoreController.create.bind(StoreController),
  },
  {
    method: 'PUT',
    url: '/tiendas/:id',
    handler: StoreController.update.bind(StoreController),
  },
  {
    method: 'DELETE',
    url: '/tiendas/:id',
    handler: StoreController.delete.bind(StoreController),
  },
];

export default StoreRoutes;
