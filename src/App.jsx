import React, { useState } from 'react';
import { Check, X, ChevronRight, ChevronLeft, Eye, Users, DollarSign, Package, Shield, AlertCircle, BookOpen, Printer, Download } from 'lucide-react';

const SECTIONS = [
  {
    id: 'service',
    title: 'Service',
    icon: Eye,
    description: 'Leadership presence and customer engagement.',
    maxScore: 15,
    questions: [
      { id: 'srv1', text: 'Service Leader can be immediately identified and demonstrates strong leadership through coaching.', weight: 5, category: 'Fundamental', education: 'The Service Leader must be directing and coaching the team to drive sales.' },
      { id: 'srv2', text: 'Store leadership has filled out the Daily Zone Chart.', weight: 5, category: 'Fundamental', education: 'Zones ensure coverage. Employees must be in their zones.' },
      { id: 'srv3', text: 'Employees know their zone and communicate before leaving.', weight: 5, category: 'Fundamental', education: 'Communication is key to zone coverage.' },
    ]
  },
  {
    id: 'fittingroom',
    title: 'Fitting Room',
    icon: Users,
    description: 'Controls for fitting room security.',
    maxScore: 27,
    questions: [
      { id: 'fr1', text: 'Customers entering fitting rooms are promptly greeted.', weight: 3, education: 'Build connection and reduce anonymity.' },
      { id: 'fr2', text: 'Inside of each room is checked for items before customer entry.', weight: 3, education: 'Always start with a clean room.' },
    ]
  },
  {
    id: 'cashwrap',
    title: 'Cashwrap',
    icon: DollarSign,
    description: 'Register area organization and policy.',
    maxScore: 20,
    questions: [
      { id: 'cw1', text: 'Cashwrap is clean and organized.', weight: 2, education: 'A messy cashwrap hides theft.' },
    ]
  },
];

