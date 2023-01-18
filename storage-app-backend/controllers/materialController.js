const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const { validationResult } = require('express-validator');

const addMaterial = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }

  try {
    const sentMaterial = req.body;

    const newMaterial = await client.query(
      'INSERT INTO materials (name, amount, min_amount, price, unit_of_measure, used, supplier_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        sentMaterial.name,
        sentMaterial.amount,
        sentMaterial.minAmount,
        sentMaterial.price,
        sentMaterial.unitOfMeasure,
        sentMaterial.used,
        sentMaterial.supplierId,
      ]
    );

    const materialResponse = newMaterial.rows[0];

    res.status(StatusCodes.CREATED).json({ materialResponse });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, timestamp: new Date() });
  }
};

const getMaterials = async (req, res) => {
  try {
    const fetchedMaterials = await client.query('SELECT * FROM materials');

    const listOfMaterials = [...fetchedMaterials.rows];

    res.status(StatusCodes.OK).json({ listOfMaterials });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

const getMaterial = async (req, res) => {
  const materialId = req.params.materialId;

  try {
    const fetchedMaterial = await client.query(
      'SELECT * FROM materials WHERE id = $1',
      [materialId]
    );

    const requestedMaterial = fetchedMaterial.rows[0];

    if (!requestedMaterial) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no material with id: ' + materialId });
    }

    res.status(StatusCodes.OK).json({ requestedMaterial });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

const updateMaterial = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(StatusCodes.UNPROCESSABLE_ENTITY)
      .json({ errors: errors.array() });
  }

  const materialId = req.params.materialId;

  try {
    const fetchedMaterials = await client.query(
      'SELECT * FROM materials WHERE id = $1',
      [materialId]
    );

    const requestedMaterials = fetchedMaterials.rows[0];

    if (!requestedMaterials) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no material with id: ' + materialId });
    }

    const updateData = req.body;

    const updatedMaterial = await client.query(
      'UPDATE materials SET name = $1, amount = $2, min_amount = $3, price = $4, unit_of_measure = $5, used = $6, supplier_id = $7 WHERE id = $8  RETURNING *;',
      [
        updateData.name,
        updateData.amount,
        updateData.minAmount,
        updateData.price,
        updateData.unitOfMeasure,
        updateData.used,
        updateData.supplierId,
        materialId,
      ]
    );

    const response = updatedMaterial.rows[0];

    res.status(StatusCodes.OK).json({ response });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

module.exports = { addMaterial, getMaterials, getMaterial, updateMaterial };
