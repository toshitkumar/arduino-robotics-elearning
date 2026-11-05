// LocalStorage management for e-learning platform

const STORAGE_KEY = 'arduino_robotics_elearning_v1';

const defaultData = {
  studentName: 'Toshit Kumar',
  completedModules: [],
  circuitsBuilt: [],
  quizScores: {},
  scenariosCompleted: [],
  learningTimeMinutes: 45,
  lastVisitedModule: 'mod-1',
  certificateEarned: false,
  certificateDate: null,
};

export function getStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    return { ...defaultData, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Error reading localStorage', e);
    return defaultData;
  }
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving localStorage', e);
  }
}

export function markModuleComplete(moduleId) {
  const data = getStoredData();
  if (!data.completedModules.includes(moduleId)) {
    data.completedModules.push(moduleId);
    data.learningTimeMinutes += 25;
    saveStoredData(data);
  }
  return data;
}

export function recordQuizScore(quizId, score, total) {
  const data = getStoredData();
  data.quizScores[quizId] = { score, total, percentage: Math.round((score / total) * 100) };
  saveStoredData(data);
  return data;
}

export function recordCircuitBuilt(circuitId) {
  const data = getStoredData();
  if (!data.circuitsBuilt.includes(circuitId)) {
    data.circuitsBuilt.push(circuitId);
    saveStoredData(data);
  }
  return data;
}

export function recordScenarioComplete(scenarioId) {
  const data = getStoredData();
  if (!data.scenariosCompleted.includes(scenarioId)) {
    data.scenariosCompleted.push(scenarioId);
    saveStoredData(data);
  }
  return data;
}

export function updateStudentName(name) {
  const data = getStoredData();
  data.studentName = name;
  saveStoredData(data);
  return data;
}

export function resetAllProgress() {
  saveStoredData(defaultData);
  return defaultData;
}
