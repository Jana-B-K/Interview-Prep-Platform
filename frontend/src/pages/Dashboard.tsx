import '../css/Dashboard.css';
import type { Dispatch, FormEvent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth.ts';
import { getAllQuestionRequest, postQuestion, updateQuestion, deleteQuestion } from '../services/question.service.ts';
import { createProgress, getUserProgress, updateProgress } from '../services/progress.service.ts';

type QuestionStatus = 'attempted' | 'solved';

interface Question {
  _id: string;
  title: string;
  description: string;
  link: string;
  category: 'dsa' | 'sql';
  difficulty: 'easy' | 'medium' | 'hard';
  sampleInputOutput: string;
  constraints?: string;
}

interface ProgressRecord {
  _id: string;
  questionId: string | { _id: string };
  status: QuestionStatus;
  userNotes?: string;
}

type QuestionPayload = Omit<Question, '_id'>;

const emptyQuestionForm: QuestionPayload = {
  title: '',
  description: '',
  link: '',
  category: 'dsa',
  difficulty: 'easy',
  sampleInputOutput: '',
  constraints: '',
};

function AdminForm({
  setQuestions,
  editingQuestion,
  onSaveEdit,
  onCancelEdit,
}: {
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  editingQuestion: Question | null;
  onSaveEdit: (questionId: string, questionData: QuestionPayload) => Promise<void>;
  onCancelEdit: () => void;
}) {
  const [formData, setFormData] = useState<QuestionPayload>(emptyQuestionForm);

  useEffect(() => {
    if (!editingQuestion) {
      setFormData(emptyQuestionForm);
      return;
    }

    setFormData({
      title: editingQuestion.title,
      description: editingQuestion.description,
      link: editingQuestion.link,
      category: editingQuestion.category,
      difficulty: editingQuestion.difficulty,
      sampleInputOutput: editingQuestion.sampleInputOutput,
      constraints: editingQuestion.constraints ?? '',
    });
  }, [editingQuestion]);

  const submitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: QuestionPayload = {
      ...formData,
      constraints: formData.constraints || undefined,
    };

    if (editingQuestion) {
      await onSaveEdit(editingQuestion._id, payload);
      return;
    }

    const createdQuestion = (await postQuestion(payload)) as Question;
    setQuestions((prev) => [...prev, createdQuestion]);
    setFormData(emptyQuestionForm);
  };

  return (
    <form onSubmit={submitQuestion} className="dashboard-form">
      <h3>{editingQuestion ? 'Edit Question' : 'Add Question'}</h3>
      <input
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        placeholder="Title"
        required
      />
      <input
        value={formData.description}
        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
        placeholder="Description"
        required
      />
      <input
        value={formData.link}
        onChange={(e) => setFormData((prev) => ({ ...prev, link: e.target.value }))}
        placeholder="Question Link"
        required
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value as 'dsa' | 'sql' }))}
      >
        <option value="dsa">DSA</option>
        <option value="sql">SQL</option>
      </select>
      <select
        value={formData.difficulty}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, difficulty: e.target.value as 'easy' | 'medium' | 'hard' }))
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <textarea
        value={formData.sampleInputOutput}
        onChange={(e) => setFormData((prev) => ({ ...prev, sampleInputOutput: e.target.value }))}
        placeholder="Sample Input/Output"
        required
      />
      <input
        value={formData.constraints}
        onChange={(e) => setFormData((prev) => ({ ...prev, constraints: e.target.value }))}
        placeholder="Constraints (optional)"
      />
      <button type="submit">{editingQuestion ? 'Save Changes' : 'Create Question'}</button>
      {editingQuestion && (
        <button type="button" className="dashboard-secondary-btn" onClick={onCancelEdit}>
          Cancel Edit
        </button>
      )}
    </form>
  );
}

function Dashboard() {
  const { role } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressRecord>>({});
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  useEffect(() => {
    void fetchData();
  }, [role]);

  const fetchData = async () => {
    const qData = (await getAllQuestionRequest()) as Question[];
    setQuestions(qData);

    if (role !== 'admin') {
      const pData = (await getUserProgress()) as ProgressRecord[];
      const pMap = pData.reduce<Record<string, ProgressRecord>>((acc, p) => {
        const questionId = typeof p.questionId === 'string' ? p.questionId : p.questionId._id;
        acc[questionId] = p;
        return acc;
      }, {});
      setProgress(pMap);
      return;
    }

    setProgress({});
  };

  const toggleProgress = async (questionId: string) => {
    const current = progress[questionId];

    if (!current) {
      const newProgress = (await createProgress(questionId, 'attempted')) as ProgressRecord;
      setProgress((prev) => ({ ...prev, [questionId]: newProgress }));
      return;
    }

    const newStatus: QuestionStatus = current.status === 'solved' ? 'attempted' : 'solved';
    const updatedProgress = (await updateProgress(current._id, { status: newStatus })) as ProgressRecord;
    setProgress((prev) => ({ ...prev, [questionId]: updatedProgress }));
  };

  const handleSaveQuestionEdit = async (questionId: string, questionData: QuestionPayload) => {
    const updatedQuestion = (await updateQuestion(questionId, questionData)) as Question;
    setQuestions((prev) =>
      prev.map((question) =>
        question._id === questionId ? { ...question, ...questionData, ...updatedQuestion } : question,
      ),
    );
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(questionId);
    setQuestions((prev) => prev.filter((question) => question._id !== questionId));
  };

  return (
    <div className="dashboard-container">
      {role === 'admin' && (
        <AdminForm
          setQuestions={setQuestions}
          editingQuestion={editingQuestion}
          onSaveEdit={handleSaveQuestionEdit}
          onCancelEdit={() => setEditingQuestion(null)}
        />
      )}

      {questions.map((q) => (
        <div key={q._id} className="dashboard-card">
          <h3>Title: {q.title}</h3>
          <p>{q.description}</p>
          <h4>Sample input output:</h4>
          <p>{q.sampleInputOutput}</p>
          <h4>Constraints:</h4>
          <p>{q.constraints}</p>
          
          {role === 'admin' ? (
            <div className="dashboard-actions">
              <button onClick={() => setEditingQuestion(q)}>Edit</button>
              <button onClick={() => void handleDeleteQuestion(q._id)}>Delete</button>
            </div>
          ) : (
            <div className="dashboard-actions">
              <button onClick={() => window.open(q.link)}>Solve</button>
              <button onClick={() => void toggleProgress(q._id)}>
                {progress[q._id]?.status === 'solved' ? 'Mark Attempted' : 'Mark Solved'}
              </button>
              <p className="dashboard-status">Status: {progress[q._id]?.status || 'Not Started'}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
