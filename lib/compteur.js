const { readFile } = require("../FileManager");

function countDone() {
  const tasks = readFile();
  
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed === true).length;
  const incompleteTasks = totalTasks - completedTasks;
  
  return {
    completed: completedTasks,
    incomplete: incompleteTasks,
    total: totalTasks,
    completionRate: totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(2) + '%' : '0%'
  };
}
function displayCompletionStats() {
  const stats = countDone();
  
  console.log('\n=== Task Completion Statistics ===');
  console.log(`Total tasks: ${stats.total}`);
  console.log(`Completed: ${stats.completed}`);
  console.log(`Incomplete: ${stats.incomplete}`);
  console.log(`Completion rate: ${stats.completionRate}`);
  console.log('================================\n');
  
  return stats;
}

module.exports = {
  countDone,
  displayCompletionStats
};