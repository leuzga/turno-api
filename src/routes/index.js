import UserRoutes from './UserRoutes.js';
import StoreRoutes from './StoreRoutes.js';
import TicketsRoutes from './TicketsRoutes.js';

const rutas = [
  ...UserRoutes,
  ...StoreRoutes,
  ...TicketsRoutes,
];

export default rutas;
