class BaseRepository {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async create(data) {
    return this.adapter.create(data);
  }

  async find(query) {
    return this.adapter.find(query);
  }

  async findById(id) {
    return this.adapter.findById(id);
  }

  async update(id, data) {
    return this.adapter.update(id, data);
  }

  async delete(id) {
    return this.adapter.delete(id);
  }
}

export default BaseRepository;
