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
      id:crypto.randomUUID(),
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

    showPassword(); // Refresh the password list after adding
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
    let msg_row = document.createElement("tr");
    msg_row.classList.add("msg-row");
    let msg_data1 = document.createElement("td");
    msg_data1.textContent = "Empty !";
    msg_data1.style.color = "red";

    let msg_data2 = document.createElement("td");
    msg_data2.textContent = "Empty !";
    msg_data2.style.color = "red";

    let msg_data3 = document.createElement("td");
    msg_data3.textContent = "Empty !";
    msg_data3.style.color = "red";
    // msg.style.textAlign = "center";
    tableBody.appendChild(msg_row);
    // msg_row.appendChild(msg_data)
    msg_row.appendChild(msg_data1);
    msg_row.appendChild(msg_data2);
    msg_row.appendChild(msg_data3);
    return;
  }

  for (let i = 0; i < passwordList.length; i++) {
    let newRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    let cell2 = document.createElement("td");
    let cell3 = document.createElement("td");

    let passwordInput = document.createElement("input")
    passwordInput.type="password"
    passwordInput.readOnly=true;
    passwordInput.id = "dynamicPassword";
    

    cell1.textContent = passwordList[i].websiteName;
    passwordInput.value = passwordList[i].websitePassword;
    cell2.appendChild(passwordInput);

    let copyButton = document.createElement("button");
    copyButton.classList.add("btn-copy")
    copyButton.textContent = "Copy";
    copyButton.onclick = function () {
      navigator.clipboard
        .writeText(passwordInput.value)
        .then(() => alert("Copied: " + passwordInput.value))
        .catch((err) => console.error("Error copying:", err));
    };

    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.textContent="Delete";
    deleteButton.setAttribute("id",passwordList[i].id)
    // console.log(passwordList[i].id)
    deleteButton.onclick=function(){
      deletePassword(passwordList[i].id);
    }

    cell3.appendChild(copyButton);
    cell3.appendChild(deleteButton)

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);

    tableBody.appendChild(newRow);
  }
}

function deletePassword(id){
  let passwordList = JSON.parse(localStorage.getItem("passwords")) || [];
  passwordList = passwordList.filter(item => item.id !== id);
  localStorage.setItem("passwords",JSON.stringify(passwordList));
  showPassword();
}
