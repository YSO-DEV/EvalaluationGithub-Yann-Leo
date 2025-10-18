const addTask = require('../lib/addTask');
const editTask = require('../lib/editTask');
const toggleTask = require('../lib/toggleTask');
const { countDone } = require('../lib/compteur');
const fileManager = require('../FileManager');

// Mock the FileManager
jest.mock('../FileManager', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  modifyTask: jest.fn(),
  deleteTask: jest.fn(),
}));

describe('Task functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock console methods to keep test output clean
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    console.log.mockRestore();
    console.error.mockRestore();
  });

  test('addTask adds a task and calls writeFile', () => {
    const mockTasks = [];
    fileManager.readFile.mockReturnValue(mockTasks);
    fileManager.writeFile.mockReturnValue(true);

    addTask({ title: 'Test Task', completed: false });

    expect(fileManager.readFile).toHaveBeenCalled();
    expect(fileManager.writeFile).toHaveBeenCalled();
  });

  test('editTask calls modifyTask with updates', () => {
    fileManager.modifyTask.mockReturnValue(true);

    editTask(123, { title: 'Updated' });

    expect(fileManager.modifyTask).toHaveBeenCalledWith(123, { title: 'Updated' });
  });

  test('toggleTask toggles the completed status', () => {
    const tasks = [{ id: 1, title: 'Test', completed: false }];
    fileManager.readFile.mockReturnValue(tasks);
    fileManager.modifyTask.mockReturnValue(true);

    toggleTask(1);

    expect(fileManager.readFile).toHaveBeenCalled();
    expect(fileManager.modifyTask).toHaveBeenCalledWith(1, { completed: true });
  });

  test('toggleTask logs error if task not found', () => {
    fileManager.readFile.mockReturnValue([]);

    toggleTask(99);

    expect(console.error).toHaveBeenCalledWith('Task not found');
  });

  // CountDone tests
  describe('countDone function', () => {
    test('countDone returns correct counts for mixed tasks', () => {
      const mockTasks = [
        { id: 1, title: 'Task 1', completed: true },
        { id: 2, title: 'Task 2', completed: false },
        { id: 3, title: 'Task 3', completed: true }
      ];
      
      fileManager.readFile.mockReturnValue(mockTasks);

      const result = countDone();

      expect(result).toEqual({
        completed: 2,
        incomplete: 1,
        total: 3,
        completionRate: '66.67%'
      });
    });

    test('countDone returns zeros for empty task list', () => {
      fileManager.readFile.mockReturnValue([]);

      const result = countDone();

      expect(result).toEqual({
        completed: 0,
        incomplete: 0,
        total: 0,
        completionRate: '0%'
      });
    });

  });
});