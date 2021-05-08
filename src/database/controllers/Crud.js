class Crud {
  constructor(model) {
    this.Model = model;
  }

  async create(obj) {
    return this.Model.create(obj);
  }

  async findById(objId) {
    return this.Model.findByPk(objId);
  }

  async list() {
    return this.Model.findAll();
  }

  async update({ id, ...obj }) {
    await this.Model.update(obj, { where: { id } });
  }

  async deleteById(objId) {
    await this.Model.destroy({ where: { id: objId }, cascade: true });
  }
}

module.exports = Crud;
