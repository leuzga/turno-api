import TicketsController from '../controller/TicketsController.js';

const TicketsRoutes = [
  {
    method: 'GET',
    url: '/tickets',
    handler: TicketsController.getAll.bind(TicketsController),
  },
  {
    method: 'GET',
    url: '/tickets/:id',
    handler: TicketsController.getOne.bind(TicketsController),
  },
  {
    method: 'POST',
    url: '/tickets',
    handler: TicketsController.create.bind(TicketsController),
  },
  {
    method: 'PUT',
    url: '/tickets/:id',
    handler: TicketsController.update.bind(TicketsController),
  },
  {
    method: 'DELETE',
    url: '/tickets/:id',
    handler: TicketsController.delete.bind(TicketsController),
  },
];

export default TicketsRoutes;
