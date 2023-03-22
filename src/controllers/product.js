import Joi from "joi";
import Product from "../models/product";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
});

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    return res.status(200).json({
      message: "tao san pham thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.json({
        message: error.details[0].message,
      });
    }
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      message: "xoa san pham thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      res.json({
        message: error.details[0].message,
      });
    }
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json({
      message: "update san pham thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
