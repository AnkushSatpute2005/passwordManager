showPassword();
// Toggle between "Add Password" and "Generate Password" sections
function toggleForm() {
  const container = document.getElementById("container");
  container.classList.toggle("active");
}

const lengthSlider = document.getElementById("lengthSlider");
const lengthValue = document.getElementById("lengthValue");

// Update the span element when the range input value changes
lengthSlider.addEventListener("input", function () {
  lengthValue.textContent = lengthSlider.value;
});

// Generate a random password
function generatePassword() {
  const length = document.getElementById("lengthSlider").value;
  console.log(length);
  const weakChars = "abcdefghijklmnopqrstuvwxyz";
  const mediumChars = weakChars + "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const strongChars = mediumChars + "!@#$%^&*()_+{}[]<>?";

  let selectedStrength = document.querySelector(
    'input[name="strength"]:checked' // selects the radio button that has name=strength if it is not selected it will return null
  );

  if (!selectedStrength) {
    alert("Please select a password strength.");
    return;
  }

  let chars;
  if (selectedStrength.value === "weak") {
    chars = weakChars;
    //weak password contains lowercase latters
  } else if (selectedStrength.value === "medium") {
    chars = mediumChars;
    //medium password contains uppercase latters + numbers
  } else {
    chars = strongChars;
    //strong password contains loewr + uppercase latters + numbers + symbols
    // console.log(chars)
  }

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars.charAt(randomIndex);
  }

  document.getElementById("password").value = password;
}

// Copy the generated password to clipboard
function copyPassword() {
  const passwordField = document.getElementById("password");

  if (passwordField.value) {
    navigator.clipboard
      .writeText(passwordField.value)
      .then(() => {
        alert("Password copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  } else {
    alert("Generate a password first!");
  }
}

// Update displayed password passwordList.length value
document
  .getElementById("passwordList.lengthSlider")
  .addEventListener("input", function () {
    document.getElementById("passwordList.lengthValue").textContent =
      this.value;
  });

function addPassword() {
  const website_name = document.getElementById("website-name").value;
  const website_password = document.getElementById("website-password").value;

  if (website_name && website_password) {
    const newEntry = {
      websiteName: website_name,
      websitePassword: website_password,
    };

    const storedPasswords = JSON.parse(localStorage.getItem("passwords")) || [];
    storedPasswords.push(newEntry);
    localStorage.setItem("passwords", JSON.stringify(storedPasswords));

    alert("Password saved successfully!");

    // Clear input fields
    document.getElementById("website-name").value = "";
    document.getElementById("website-password").value = "";

    showPassword(); // ✅ Refresh the password list after adding
  } else {
    alert("Enter website name and password first!");
  }
}

// Show saved passwords
function showPassword() {
  let tableBody = document.querySelector(".password-container");

  // Clear previous list
  tableBody.innerHTML = "";

  const passwordList = JSON.parse(localStorage.getItem("passwords")) || [];

  if (passwordList.length === 0) {
    let msg = document.createElement("h3");
    msg.textContent = "Empty password list";
    msg.style.color = "red";
    msg.style.textAlign = "center";
    tableBody.appendChild(msg);
    return;
  }

  for (let i = 0; i < passwordList.length; i++) {
    let newRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");

    cell1.textContent = passwordList[i].websiteName;
    cell2.textContent = passwordList[i].websitePassword;

    let copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.onclick = function () {
      navigator.clipboard
        .writeText(cell2.textContent)
        .then(() => alert("Copied: " + cell2.textContent))
        .catch((err) => console.error("Error copying:", err));
    };

    cell3.appendChild(copyButton);

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);

    tableBody.appendChild(newRow);
  }
}
