const Visit = require('../../models/visit');

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteOne,
};

async function index(req, res) {
  const visits = await Visit.find({ user: req.user._id }).sort('-date');
  res.json(visits);
}

async function create(req, res) {
  req.body.user = req.user._id;
  const visit = await Visit.create(req.body);
  res.status(201).json(visit);
}

async function show(req, res) {
  const visit = await Visit.findById(req.params.id);
  res.json(visit);
}

async function update(req, res) {
  const updatedVisit = await Visit.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedVisit);
}

async function deleteOne(req, res) {
  const deletedVisit = await Visit.findByIdAndRemove(req.params.id);
  res.status(200).json(deletedVisit);
}

