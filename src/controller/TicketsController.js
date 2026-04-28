import TicketsModel from '../model/TicketsModel.js';

/* eslint-disable require-jsdoc */
class TicketsController {
  constructor() {}

  async create(req, res) {
    try {
      const ticket = await TicketsModel.create(req.body);
      if (ticket) {
        res.status(201).send({ status: true, id: ticket.id });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al crear el ticket' });
    }
  }

  async getAll(req, res) {
    try {
      const where = req.query;
      const tickets = await TicketsModel.findAll({ where });
      res.status(200).send(tickets);
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar tickets' });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const ticket = await TicketsModel.findByPk(id);
      if (ticket) {
        res.status(200).send(ticket);
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar el ticket' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;

      const result = await TicketsModel.update(data, { where: { id } });
      if (result[0] === 1) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al actualizar el ticket' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await TicketsModel.destroy({ where: { id } });
      if (result) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al intentar borrar el ticket' });
    }
  }
}

export default new TicketsController();
