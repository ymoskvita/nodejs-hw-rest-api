const getAll = require('./listContacts');
const getById = require('./getById');
const add = require('./add');
const removeById = require('./removeById');
const updateById = require('./updateById');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
  getAll,
  getById,
  add,
  removeById,
  updateById,
  updateStatusContact,
};
