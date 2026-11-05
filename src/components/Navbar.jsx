import React from 'react';
import { Cpu, Download, Award, CheckCircle, ShieldAlert } from 'lucide-react';
import { generateCoursePDF } from '../utils/pdfGenerator';
import { playClickSound } from '../utils/audioEffects';

export default function Navbar({ activeTab, setActiveTab, progress }) {
  return (
    <header className="sticky top-0 z-40 bg-[#0f172a]/95 backdrop-blur border-b border-slate-800 px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { playClickSound(); setActiveTab('dashboard'); }}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-blue-500/20">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-base font-bold text-white tracking-wide">ArduinoRobo</h1>
              <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                FloodSafe v2.4
              </span>
            </div>
            <p className="text-xs text-slate-400">Flood-Safe Smart House Platform</p>
          </div>
        </div>

        {/* Center Progress Bar */}
        <div className="hidden md:flex items-center space-x-4 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800">
          <div className="text-xs font-medium text-slate-300 flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Progress:</span>
            <span className="text-cyan-400 font-bold">{progress.percent}%</span>
          </div>
          <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {progress.completedCount}/{progress.totalCount} Modules
          </span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2.5">
          {/* Toshit Kumar Lead Badge */}
          <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <div className="text-left">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Project Lead & Author</p>
              <p className="text-xs font-semibold text-white">Toshit Kumar</p>
            </div>
          </div>

          {/* Storyline PPT Button */}
          <button
            onClick={() => {
              playClickSound();
              setActiveTab('storyline-player');
            }}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              activeTab === 'storyline-player'
                ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                : 'bg-cyan-950/40 text-cyan-400 border-cyan-800/50 hover:bg-cyan-900/40'
            }`}
            title="Open Interactive Articulate Storyline PPT Player"
          >
            <span>Storyline PPT</span>
          </button>

          {/* Download PDF button */}
          <button
            onClick={() => {
              playClickSound();
              generateCoursePDF();
            }}
            className="flex items-center space-x-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-medium shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            title="Download Professional Printable PDF Guide"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/toshitkumar/arduino-robotics-elearning"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            title="View on GitHub"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
