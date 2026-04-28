import 'dotenv/config';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import cors from '@fastify/cors';
import { fileURLToPath } from 'url';
import path from 'path';
import db from './src/model/db.js';
import rutas from './src/routes/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fastify = Fastify({ logger: true });

await fastify.register(cors, {});
await fastify.register(fastifyStatic, { root: path.join(__dirname, 'public') });

// POST - Inserciones                C-REATE
// GET - Consulta                    R-EAD
// PUT, PATCH - Actualizaciones      U-PDATE
// DELETE - Borrado                  D-ELETE

rutas.forEach((ruta) => {
    fastify.route(ruta);
});

try {
    await db.sync();
    console.log('Base de datos sincronizada');
    
    const port = Number(process.env.PORT) || 3500;
    const host = '0.0.0.0';
    
    await fastify.listen({ port, host });
    console.log(`Server listening on http://${host}:${port}`);
} catch(err) {
    fastify.log.error(err);
    process.exit(1);
}