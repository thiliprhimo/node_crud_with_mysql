module.exports = (app) => {
  const plants = require("../controllers/plants.controller.js");

  app.post("/plants", plants.create);

  app.get("/plants", plants.findAll);

  app.get("/plants/:plantId", plants.findOne);

  app.put("/plants/:plantId", plants.update);

  app.delete("/plants/:plantId", plants.delete);

  app.delete("/plants", plants.deleteAll);
};
