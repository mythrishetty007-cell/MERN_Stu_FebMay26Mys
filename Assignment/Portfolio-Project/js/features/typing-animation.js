const typingText = document.getElementById("typing-text");
const roles = ["Full-Stack Developer", "MERN Enthusiast", "Competitive Programmer"];
let wordIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const currentWord = roles[wordIdx];
    typingText.textContent = isDeleting ? currentWord.slice(0, charIdx--) : currentWord.slice(0, charIdx++);

    if (!isDeleting && charIdx > currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && charIdx < 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % roles.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 150);
    }
}
type();