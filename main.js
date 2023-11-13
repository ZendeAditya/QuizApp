let quiz = document.getElementById("quiz");
let btn = document.getElementById("btn");
let btns = document.getElementById("btns");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let result = document.getElementById("result");
let quizUrl = "https://the-trivia-api.com/v2/questions/";
let counter = 0;
let totalLength;
let correct = 0;
let wrong = 0;
let qusAns = [];

const renderQuiz = (data, counter) => {
  data.forEach((questions, id) => {
    let incorrectAnswer = questions.incorrectAnswers;
    let rightAns = questions.correctAnswer;
    let allAns = shuffleArray([rightAns, ...incorrectAnswer]);
    qusAns.push({
      question: questions.question.text,
      ans: allAns,
      correctAns: rightAns,
    });
    totalLength = qusAns.length;
  });
  quiz.innerHTML += `
            <div class="p-4">
                <p>Total Questions :  10</p>
               <h2 class="font-semibold py-2 px-2 text-lg"> ${counter + 1}. ${
    qusAns[counter].question
  }</h2>
               <ul class="flex items-center justify-evenly flex-col gap-y-2 [&_button]:border-2 [&_button]:border-black [&_button]:px-24 [&_button]:py-2 [&_button]:rounded-md [&_button]:cursor-pointer [&_button]:outline-none">
                    <li><button class="option">${
                      qusAns[counter].ans[0]
                    }</button></li>
                    <li><button class="option">${
                      qusAns[counter].ans[1]
                    }</button></li>
                    <li><button class="option">${
                      qusAns[counter].ans[2]
                    }</button></li>
                    <li><button class="option">${
                      qusAns[counter].ans[3]
                    }</button></li>
               </ul>
            </div>
        `;
  // qusAns[counter].correctAns === btn.textContent
  let buttonEle = document.querySelectorAll("button.option");
  buttonEle.forEach((btn, id) => {
    btn.addEventListener("click", function () {
      buttonEle.forEach((li) => {
        li.classList.remove("selected");
      });
      if (btn.innerText == qusAns[counter].correctAns) {
        console.log("true");
        correct++;
        updateResult();
      } else {
        wrong++;
        updateResult();
      }
      btn.classList.add("selected");
    });
  });
};
const shuffleArray = (array) => {
  const shuffledArray = [...array];

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};

const fetchQuiz = async () => {
  btn.classList.add("-translate-x-[100rem]");
  btns.classList.toggle("hidden");
  try {
    let res = await fetch(quizUrl);
    let data = await res.json();
    renderQuiz(data, counter);

    prev.addEventListener("click", function () {
      if (counter === 0) {
        window.confirm("no page behind");
      } else {
        counter--;
        quiz.innerHTML = "";
        renderQuiz(data, counter);
      }
    });
    next.addEventListener("click", function () {
      if (counter == 9) {
        window.confirm("no page Ahed");
        showResult();
      } else {
        quiz.innerHTML = "";
        counter++;
        renderQuiz(data, counter);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

btn.addEventListener("click", fetchQuiz);

const updateResult = () => {
  result.innerHTML = `
    <div class="flex items-center justify-between gap-3 font-semibold p-5 ">
      <h2>Correct Ans : ${correct}</h2>
      <h2>Wrong Ans : ${wrong}</h2>
    </div>`;
};

const showResult = () => {
  window.confirm(`Your result is correct  ${correct} and wrong  ${wrong}`);
};
