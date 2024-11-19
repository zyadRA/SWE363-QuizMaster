import React, { useState, useEffect } from 'react';
import QuestionCard from '../Create/QuestionCard';
import QuestionTypeModal from '../Create/QuestionTypeModal';
import DifficultyModal from '../Create/DifficultyModal';
import QuestionsList from '../Create/QuestionsList';
//import './EditQuizPage.css';
import { useNavigate } from 'react-router-dom';

const dummyQuiz = {
    name: "Sample Quiz",
    questions: [
        {
            type: 'mcq',
            questionText: 'What is the capital of France?',
            answers: ['Paris', 'London', 'Berlin', 'Rome'],
            correctAnswerIndex: 0,
        },
        {
            type: 'tf',
            questionText: 'The Earth is flat.',
            answers: ['True', 'False'],
            correctAnswerIndex: 1,
        },
    ],
};

function EditQuizPage() {
    const navigate = useNavigate();
    const [quizName, setQuizName] = useState('');
    const [questionCards, setQuestionCards] = useState([]);
    const [openQuestionTypeModal, setOpenQuestionTypeModal] = useState(false);

    useEffect(() => {
        // Load dummy quiz data
        setQuizName(dummyQuiz.name);
        setQuestionCards(
            dummyQuiz.questions.map((q) => ({
                type: q.type,
                questionText: q.questionText,
                answers: q.answers,
            }))
        );
    }, []);

    const addQuestion = (type) => {
        setQuestionCards([...questionCards, { type, questionText: '', answers: Array(4).fill('') }]);
        setOpenQuestionTypeModal(false);
    };

    const removeQuestion = (index) => {
        const updatedQuestions = questionCards.filter((_, i) => i !== index);
        setQuestionCards(updatedQuestions);
    };

    const updateQuestion = (index, updatedQuestion) => {
        const updatedQuestions = questionCards.map((question, i) =>
            i === index ? updatedQuestion : question
        );
        setQuestionCards(updatedQuestions);
    };

    const handleSaveClick = () => {
        const updatedQuiz = {
            name: quizName,
            questions: questionCards,
        };
        navigate('/quiz-maker-dashboard'); // Redirect after saving
    };

    return (
        <div className="createQuiz">
            <div className="sidebar">
                <button className="exitButton" onClick={() => navigate('/quiz-maker-dashboard')}>
                    Exit
                </button>
                <QuestionsList questionCards={questionCards} removeQuestion={removeQuestion} />
                <button className="addQuestionButton" onClick={() => setOpenQuestionTypeModal(true)}>
                    Add Question
                </button>
            </div>

            <div className="mainPage">
                <div className='mobileTopbar'>
                    <h2 className='closeIcon' onClick={() => navigate('/quiz-maker-dashboard')}>X</h2>
                    <h2>Create Quiz</h2>
                    <p onClick={handleSaveClick} className='publishText'>Save</p>
                </div>
                <div className="topbar">
                    <input
                        type="text"
                        className="quizNameInput"
                        placeholder="Enter Quiz Name"
                        value={quizName}
                        onChange={(e) => setQuizName(e.target.value)}
                    />
                    <button className="saveButton" onClick={handleSaveClick}>
                        Save
                    </button>
                </div>

                <div className="questionCards">
                    {questionCards.map((question, index) => (
                        <QuestionCard
                            key={index}
                            index={index}
                            type={question.type}
                            questionText={question.questionText}
                            answers={question.answers}
                            onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}
                        />
                    ))}
                </div>
                <button className='mobileAddQuestionButton' onClick={() => setOpenQuestionTypeModal(true)}>Add Question</button>        
                {openQuestionTypeModal && (
                    <QuestionTypeModal addQuestionProp={addQuestion} openModal={setOpenQuestionTypeModal} />
                )}
            </div>
        </div>
    );
}

export default EditQuizPage;
