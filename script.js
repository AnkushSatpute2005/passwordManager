// Toggle between "Add Password" and "Generate Password" sections
function toggleForm() {
    const container = document.getElementById('container');
    container.classList.toggle('active');
}

// Generate a random password
function generatePassword() {
    const length = document.getElementById("lengthSlider").value;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    document.getElementById("password").value = password;
}

// Copy the generated password to clipboard
function copyPassword() {
    const passwordField = document.getElementById("password");

    if (passwordField.value) {
        navigator.clipboard.writeText(passwordField.value).then(() => {
            alert("Password copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    } else {
        alert("Generate a password first!");
    }
}

// Update displayed password length value
document.getElementById("lengthSlider").addEventListener("input", function() {
    document.getElementById("lengthValue").textContent = this.value;
});
