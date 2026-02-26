import '../css/Dashboard.css';
import {useState, useEffect} from 'react';
import { getAllQuestionRequest , postQuestion} from '../services/question.service.ts';
import { useAuth } from '../context/useAuth.ts';

interface QuestionType {
    title: string;
    description: string;
    link:string;
    category: ['dsa' | 'sql'];
    difficulty: ['easy' | 'medium' | 'hard'];
    sampleInputOutput: string;
    constraints: string;
}

function Dashboard () {
    const [questions, setQuestions] = useState([{}])
    const [questionForm, setQuestionForm] = useState<QuestionType>({
        title: '',
        description: '',
        link: '',
        category: ['dsa'],
        difficulty: [ 'easy' ],
        sampleInputOutput: '',
        constraints: '',
    })
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const {role} = useAuth();
    useEffect(() => {
        const fetchQuestions = async () => {
            try{
                const data = await getAllQuestionRequest();
                setQuestions(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                setError(err.message);
                return;
                }
            setError('Failed to load profile');
            }
            fetchQuestions();
    }}, [])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setQuestionForm( prev => ({...prev, [name]: value}))
    }
    const handleAddQuestion = async (e: React.ChangeEvent) => {
        e.preventDefault();
        try{
            const newQuestion = await postQuestion(questionForm);
            
        }
    }
    return (
        <div className="dashboard-container">
            {role === 'admin' && 
                <form onSubmit={e => handleAddQuestion(e)}>
                    <input 
                        type="text" 
                        name='title'
                        value={questionForm.title}
                        onChange={ handleChange }    
                    />

                    <input 
                        type="text" 
                        name='description'
                        value={questionForm.description}
                        onChange={ handleChange }    
                    />

                    <input 
                        type="text" 
                        name='link'
                        value={questionForm.link}
                        onChange={ handleChange }    
                    />

                    <select  name="category" value={questionForm.category}>
                        <option value="dsa">DSA</option>
                        <option value="sql">SQL</option>
                    </select>

                    <select  name="difficulty" value={questionForm.difficulty}>
                        <option value="easy">EASY</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>

                    <input 
                        type="text" 
                        name='title'
                        value={questionForm.title}
                        onChange={ handleChange }    
                    />

                    <input 
                        type="text" 
                        name='sampleInputOutput'
                        value={questionForm.sampleInputOutput}
                        onChange={ handleChange }    
                    />

                    <input 
                        type="text" 
                        name='constraints'
                        value={questionForm.constraints}
                        onChange={ handleChange }    
                    />
                    <button>Add</button>
                </form>
            }
            {
                questions.map((question, question._id) => {
                    <div >
                        <p>{`Title: ${question.title}`}</p>
                        <p>{`Description: ${question.description}`}</p>
                        <p>{`Link: ${category}`}</p>
                        <p>{`Difficulty: ${question.difficulty}`}</p>
                        <p>{`Sample Input Output: ${question.sampleInputOutput}`}</p>
                        <p>{`Constraints: ${question.Constraints}`}</p>
                        <ul className='control-btns'>
                            <li id={questions._id}>Solve</li>
                            <li id={questions._id}>Mark as solved</li>
                            <li id={questions._id}>update</li>
                            <li id={questions._id}>Delete</li>
                            <li id={questions._id}>{progress.status}</li>
                        </ul>
                    </div>
                })
            }
        </div>
    )
}
export default Dashboard;