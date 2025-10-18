const { readFile, modifyTask } = require("../FileManager");

function toggleTask(id) {
  const tasks = readFile();
  const task = tasks.find(t => t.id === id);
  if (!task) {
    console.error("Task not found");
    return;
  }
  modifyTask(id, { completed: !task.completed });
  console.log("Task toggled successfully!");
}


module.exports = toggleTask;
