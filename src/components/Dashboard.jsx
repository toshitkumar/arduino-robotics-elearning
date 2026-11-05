import React from 'react';
import { 
  BookOpen, 
  Code, 
  Activity, 
  Clock, 
  Play, 
  ArrowRight, 
  Waves, 
  Cable, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  Cpu,
  RotateCw,
  Gauge,
  CloudRain
} from 'lucide-react';
import { MODULES, CAPSTONE_PROJECT } from '../data/courseData';
import { generateCoursePDF } from '../utils/pdfGenerator';
import { playClickSound } from '../utils/audioEffects';

export default function Dashboard({ setActiveTab, setActiveModule, progress }) {
  const avgQuizScore = Object.values(progress.quizScores).length > 0
    ? Math.round(
        Object.values(progress.quizScores).reduce((acc, curr) => acc + curr.percentage, 0) /
        Object.values(progress.quizScores).length
      )
    : 85;

  const cards = [
    {
      title: 'Lessons Completed',
      value: `${progress.completedModules.length} / 6`,
      change: '5 this week',
      icon: BookOpen,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
    },
    {
      title: 'Circuits Built',
      value: `${progress.circuitsBuilt.length || 5}`,
      change: '3 this week',
      icon: Code,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      title: 'Avg Quiz Score',
      value: `${avgQuizScore}%`,
      change: 'High Proficiency',
      icon: Activity,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Learning Time',
      value: `${Math.round(progress.learningTimeMinutes / 60 * 10) / 10}h`,
      change: 'Active Session',
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  const moduleCards = [
    ...MODULES.map((m) => ({
      id: m.id,
      num: m.num,
      title: m.title,
      desc: m.tagline,
      level: m.num === '01' ? 'Beginner' : m.num === '02' || m.num === '04' ? 'Intermediate' : 'Advanced',
      duration: m.estimatedTime,
      isCapstone: false,
    })),
    {
      id: 'capstone',
      num: '06',
      title: CAPSTONE_PROJECT.title,
      desc: CAPSTONE_PROJECT.subtitle,
      level: 'Master Project',
      duration: '90 mins',
      isCapstone: true,
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950/40 to-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs font-semibold text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Robotics & Embedded Systems Curriculum
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome to Arduino Robotics & Flood-Safe Smart House
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your interactive laboratory for mastering the Arduino UNO, actuator kinematics, ultrasonic acoustic depth telemetry, and automated mechatronic flood defense. Built with love by <strong className="text-slate-200">Toshit Kumar</strong>.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('flood-sim');
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Waves className="w-4 h-4" />
              <span>Launch Flood Sim</span>
            </button>
            <button
              onClick={() => {
                playClickSound();
                generateCoursePDF();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-medium border border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="bg-[#111827] border border-slate-800 hover:border-slate-700 p-5 rounded-2xl shadow-sm transition-all flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs text-slate-400 font-medium">{c.title}</p>
                <p className="text-2xl font-bold text-white">{c.value}</p>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span>↑</span> {c.change}
                </p>
              </div>
              <div className={`p-3 rounded-xl ${c.bgColor}`}>
                <Icon className={`w-6 h-6 ${c.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Modules & Sidebar Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Modules Track */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Course Curriculum Tracks
            </h3>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('modules');
              }}
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
            >
              View All Modules →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {moduleCards.map((m) => {
              const isCompleted = progress.completedModules.includes(m.id);
              const progressPct = isCompleted ? 100 : m.id === 'mod-1' ? 65 : m.id === 'mod-2' ? 30 : 0;
              return (
                <div
                  key={m.id}
                  className={`bg-[#111827] border ${
                    m.isCapstone ? 'border-amber-500/30 bg-gradient-to-b from-slate-900 to-amber-950/10' : 'border-slate-800 hover:border-slate-700'
                  } p-5 rounded-2xl flex flex-col justify-between transition-all group`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        m.isCapstone 
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : m.level === 'Beginner'
                          ? 'bg-blue-500/10 text-blue-400'
                          : m.level === 'Intermediate'
                          ? 'bg-purple-500/10 text-purple-400'
                          : 'bg-emerald-500/10 text-emerald-400'
                      }`}>
                        {m.level}
                      </span>
                      <span className="text-slate-400 font-mono">{m.duration}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {m.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {m.desc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Progress</span>
                        <span className="font-semibold text-white">{progressPct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-blue-500'}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      playClickSound();
                      setActiveTab('modules');
                      setActiveModule(m.id);
                    }}
                    className={`mt-4 w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      m.isCapstone
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-md shadow-amber-500/20'
                        : isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                    }`}
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Continue Learning'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Learning Progress Bar Chart Simulation */}
          <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Competency Mastery Distribution
            </h4>
            <div className="grid grid-cols-6 gap-3 items-end h-32 pt-4 px-2">
              {[
                { name: 'UNO', height: '80%', color: 'bg-blue-500' },
                { name: 'Servo', height: '65%', color: 'bg-indigo-500' },
                { name: 'L298N', height: '90%', color: 'bg-cyan-500' },
                { name: 'HC-SR04', height: '75%', color: 'bg-purple-500' },
                { name: 'Rain', height: '70%', color: 'bg-teal-500' },
                { name: 'Capstone', height: '85%', color: 'bg-amber-500' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div
                    className={`w-full rounded-t-lg transition-all duration-700 ${bar.color}`}
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">{bar.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Continue Learning & Suggested Activities */}
        <div className="space-y-6">
          {/* Continue Learning Card */}
          <div className="bg-gradient-to-b from-[#1e293b] to-[#111827] border border-blue-500/20 p-6 rounded-2xl shadow-lg space-y-4">
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Active Workspace</p>
            <div className="flex items-start gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                <Waves className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Flood-Safe Smart House</h4>
                <p className="text-xs text-slate-400 mt-0.5">Capstone Mechatronics Platform</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Test the full physics simulation featuring rising floodwater, automatic lead-screw vertical elevation, and audio alarm buzzer.
            </p>
            <button
              onClick={() => {
                playClickSound();
                setActiveTab('flood-sim');
              }}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Enter Interactive Simulator</span>
            </button>
          </div>

          {/* Suggested Activities */}
          <div className="bg-[#111827] border border-slate-800 p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Suggested Activities</h4>
            <div className="space-y-2">
              {[
                {
                  title: 'Circuit Wiring Challenge',
                  desc: 'Wire the L298N common ground and ultrasonic trigger',
                  tab: 'circuit-lab',
                  icon: Cable,
                  color: 'text-cyan-400',
                  bg: 'bg-cyan-500/10',
                },
                {
                  title: 'Scenario Decision Drill',
                  desc: 'Solve 5 real-world flood telemetry decision trees',
                  tab: 'scenarios',
                  icon: ShieldCheck,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-500/10',
                },
                {
                  title: 'Pin Identification Quiz',
                  desc: 'Test your memory of UNO digital & PWM pins',
                  tab: 'assessment',
                  icon: Cpu,
                  color: 'text-purple-400',
                  bg: 'bg-purple-500/10',
                },
                {
                  title: 'Interactive Code Playground',
                  desc: 'Inspect line-by-line Arduino C++ explanations',
                  tab: 'code-playground',
                  icon: Code,
                  color: 'text-amber-400',
                  bg: 'bg-amber-500/10',
                },
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div
                    key={i}
                    onClick={() => {
                      playClickSound();
                      setActiveTab(act.tab);
                    }}
                    className="p-3 bg-slate-900/60 hover:bg-slate-800/80 rounded-xl border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <div className={`p-2 rounded-lg ${act.bg} ${act.color} shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                        {act.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">{act.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
