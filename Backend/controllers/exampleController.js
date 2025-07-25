const Example = require("../models/Example");

exports.getExamples = async (req, res) => {
  const examples = await Example.find();
  res.json(examples);
};

exports.createExample = async (req, res) => {
  const newExample = new Example({ name: req.body.name });
  const saved = await newExample.save();
  res.status(201).json(saved);
};
