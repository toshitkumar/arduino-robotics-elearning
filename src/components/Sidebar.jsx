import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Cpu, 
  Cable, 
  Terminal, 
  Waves, 
  CheckSquare, 
  FileText, 
  FolderDown, 
  ChevronRight,
  Shield,
  Award
} from 'lucide-react';
import { playClickSound } from '../utils/audioEffects';

export default function Sidebar({ activeTab, setActiveTab, activeModule, setActiveModule, progress }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'modules', label: 'Learning Modules', icon: BookOpen, badge: '5+1' },
    { id: 'components', label: 'Component Explorer', icon: Cpu },
    { id: 'circuit-lab', label: 'Circuit Lab (Wiring)', icon: Cable },
    { id: 'code-playground', label: 'Code Playground', icon: Terminal },
    { id: 'flood-sim', label: 'Flood Simulation', icon: Waves, highlight: true },
    { id: 'scenarios', label: 'Scenario Exercises', icon: Shield, badge: '5' },
    { id: 'assessment', label: 'Assessment Center', icon: CheckSquare, badge: '60 MCQs' },
    { id: 'certificate', label: 'Course Certificate', icon: Award },
    { id: 'documentation', label: 'PDF Guide & Specs', icon: FileText },
    { id: 'resources', label: 'Resources & BOM', icon: FolderDown },
  ];

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col justify-between shrink-0 min-h-[calc(100vh-61px)]">
      {/* Navigation Links */}
      <div className="p-4 space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Main Menu</p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : item.highlight
                      ? 'text-cyan-400 bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-800/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Module Track List */}
        <div className="pt-2 border-t border-slate-800/60">
          <p className="px-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Modules Quick Jump</p>
          <div className="space-y-1">
            {[
              { id: 'mod-1', name: '01 Arduino UNO' },
              { id: 'mod-2', name: '02 Servo Motor' },
              { id: 'mod-3', name: '03 L298N Motor Driver' },
              { id: 'mod-4', name: '04 HC-SR04 Ultrasonic' },
              { id: 'mod-5', name: '05 Rain Sensor' },
              { id: 'capstone', name: '06 Capstone: Flood House', special: true },
            ].map((m) => {
              const isCompleted = progress.completedModules.includes(m.id);
              const isCurrent = activeTab === 'modules' && activeModule === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    playClickSound();
                    setActiveTab('modules');
                    setActiveModule(m.id);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                    isCurrent
                      ? 'bg-slate-800 text-cyan-400 font-semibold'
                      : m.special
                      ? 'text-amber-400 hover:bg-amber-950/20'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-emerald-400' : isCurrent ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                    <span className="truncate">{m.name}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Developer Credit Footer Card */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md">
            TK
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">Toshit Kumar</h4>
            <p className="text-[11px] text-slate-400 truncate">Course Author & Engineer</p>
          </div>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
          <span>STEM Robotics Edition</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
          </span>
        </div>
      </div>
    </aside>
  );
}
