const fs = require("fs");
const path = require("path");

// Ensure data directory exists
const dataDir = path.resolve(__dirname, "./data");
const taskPath = path.resolve(dataDir, "task.json");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

function readFile() {
  try {
    // Check if file exists
    if (!fs.existsSync(taskPath)) {
      return [];
    }
    
    const data = fs.readFileSync(taskPath, "utf8");
    
    // Handle empty file
    if (!data.trim()) {
      return [];
    }
    
    const parsed = JSON.parse(data);
    
    // Ensure we always return an array
    if (Array.isArray(parsed)) {
      return parsed;
    } else if (typeof parsed === 'object' && parsed !== null) {
      // If it's a single object, wrap it in an array
      return [parsed];
    } else {
      // For any other case, return empty array
      console.warn("Invalid data format in task.json, returning empty array");
      return [];
    }
  } catch (error) {
    console.error("Error reading file:", error);
    return []; // Always return an array, even on error
  }
}

function writeFile(data) {
  try {
    if (!Array.isArray(data)) {
      throw new Error("Data must be an array");
    }
    fs.writeFileSync(taskPath, JSON.stringify(data, null, 4), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing file:", err);
    return false;
  }
}

function deleteTask(id) {
  const tasks = readFile().filter(task => task.id !== id);
  return writeFile(tasks);
}

function modifyTask(id, updates) {
  const tasks = readFile().map(task => 
    task.id === id ? { ...task, ...updates } : task
  );
  return writeFile(tasks);
}

module.exports = {
  readFile,
  writeFile,
  deleteTask,
  modifyTask
};