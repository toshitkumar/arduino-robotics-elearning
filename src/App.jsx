import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ModuleViewer from './components/ModuleViewer';
import ComponentExplorer from './components/ComponentExplorer';
import CircuitLab from './components/CircuitLab';
import CodePlayground from './components/CodePlayground';
import FloodSimulation from './components/FloodSimulation';
import ScenarioExercises from './components/ScenarioExercises';
import AssessmentCenter from './components/AssessmentCenter';
import PdfDocumentation from './components/PdfDocumentation';
import Resources from './components/Resources';
import StorylinePlayer from './components/StorylinePlayer';

import { 
  getStoredData, 
  markModuleComplete, 
  recordQuizScore, 
  recordCircuitBuilt, 
  recordScenarioComplete, 
  updateStudentName 
} from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeModule, setActiveModule] = useState('mod-1');
  const [userData, setUserData] = useState(() => getStoredData());

  useEffect(() => {
    // Window title
    document.title = 'Arduino Robotics & Flood-Safe Smart House | Toshit Kumar';
  }, []);

  // Handlers for updating progress
  const handleCompleteModule = (moduleId) => {
    const updated = markModuleComplete(moduleId);
    setUserData({ ...updated });
  };

  const handleSaveQuizScore = (quizId, score, total) => {
    const updated = recordQuizScore(quizId, score, total);
    setUserData({ ...updated });
  };

  const handleCircuitCompleted = (circuitId) => {
    const updated = recordCircuitBuilt(circuitId);
    setUserData({ ...updated });
  };

  const handleScenarioCompleted = (scenarioId) => {
    const updated = recordScenarioComplete(scenarioId);
    setUserData({ ...updated });
  };

  const handleStudentNameChange = (name) => {
    const updated = updateStudentName(name);
    setUserData({ ...updated });
  };

  // Progress metrics
  const totalModulesCount = 6; // 5 modules + 1 capstone
  const completedCount = userData.completedModules.length;
  const progressPercent = Math.round((completedCount / totalModulesCount) * 100);

  const progress = {
    percent: progressPercent,
    completedCount,
    totalCount: totalModulesCount,
    completedModules: userData.completedModules,
    circuitsBuilt: userData.circuitsBuilt,
    quizScores: userData.quizScores,
    scenariosCompleted: userData.scenariosCompleted,
    learningTimeMinutes: userData.learningTimeMinutes,
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Top Fixed Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progress={progress}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Responsive Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          activeModule={activeModule}
          setActiveModule={setActiveModule}
          progress={progress}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              setActiveModule={setActiveModule}
              progress={progress}
            />
          )}

          {activeTab === 'storyline-player' && <StorylinePlayer />}

          {activeTab === 'modules' && (
            <ModuleViewer
              activeModule={activeModule}
              setActiveModule={setActiveModule}
              onCompleteModule={handleCompleteModule}
              completedModules={userData.completedModules}
            />
          )}

          {activeTab === 'components' && <ComponentExplorer />}

          {activeTab === 'circuit-lab' && (
            <CircuitLab
              onCircuitCompleted={handleCircuitCompleted}
              completedCircuits={userData.circuitsBuilt}
            />
          )}

          {activeTab === 'code-playground' && <CodePlayground />}

          {activeTab === 'flood-sim' && <FloodSimulation />}

          {activeTab === 'scenarios' && (
            <ScenarioExercises
              onScenarioCompleted={handleScenarioCompleted}
              completedScenarios={userData.scenariosCompleted}
            />
          )}

          {(activeTab === 'assessment' || activeTab === 'certificate') && (
            <AssessmentCenter
              studentName={userData.studentName}
              setStudentName={handleStudentNameChange}
              quizScores={userData.quizScores}
              onSaveQuizScore={handleSaveQuizScore}
              completedModules={userData.completedModules}
            />
          )}

          {activeTab === 'documentation' && <PdfDocumentation />}

          {activeTab === 'resources' && <Resources />}
        </main>
      </div>
    </div>
  );
}
