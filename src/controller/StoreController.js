import StoreModel from '../model/StoreModel.js';

/* eslint-disable require-jsdoc */
class StoreController {
  constructor() {}

  async create(req, res) {
    try {
      const store = await StoreModel.create(req.body);
      if (store) {
        res.status(201).send({ status: true, id: store.id });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al crear la tienda' });
    }
  }

  async getAll(req, res) {
    try {
      const where = req.query;
      const tiendas = await StoreModel.findAll({ where });
      res.status(200).send(tiendas);
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar tiendas' });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const store = await StoreModel.findByPk(id);
      if (store) {
        res.status(200).send(store);
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar la tienda' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;

      const result = await StoreModel.update(data, { where: { id } });
      if (result[0] === 1) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al actualizar la tienda' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await StoreModel.destroy({ where: { id } });
      if (result) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al intentar borrar una tienda' });
    }
  }
}

export default new StoreController();
