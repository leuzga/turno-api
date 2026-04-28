import UserModel from '../model/UserModel.js';

/* eslint-disable require-jsdoc */
class UserController {
  constructor() {}

  async create(req, res) {
    try {
      const user = await UserModel.create(req.body);
      if (user) {
        res.status(201).send({ status: true, id: user.id });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al crear el usuario' });
    }
  }

  async getAll(req, res) {
    try {
      const where = { ...req.query };
      const usuarios = await UserModel.findAll({ where });
      res.status(200).send(usuarios);
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar usuarios' });
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UserModel.findByPk(id);
      if (usuario) {
        res.status(200).send(usuario);
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al consultar el usuario' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const data = { ...req.body };
      delete data.id;

      const result = await UserModel.update(data, { where: { id } });
      if (result[0] === 1) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al actualizar el usuario' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const result = await UserModel.destroy({ where: { id } });
      if (result) {
        res.status(200).send({ status: true });
      } else {
        res.status(404).send({ message: 'Registro no encontrado' });
      }
    } catch (err) {
      res.status(500).send({ message: err.message || 'Error al intentar borrar el usuario' });
    }
  }
}

export default new UserController();
