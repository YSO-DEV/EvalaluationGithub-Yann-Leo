const { readFile, writeFile } = require("../FileManager");

function addTask(newTask) {
  const tasks = readFile();
  const taskWithId = { id: Date.now(), ...newTask };
  tasks.push(taskWithId);
  writeFile(tasks);
  console.log("Task added successfully!");
}

module.exports = addTask;