const QuestionCard = ({ question, answer, onAnswer }) => {
  const [status, setStatus] = useState(answer?.status || 'unanswered');
  const [comment, setComment] = useState(answer?.comment || '');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onAnswer(question.id, { status: newStatus, weight: question.weight, comment });
  };

  return (
    <div className={`p-4 rounded-xl border-2 transition-all ${
      status === 'pass' ? 'bg-green-50 border-green-500' :
      status === 'fail' ? 'bg-red-50 border-red-500' :
      'bg-white border-stone-200'
    }`}>
      <div className="flex flex-col gap-3">
        <p className={`text-sm leading-relaxed font-medium`}>{question.text}</p>
        <div className="flex bg-stone-100 p-1 rounded-lg w-full gap-1">
          <button
            onClick={() => handleStatusChange('pass')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
              status === 'pass' ? 'bg-green-500 text-white' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <Check className="w-4 h-4" />
            Pass
          </button>
          <button
            onClick={() => handleStatusChange('fail')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
              status === 'fail' ? 'bg-red-500 text-white' : 'text-stone-500 hover:text-stone-700'
            }`}
          >
            <X className="w-4 h-4" />
            Fail
          </button>
        </div>
        {status === 'fail' && (
          <div className="mt-4 pt-4 border-t border-red-200">
            <label className="text-xs font-bold text-red-700 uppercase block mb-2">Notes</label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                onAnswer(question.id, { status, weight: question.weight, comment: e.target.value });
              }}
              placeholder="Document findings..."
              className="w-full p-3 rounded-lg border border-red-200 bg-white text-sm focus:border-red-500 outline-none"
              rows="3"
            />
          </div>
        )}
        {question.education && status !== 'unanswered' && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-xs font-bold text-yellow-700 block mb-1">Coaching Tip</p>
            <p className="text-xs text-yellow-800">{question.education}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [storeNumber, setStoreNumber] = useState('');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleStart = () => {
    if (storeNumber.trim() && assessmentDate) {
      setStarted(true);
    } else {
      alert('Please enter Store Number and Date');
    }
  };

  const handleAnswer = (questionId, data) => {
    setAnswers(prev => ({ ...prev, [questionId]: data }));
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-yellow-400 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-yellow-400 p-8 text-center border-b-2 border-black">
            <h1 className="text-3xl font-black text-black mb-2">STORE CONTROLS</h1>
            <p className="text-sm font-bold tracking-widest uppercase">UO Assessment</p>
          </div>
          <div className="p-8 space-y-6">
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Store #</label>
              <input
                type="text"
                value={storeNumber}
                onChange={e => setStoreNumber(e.target.value)}
                placeholder="Enter store number"
                className="w-full p-4 border-2 border-stone-300 focus:border-black outline-none font-bold text-lg"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-stone-600 uppercase block mb-2">Date</label>
              <input
                type="date"
                value={assessmentDate}
                onChange={e => setAssessmentDate(e.target.value)}
                className="w-full p-4 border-2 border-stone-300 focus:border-black outline-none font-bold"
              />
            </div>
            <button
              onClick={handleStart}
              className="w-full bg-black text-yellow-400 font-black uppercase py-4 px-6 hover:bg-stone-800 transition"
            >
              Start <ChevronRight className="inline ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentSection = SECTIONS[currentSectionIndex];
  const Icon = currentSection.icon;
  const isLastSection = currentSectionIndex === SECTIONS.length - 1;
  const answeredCount = currentSection.questions.filter(q => answers[q.id]?.status !== 'unanswered').length;

  if (submitted) {
    const totalPoints = Object.values(answers).reduce((sum, a) => sum + (a.status === 'pass' ? a.weight : 0), 0);
    const maxPoints = SECTIONS.reduce((sum, s) => sum + s.maxScore, 0);
    const percentage = Math.round(totalPoints / maxPoints * 100);

    return (
      <div className="min-h-screen bg-yellow-400 p-4 flex flex-col items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-4xl font-black text-black mb-4">Assessment Complete</h2>
          <div className="text-6xl font-black text-black mb-2">{percentage}%</div>
          <p className="text-lg text-stone-600 mb-6">{totalPoints} of {maxPoints} points</p>
          <button
            onClick={() => {
              setStarted(false);
              setSubmitted(false);
              setAnswers({});
              setCurrentSectionIndex(0);
              setStoreNumber('');
            }}
            className="bg-black text-yellow-400 font-black uppercase py-3 px-8 hover:bg-stone-800"
          >
            New Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-400 flex flex-col">
      <div className="bg-white px-4 py-3 border-b-2 border-black flex justify-between items-center">
        <button onClick={() => setStarted(false)} className="text-stone-600 font-bold text-sm">Cancel</button>
        <div className="text-sm font-bold">Store {storeNumber}</div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full p-4 pb-24">
        <div className="bg-white p-6 border-2 border-black mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-400 border-2 border-black">
              <Icon className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-500 uppercase">Section {currentSectionIndex + 1} of {SECTIONS.length}</p>
              <h2 className="text-2xl font-black text-black">{currentSection.title}</h2>
              <p className="text-sm text-stone-600">{currentSection.description}</p>
              <p className="text-xs mt-2 font-bold">Progress: {answeredCount}/{currentSection.questions.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {currentSection.questions.map(q => (
            <QuestionCard key={q.id} question={q} answer={answers[q.id]} onAnswer={handleAnswer} />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-black p-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          {currentSectionIndex > 0 && (
            <button
              onClick={() => setCurrentSectionIndex(prev => prev - 1)}
              className="px-6 py-3 bg-white text-black border-2 border-black font-bold hover:bg-stone-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => isLastSection ? setSubmitted(true) : setCurrentSectionIndex(prev => prev + 1)}
            className="flex-1 py-3 bg-black text-yellow-400 font-black uppercase border-2 border-black hover:bg-stone-800"
          >
            {isLastSection ? 'Complete' : 'Next'} <ChevronRight className="inline ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
