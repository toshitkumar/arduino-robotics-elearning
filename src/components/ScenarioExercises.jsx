import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, ArrowRight, HelpCircle, AlertCircle, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SCENARIOS } from '../data/scenariosData';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export default function ScenarioExercises({ onScenarioCompleted, completedScenarios }) {
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [scId]: optionId }
  const [showFeedback, setShowFeedback] = useState({}); // { [scId]: boolean }

  const currentScenario = SCENARIOS[activeScenarioIndex];
  const selectedOptionId = selectedAnswers[currentScenario.id];
  const isAnswered = !!selectedOptionId;
  const isFeedbackVisible = showFeedback[currentScenario.id];

  const handleSelectOption = (optId) => {
    playClickSound();
    setSelectedAnswers({ ...selectedAnswers, [currentScenario.id]: optId });
    setShowFeedback({ ...showFeedback, [currentScenario.id]: true });

    const chosen = currentScenario.options.find((o) => o.id === optId);
    if (chosen?.correct) {
      playSuccessChime();
      confetti({ particleCount: 50, spread: 60 });
      onScenarioCompleted(currentScenario.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Scenario-Based Engineering Challenges</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-world decision scenarios testing your ability to troubleshoot automated flood mitigation anomalies.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">
            {completedScenarios.length} / {SCENARIOS.length} Solved
          </span>
        </div>
      </div>

      {/* Scenario Stepper Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {SCENARIOS.map((sc, i) => {
          const isDone = completedScenarios.includes(sc.id);
          const isCurrent = activeScenarioIndex === i;
          return (
            <button
              key={sc.id}
              onClick={() => {
                playClickSound();
                setActiveScenarioIndex(i);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isCurrent
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : isDone
                  ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{sc.num}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
          );
        })}
      </div>

      {/* Active Scenario Card */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{currentScenario.num}</span>
            <span className="text-xs text-slate-500 font-mono">Decision Protocol</span>
          </div>
          <h3 className="text-lg font-bold text-white">{currentScenario.title}</h3>

          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong className="text-cyan-400 block mb-1">Situation Briefing:</strong>
            {currentScenario.context}
          </div>

          <div className="p-3 bg-blue-950/30 border border-blue-500/20 rounded-xl text-xs text-blue-300 font-semibold flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{currentScenario.dilemma}</span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Control Response:</label>
          <div className="grid grid-cols-1 gap-3">
            {currentScenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div key={opt.id} className="space-y-2">
                  <button
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? opt.correct
                          ? 'bg-emerald-950/30 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10'
                          : 'bg-red-950/30 border-red-500 text-red-200 shadow-md shadow-red-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {opt.id.replace('opt-', '').toUpperCase()}
                    </span>
                    <span className="flex-1">{opt.text}</span>
                  </button>

                  {/* Immediate Feedback for this option if chosen */}
                  {isSelected && isFeedbackVisible && (
                    <div
                      className={`p-3 rounded-xl border text-xs ${
                        opt.correct
                          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-950/20 border-red-500/30 text-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold mb-1">
                        {opt.correct ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Correct Decision!</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-red-400" />
                            <span>Sub-optimal or Dangerous Choice!</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed">{opt.feedback}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Engineering Rationale Box (Revealed after answering) */}
        {isFeedbackVisible && (
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <h5 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Instructional Engineering Principle:
            </h5>
            <p className="text-slate-300 leading-relaxed">{currentScenario.engineeringExplanation}</p>
          </div>
        )}

        {/* Bottom Next Button */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-slate-500 font-mono">
            Scenario {activeScenarioIndex + 1} of {SCENARIOS.length}
          </span>
          {activeScenarioIndex < SCENARIOS.length - 1 && (
            <button
              onClick={() => {
                playClickSound();
                setActiveScenarioIndex(activeScenarioIndex + 1);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
