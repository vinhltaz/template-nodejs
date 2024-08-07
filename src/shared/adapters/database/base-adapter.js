class BaseAdapter {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    return this.model.create(data);
  }

  async find(query) {
    return this.model.find(query);
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

export default BaseAdapter;
