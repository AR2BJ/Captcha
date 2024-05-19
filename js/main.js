// Selecting DOM elements
let reload = document.querySelector("div.wrapper>div.captcha>div.head>button");
let captcha_code = document.querySelectorAll(
	"div.wrapper>div.captcha>div.head>div.captcha_code>span"
);
let line = document.querySelector(
	"div.wrapper>div.captcha>div.head>div.captcha_code>div.line"
);
let submit = document.querySelector("div.wrapper>div.captcha>div.foot>button");
let input = document.querySelector("div.wrapper>div.captcha>div.foot>input");
// Set of characters used for captcha generation
let captcha_char =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Function to generate captcha
function captcha_generator() {
	for (let i = 0; i <= 4; i++) {
		// Selecting a random character from the character set
		let captcha = captcha_char[Math.floor(Math.random() * 62)];
		// Assigning the random character to captcha code elements and setting a random skew angle for them
		captcha_code[i].innerText = captcha;
		captcha_code[i].style.transform = `skew(${Math.floor(
			Math.random() * 50 - 25
		)}deg, ${Math.floor(Math.random() * 50 - 25)}deg)`;
		// Removing the hidden class from the element displaying lines and setting a random rotation angle for it
		line.classList.remove("hidden");
		line.style.transform = `rotate(${Math.floor(Math.random() * 14 - 7)}deg)`;
	}
}

// Adding a click event for the "Reload" button
reload.addEventListener("click", () => {
	// Clearing the input value and generating a new captcha
	input.value = "";
	captcha_generator();
});

// Adding a click event for the "Submit" button
submit.addEventListener("click", () => {
	// Getting the input value and comparing it with the generated captcha
	let captchaValue = Array.from(captcha_code)
		.map((c) => c.innerText)
		.join("");
	if (input.value === captchaValue) {
		// Displaying a success message if the captcha is entered correctly
		Swal.fire({
			icon: "success",
			title: "Good job!",
			text: "Captcha entered correctly!",
		});
	} else {
		// Displaying an error message if the captcha is entered incorrectly and generating a new captcha
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Something went wrong!",
		});
		input.value = "";
		captcha_generator();
	}
});
