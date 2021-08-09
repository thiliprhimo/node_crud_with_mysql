const sql = require("./db.js");

const Plant = function (plant) {
  this.name = plant.name;
  this.plant_type = plant.plant_type;
  this.planted = plant.planted;
};

Plant.create = (newPlant, result) => {
  sql.query("INSERT INTO plants SET ?", newPlant, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log("New plant planted : ", { id: res.insertId, ...newPlant });
    result(null, { id: res.insertId, ...newPlant });
  });
};

Plant.findById = (plantId, result) => {
  sql.query(`SELECT * FROM plants WHERE id = ${plantId}`, (err, res) => {
    if (err) {
      console.log("error :  err");
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Requested Plant data :", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Plant.getAll = (result) => {
  sql.query("SELECT * FROM plants", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Plant(s) data :", res);
      result(null, res);
      return;
    }

    result({ kind: "not_found" }, null);

    // result(null, res);
  });
};

Plant.updateById = (id, plant, result) => {
  sql.query(
    "UPDATE plants SET name = ?, plant_type = ?, planted = ? WHERE id = ?",
    [plant.name, plant.plant_type, plant.planted, id],
    (err, res) => {
      if (err) {
        console.log("error : ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated plant details : ", { id: id, ...plant });
      result(null, { id: id, ...plant });
    }
  );
};

Plant.remove = (id, result) => {
  sql.query("DELETE FROM plants WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted plant with id : ", id);
    result(null, res);
  });
};

Plant.removeAll = (result) => {
  sql.query("DELETE FROM plants", (err, res) => {
    if (err) {
      console.log("error : ", err);
      result(err, null);
      return;
    }

    console.log(`Deleted ${res.affectedRows} plants`);
    result(null, res);
  });
};

module.exports = Plant;
