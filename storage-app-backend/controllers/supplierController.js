const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const ROLES_LIST = require('../config/roles_list');

const addSupplier = async (req, res) => {
  const errors = validationResult(req);
  try {
    const sentSupplier = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }

    const supplierExists = await client.query(
      'SELECT COUNT(*) FROM suppliers WHERE uid = $1',
      [sentSupplier.uid]
    );

    if (supplierExists.rows[0].count > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Supplier with this UUID already exists: ' + sentEmployee.uid,
        timestamp: new Date(),
      });
    }

    const newSupplier = await client.query(
      'INSERT INTO suppliers (name, uid, pdv, phone_number, contact_person, email, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [
        sentSupplier.name,
        sentSupplier.uid,
        sentSupplier.pdv,
        sentSupplier.phoneNumber,
        sentSupplier.contactPerson,
        sentSupplier.email,
        sentSupplier.startDate,
        sentSupplier.endDate,
      ]
    );

    const supplierResponse = newSupplier.rows[0];

    res.status(StatusCodes.CREATED).json({ supplierResponse });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, timestamp: new Date() });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const fetchedSuppliers = await client.query('SELECT * FROM suppliers');

    const listOfSuppliers = [...fetchedSuppliers.rows];

    res.status(StatusCodes.OK).json({ listOfSuppliers });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

const getSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  try {
    const fetchedSupplier = await client.query(
      'SELECT * FROM suppliers WHERE id = $1',
      [supplierId]
    );

    const requestedSupplier = fetchedSupplier.rows[0];

    if (!requestedSupplier) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no supplier with id: ' + supplierId });
    }

    res.status(StatusCodes.OK).json({ requestedSupplier });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};
const updateSupplier = async (req, res) => {
  const supplierId = req.params.supplierId;

  try {
    const fetchedSupplier = await client.query(
      'SELECT * FROM suppliers WHERE id = $1',
      [supplierId]
    );

    const requestedSupplier = fetchedSupplier.rows[0];

    if (!requestedSupplier) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no supplier with id: ' + supplierId });
    }

    const updateData = req.body;

    const updatedSupplier = await client.query(
      'UPDATE suppliers SET name = $1, uid = $2, pdv = $3, phone_number = $4, contact_person = $5, email = $6, start_date = $7, end_date = $8 WHERE id = $9  RETURNING *;',
      [
        updateData.name,
        updateData.uid,
        updateData.pdv,
        updateData.phoneNumber,
        updateData.contactPerson,
        updateData.email,
        updateData.startDate,
        updateData.endDate,
        supplierId,
      ]
    );

    const response = updatedSupplier.rows[0];

    res.status(StatusCodes.OK).json({ response });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

module.exports = { addSupplier, getSuppliers, getSupplier, updateSupplier };
