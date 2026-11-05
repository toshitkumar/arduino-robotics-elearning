import React from 'react';
import { FolderDown, Download, FileCode, CheckCircle, ExternalLink, Cpu, Layers } from 'lucide-react';
import { CAPSTONE_PROJECT } from '../data/courseData';
import { generateCoursePDF } from '../utils/pdfGenerator';
import { playClickSound } from '../utils/audioEffects';

export default function Resources() {
  const downloadSketch = (filename, content) => {
    playClickSound();
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FolderDown className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Project Resources & Bill of Materials</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Download production Arduino sketches, inspect hardware BOM specs, and access reference schematics.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            generateCoursePDF();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer shadow-md shadow-blue-500/20"
        >
          <Download className="w-4 h-4" />
          <span>Full PDF Documentation</span>
        </button>
      </div>

      {/* Bill of Materials (BOM) Table */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          Complete Hardware Bill of Materials (BOM)
        </h3>
        <p className="text-xs text-slate-400">
          Required components to assemble a fully functioning scale prototype of the Flood-Safe Smart House.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4">Qty</th>
                <th className="py-3 px-4">Engineering Role in Lifting System</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {CAPSTONE_PROJECT.bom.map((b, i) => (
                <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-white">{b.item}</td>
                  <td className="py-2.5 px-4 font-mono text-cyan-400">{b.qty}</td>
                  <td className="py-2.5 px-4 text-slate-300">{b.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Source Code Downloads */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          Standalone Arduino Sketch Downloads (.ino)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'FloodSafe_Master_System.ino', desc: 'Full automated lifting platform state machine with limit interlocks', code: CAPSTONE_PROJECT.arduinoSourceCode },
            { name: 'HC_SR04_Acoustic_Depth.ino', desc: 'Ultrasonic depth measurement with median filtering', code: CAPSTONE_PROJECT.arduinoSourceCode },
            { name: 'FC37_CorrosionSafe_Rain.ino', desc: 'Rain detection with pulsed digital power rail', code: CAPSTONE_PROJECT.arduinoSourceCode },
            { name: 'L298N_Platform_Winch.ino', desc: 'Dual H-Bridge lifting motor driver with dynamic braking', code: CAPSTONE_PROJECT.arduinoSourceCode },
          ].map((file, i) => (
            <div key={i} className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between gap-3">
              <div className="overflow-hidden">
                <p className="text-xs font-mono font-bold text-cyan-400 truncate">{file.name}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{file.desc}</p>
              </div>
              <button
                onClick={() => downloadSketch(file.name, file.code)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer shrink-0 transition-colors"
                title="Download .ino sketch"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Author & Academic Credits */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Course Developed & Engineered by Toshit Kumar</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Published under MIT License for robotics education and STEM laboratory training.
          </p>
        </div>
        <a
          href="https://github.com/toshitkumar/arduino-robotics-elearning"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
        >
          <span>GitHub Repository</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
