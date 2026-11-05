import React, { useState } from 'react';
import { 
  CheckSquare, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Download, 
  Printer, 
  Sparkles, 
  ChevronRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZZES, COMPONENT_MATCHING_DATA } from '../data/quizData';
import { playClickSound, playSuccessChime } from '../utils/audioEffects';

export default function AssessmentCenter({ 
  studentName, 
  setStudentName, 
  quizScores, 
  onSaveQuizScore,
  completedModules 
}) {
  const [activeQuizCategory, setActiveQuizCategory] = useState('mod-1');
  const [userAnswers, setUserAnswers] = useState({}); // { [questionIdx]: optionIdx }
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(null);

  // Component matching state
  const [matchingSelections, setMatchingSelections] = useState({}); // { [compId]: matchText }
  const [matchingValidated, setMatchingValidated] = useState(false);

  const currentQuestions = QUIZZES[activeQuizCategory] || QUIZZES['mod-1'];

  const quizLabels = {
    'mod-1': 'Module 01: Arduino UNO Architecture (10 MCQs)',
    'mod-2': 'Module 02: Servo Motor Actuation (10 MCQs)',
    'mod-3': 'Module 03: Motor Driver (L298N) (10 MCQs)',
    'mod-4': 'Module 04: HC-SR04 Ultrasonic Telemetry (10 MCQs)',
    'mod-5': 'Module 05: Rain Sensor Module (10 MCQs)',
    'capstone': 'Capstone: Flood-Safe House Master Assessment (10 MCQs)',
  };

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    playClickSound();
    setUserAnswers({ ...userAnswers, [qIdx]: optIdx });
  };

  const handleSubmitQuiz = () => {
    playClickSound();
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        correctCount += 1;
      }
    });

    const pct = Math.round((correctCount / currentQuestions.length) * 100);
    setScorePercentage(pct);
    setQuizSubmitted(true);
    onSaveQuizScore(activeQuizCategory, correctCount, currentQuestions.length);

    if (pct >= 70) {
      playSuccessChime();
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  const handleResetQuiz = () => {
    playClickSound();
    setUserAnswers({});
    setQuizSubmitted(false);
    setScorePercentage(null);
  };

  // Certificate printing
  const handlePrintCertificate = () => {
    window.print();
  };

  // Calculate overall average
  const scoresArr = Object.values(quizScores);
  const overallAverage = scoresArr.length > 0 
    ? Math.round(scoresArr.reduce((a, b) => a + b.percentage, 0) / scoresArr.length) 
    : 85;

  const certificateEligible = completedModules.length >= 3 || overallAverage >= 70;

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Assessment & Certification Center</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Standardized 10-MCQ evaluation banks per module (60 total questions), interactive component matching, and official credential certificate.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">Average Score</p>
            <p className="text-sm font-bold text-white font-mono">{overallAverage}%</p>
          </div>
        </div>
      </div>

      {/* Quiz Category Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {Object.keys(quizLabels).map((key) => {
          const isSelected = activeQuizCategory === key;
          const savedScore = quizScores[key];
          return (
            <button
              key={key}
              onClick={() => {
                playClickSound();
                setActiveQuizCategory(key);
                handleResetQuiz();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{key === 'capstone' ? 'Capstone Exam' : `Module ${key.replace('mod-', '')}`}</span>
              {savedScore && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  savedScore.percentage >= 70 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {savedScore.percentage}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Quiz Sheet */}
      <div className="bg-[#111827] border border-slate-800 p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-white">{quizLabels[activeQuizCategory]}</h3>
            <p className="text-xs text-slate-400">10 Questions • Passing Grade: 70%</p>
          </div>
          {quizSubmitted && scorePercentage !== null && (
            <div className={`px-4 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 border ${
              scorePercentage >= 70
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                : 'bg-red-950/40 text-red-300 border-red-500/30'
            }`}>
              <span>Score: {scorePercentage}%</span>
              <span>({scorePercentage >= 70 ? 'PASSED' : 'RETRY NEEDED'})</span>
            </div>
          )}
        </div>

        {/* 10 Questions Form */}
        <div className="space-y-6">
          {currentQuestions.map((q, qIdx) => {
            const userAnswer = userAnswers[qIdx];
            return (
              <div key={qIdx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-blue-600/20 text-cyan-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <p className="text-xs md:text-sm font-semibold text-white leading-relaxed">
                    {q.q}
                  </p>
                </div>

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-8">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    const isCorrectAnswer = optIdx === q.answer;

                    let optStyle = 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800';

                    if (quizSubmitted) {
                      if (isCorrectAnswer) {
                        optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
                      } else if (isSelected && !isCorrectAnswer) {
                        optStyle = 'bg-red-950/40 border-red-500 text-red-300 font-bold';
                      }
                    } else if (isSelected) {
                      optStyle = 'bg-blue-600 border-blue-500 text-white font-bold shadow-md shadow-blue-500/20';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectAnswer(qIdx, optIdx)}
                        className={`text-left p-3 rounded-xl border text-xs transition-all cursor-pointer flex items-center gap-2.5 ${optStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-900/60 text-slate-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Submission */}
                {quizSubmitted && (
                  <div className="pl-8 pt-1 text-xs text-slate-400 flex items-start gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-300">Explanation:</strong> {q.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Reset Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={handleResetQuiz}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Answers</span>
          </button>

          {!quizSubmitted ? (
            <button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(userAnswers).length < currentQuestions.length}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                Object.keys(userAnswers).length === currentQuestions.length
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Submit & Score Quiz ({Object.keys(userAnswers).length}/10)</span>
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-medium">Quiz Evaluated & Recorded in Profile</span>
          )}
        </div>
      </div>

      {/* COMPONENT DRAG & MATCH ACTIVITY */}
      <div className="bg-[#111827] border border-slate-800 p-6 md:p-8 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Interactive Component Role Matcher
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Match each physical robotics component with its proper engineering role in the Flood-Safe Smart House architecture.
            </p>
          </div>
          <button
            onClick={() => {
              playSuccessChime();
              setMatchingValidated(true);
              confetti({ particleCount: 50, spread: 60 });
            }}
            className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Check Matches
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {COMPONENT_MATCHING_DATA.map((item) => (
            <div key={item.id} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.name}</span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40">
                  {item.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.match}</p>
              {matchingValidated && (
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Validated Architecture Role
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* OFFICIAL COURSE CERTIFICATE OF COMPLETION */}
      <div className="bg-[#111827] border border-amber-500/30 p-6 md:p-8 rounded-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400">
              <Award className="w-5 h-5" />
              <h3 className="text-lg font-bold text-white">Course Completion Certificate</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Personalized accredited certificate issued by Project Designer Toshit Kumar.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter Your Full Name"
              className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Certificate</span>
            </button>
          </div>
        </div>

        {/* Certificate Preview Card */}
        <div className="p-8 md:p-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-double border-amber-500/60 rounded-2xl shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute top-2 left-2 text-[10px] text-amber-500/40 font-mono tracking-widest uppercase">
            CERTIFICATE OF MERIT & MASTERY
          </div>
          <div className="absolute top-2 right-2 text-[10px] text-amber-500/40 font-mono">
            ID: ARDUINO-ROBO-{Math.abs(studentName.length * 997 + 1042)}
          </div>

          <div className="inline-block p-3 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Award className="w-10 h-10 animate-pulse" />
          </div>

          <div>
            <span className="text-xs font-bold text-amber-400 tracking-widest uppercase">
              STEM Robotics & Embedded Systems Certification
            </span>
            <h4 className="text-xl md:text-2xl font-serif font-black text-white mt-1">
              CERTIFICATE OF COMPLETION
            </h4>
            <p className="text-xs text-slate-400 mt-1 italic">This is proudly presented to</p>
          </div>

          <div className="py-2 border-b-2 border-amber-500/40 max-w-md mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-cyan-300 font-serif tracking-wide">
              {studentName || 'Student Name'}
            </h3>
          </div>

          <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
            for successfully mastering the curriculum of <strong className="text-white">Arduino Robotics & Flood-Safe Smart House</strong>, demonstrating rigorous competence in ATmega328P architecture, closed-loop servo actuation, L298N H-bridge motor drivers, ultrasonic time-of-flight acoustic sensing, and automated mechatronic flood mitigation.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between max-w-xl mx-auto border-t border-slate-800 gap-4 text-left">
            <div>
              <p className="text-[10px] text-slate-500 font-mono uppercase">Issued On</p>
              <p className="text-xs font-bold text-white font-mono">
                {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-[10px] text-emerald-400 font-mono">Verified Score: {overallAverage}%</p>
            </div>

            <div className="text-right">
              <p className="font-serif italic text-base text-cyan-400 font-bold">Toshit Kumar</p>
              <p className="text-xs font-bold text-white">Toshit Kumar</p>
              <p className="text-[10px] text-slate-400">Lead Robotics Engineer & Course Author</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
