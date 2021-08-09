const Plant = require("../models/plant.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Plant details cannot be empty!",
    });
  }

  const plant = new Plant({
    name: req.body.name,
    plant_type: req.body.plant_type,
    planted: req.body.planted,
  });

  Plant.create(plant, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error occured while planting the plant!",
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Plant.getAll((err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(500).send({
          message: "No plant(s) data found!",
        });
      } else {
        res.status(500).send({
          message: "No plant data found!",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.findOne = (req, res) => {
  Plant.findById(req.params.plantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No plant detail found for given id ${req.params.plantId}`,
        });
      } else {
        res.status(500).send({
          message: "Error occured in finding the plant detail for the given ID",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Plant details cannot be empty",
    });
  }

  Plant.updateById(req.params.plantId, new Plant(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No plant found with id ${req.params.plantId}`,
        });
      } else {
        res.status(500).send({
          message: "Error occured in updating the plant detail",
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.delete = (req, res) => {
  Plant.remove(req.params.plantId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No plant detail found with id ${req.params.plantId}`,
        });
      } else {
        res.status(500).send({
          message: `Uable to remove the plant with id ${req.params.Id}`,
        });
      }
    } else {
      res.send({
        message: "Plant removed successfully!",
      });
    }
  });
};

exports.deleteAll = (req, res) => {
  Plant.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "No plant(s) data found to delete!",
      });
    } else {
      res.send({ message: "All plants removed successfully!" });
    }
  });
};
