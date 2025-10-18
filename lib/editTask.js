const { modifyTask } = require("../FileManager");

function editTask(id, updates) {
  modifyTask(id, updates);
  console.log("Task edited successfully!");
}
 
module.exports = editTask;
