const wordToGuess = document.getElementById("displayWord");
const alphabetLetters = document.getElementById("letters");
const textInfo = document.getElementById("textInfo");
let hangmanWord = "", lettersUnveiled, randomWord, attemptsLeft = 8;

function chooseRandomWord() {
	const theWords = ["algorithm", "argument", "aneumonoultramicroscopicsilicovolcanoconiosis", "boolean", "bug", "char", "class", "data", "exception", "framework", "loop", "iteration", "keyword", "null", "operator", "pointer", "variable", "runtime", "server", "statement", "token"];
	let arrayLg = theWords.length;
	randomWord = theWords[Math.floor(Math.random(theWords) * arrayLg)];
	return randomWord;
}

function lettersToUnveil() {
	const wordLength = chooseRandomWord().length;
	lettersUnveiled = wordLength;
	for (let i = 0; i < wordLength; ++i) {
		hangmanWord += "-";
	}
	wordToGuess.innerHTML = hangmanWord;
	generateButtons();
}

function generateButtons() {
	const alphaLetters = "abcdefghijklmnopqrstuvwxyz";
	const aLg = alphaLetters.length;
	for (var i = 0; i < aLg; ++i) {
		const currentLetter = alphaLetters[i];
		const button = document.createElement("button");
		button.setAttribute("id", currentLetter);
		button.setAttribute("onclick", "unveilLetters(id)");
		button.innerHTML = currentLetter;
		alphabetLetters.append(button);
	}
}

function unveilLetters(id) {
	if (randomWord.includes(id)) {
		let index = randomWord.indexOf(id, 0);
		while (index !== -1) {
			hangmanWord = hangmanWord.substring(0, index) + randomWord[index] + hangmanWord.substring(index + 1);
			index = randomWord.indexOf(id, index + 1);
			wordToGuess.innerHTML = hangmanWord;
			textInfo.innerHTML = "The letter was changed!";
			--lettersUnveiled;
			document.getElementById(id).style.display = "none";
		}	
	} else {
		--attemptsLeft;
		textInfo.innerHTML = `This letter is not exists in the word to guess. <strong>${attemptsLeft}</strong> attempts left`;
	}
	if (attemptsLeft == 0) {
		gameEnd();
	}
	if (lettersUnveiled == 0) {
		winner();
	}
}

function winner() {
	textInfo.innerHTML = "Congratulations, you guess it!";
	textInfo.style.color = "green";
	alphabetLetters.style.display = "none";
}

function gameEnd() {
	textInfo.innerHTML = "Game Over!";
	textInfo.style.color = "red";
	alphabetLetters.style.display = "none";
}

lettersToUnveil();