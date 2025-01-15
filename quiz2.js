const quizdata = [
    {
        Question: "Which country is known as the land of the rising sun?",
        Choice: ["China", "Japan", "Canada", "Thailand"],
        Answer: 1
    },
    {
        Question: "Which cricketer is known as the 'Run Machine' due to his consistent performance in all formats of the game?",
        Choice: ["Ricky Ponting", "Virat Kohli", "Steve Smith", "AB de Villiers"],
        Answer: 1
    },
    {
        Question: "Who was the first woman to win a Nobel Prize?",
        Choice: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Dorothy Hodgkin"],
        Answer: 0
    }
];

let CurrentQuestionIndex = 0;
let Score = 0;
const userAnswers = Array(quizdata.length).fill(null);

const quizelement = document.getElementById("quiz");
const resultelement = document.getElementById("results");

function loadquestion() {
    const questiondata = quizdata[CurrentQuestionIndex];
    quizelement.innerHTML = `
        <div>
            <h2>${questiondata.Question}</h2>
            <ul>
                ${questiondata.Choice.map((choice, index) => `
                    <li>
                        <label>
                            <input type="radio" name="answer" value="${index}" ${userAnswers[CurrentQuestionIndex] === index ? "checked" : ""} /> ${choice}
                        </label>
                    </li>`).join('')}
            </ul>
        </div>
    `;
    document.getElementById("prev").disabled = CurrentQuestionIndex === 0;
    document.getElementById("next").style.display = CurrentQuestionIndex < quizdata.length - 1 ? "inline-block" : "none";
    document.getElementById("submit").style.display = CurrentQuestionIndex === quizdata.length - 1 ? "inline-block" : "none";
}

function nextquestion() {
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        userAnswers[CurrentQuestionIndex] = parseInt(answer.value);
        CurrentQuestionIndex++;
        loadquestion();
    } else {
        alert("PLEASE SELECT AN ANSWER");
    }
}

function prevquestion() {
    if (CurrentQuestionIndex > 0) {
        CurrentQuestionIndex--;
        loadquestion();
    }
}

function showresults() {
    // Store the last answer if selected
    const answer = document.querySelector('input[name="answer"]:checked');
    if (answer) {
        userAnswers[CurrentQuestionIndex] = parseInt(answer.value);
    }

    // Calculate the score based on correct answers
    Score = userAnswers.reduce((score, answer, index) => 
        answer === quizdata[index].Answer ? score + 1 : score, 0);

    // Clear the quiz area
    quizelement.innerHTML = "";
    document.getElementById("prev").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("submit").style.display = "none";

    // Display the result message
    resultelement.textContent = `Your Score is ${Score} out of ${quizdata.length}`;
}

document.getElementById("next").addEventListener("click", nextquestion);
document.getElementById("prev").addEventListener("click", prevquestion);
document.getElementById("submit").addEventListener("click", showresults);

// Load the first question
loadquestion();
