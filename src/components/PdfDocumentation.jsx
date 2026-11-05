import React from 'react';
import { FileText, Download, Printer, CheckCircle, ShieldCheck, Cpu, Code, HelpCircle } from 'lucide-react';
import { generateCoursePDF } from '../utils/pdfGenerator';
import { COURSE_INFO, MODULES, CAPSTONE_PROJECT } from '../data/courseData';
import { playClickSound } from '../utils/audioEffects';

export default function PdfDocumentation() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Course Documentation & Downloadable PDF</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete, professional, printable laboratory curriculum manual authored by Toshit Kumar.
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            generateCoursePDF();
          }}
          className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Printable PDF (A4)</span>
        </button>
      </div>

      {/* Embedded Document Reader Preview */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-10 space-y-8 text-slate-300 relative shadow-2xl">
        {/* Subtle Watermark preview */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5 select-none">
          <span className="text-6xl md:text-8xl font-black text-white rotate-45">
            Created by Toshit Kumar
          </span>
        </div>

        {/* Cover Preview Header */}
        <div className="border-b border-slate-800 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <span>OFFICIAL STEM ROBOTICS CURRICULUM MANUAL</span>
            <span>•</span>
            <span>DOCUMENT VERSION 2.4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Arduino Robotics & Flood-Safe Smart House
          </h1>
          <p className="text-sm text-slate-400">
            Automatic House Lifting System Using Arduino UNO | Academic & Laboratory Edition
          </p>
          <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Author: <strong className="text-white">Toshit Kumar</strong></span>
            <span>Target: <strong className="text-cyan-400">Schools & Robotics Labs</strong></span>
          </div>
        </div>

        {/* Section: Curriculum Summary */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Curriculum Structure Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {MODULES.map((m) => (
              <div key={m.id} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
                <span className="font-bold text-cyan-400">Module {m.num}: {m.title}</span>
                <p className="text-slate-400">{m.tagline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Capstone Specifications & Pinouts */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Capstone Mechatronic Bill of Materials & Pin Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-4">Hardware Module</th>
                  <th className="py-2.5 px-4">Pin Terminal</th>
                  <th className="py-2.5 px-4">Arduino Pin</th>
                  <th className="py-2.5 px-4">Protection & Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/40">
                {CAPSTONE_PROJECT.pinConnectionTable.slice(0, 10).map((p, idx) => (
                  <tr key={idx}>
                    <td className="py-2 px-4 font-bold text-white">{p.component}</td>
                    <td className="py-2 px-4 font-mono text-cyan-400">{p.compPin}</td>
                    <td className="py-2 px-4 font-mono font-bold text-blue-400">{p.arduinoPin}</td>
                    <td className="py-2 px-4 text-slate-400">{p.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Complete 20-row pin mapping and electrical schematics included in downloadable PDF.
          </p>
        </div>

        {/* Section: Troubleshooting Guide */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Laboratory Troubleshooting & Rectification Matrix
          </h3>
          <div className="space-y-2.5 text-xs">
            {CAPSTONE_PROJECT.troubleshootingGuide.map((t, idx) => (
              <div key={idx} className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1">
                <p className="font-bold text-red-400">Fault: {t.symptom}</p>
                <p className="text-slate-300"><strong>Probable Root Cause:</strong> {t.cause}</p>
                <p className="text-emerald-400"><strong>Remedy:</strong> {t.remedy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Download Callout */}
        <div className="p-5 bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Need a Printable Copy for Class or Lab?</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Generates an authentic PDF with headers, footers, cover page, and Toshit Kumar watermark.
            </p>
          </div>
          <button
            onClick={() => {
              playClickSound();
              generateCoursePDF();
            }}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-md shadow-blue-500/20"
          >
            Download PDF Now
          </button>
        </div>
      </div>
    </div>
  );
}
