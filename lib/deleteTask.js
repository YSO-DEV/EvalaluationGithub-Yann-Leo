const { deleteTask } = require("./FileManager");

function removeTask(id) {
  if (!id) {
    console.error("Invalid task ID");
    return false;
  }
  
  const success = deleteTask(id);
  
  if (success) {
    console.log("Task deleted successfully!");
    return true;
  } else {
    console.error("Failed to delete task");
    return false;
  }
}

module.exports = removeTask;