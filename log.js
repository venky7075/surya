// Ensure login form is shown every time the page is refreshed
window.onload = function() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("patientData");

    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("healthForm").classList.add("hidden");
}

// Login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (email && password) {
        alert("Login successful!");

        // Hide login form & show health form
        document.getElementById("loginForm").classList.add("hidden");
        document.getElementById("healthForm").classList.remove("hidden");
    } else {
        alert("Please enter valid login details!");
    }
}

// Submit health data function
function submitHealthData() {
    let heartRate = document.getElementById("heartRate").value;
    let bloodPressure = document.getElementById("bloodPressure").value;
    let age = document.getElementById("age").value;

    if (heartRate && bloodPressure && age) {
        let { condition, doctor } = analyzeHealthCondition(heartRate, bloodPressure, age);

        let healthOutput = document.createElement("p");
        healthOutput.innerHTML = `<strong>Heart Rate:</strong> ${heartRate} bpm <br>
                                  <strong>Blood Pressure:</strong> ${bloodPressure} <br>
                                  <strong>Age:</strong> ${age} years <br>
                                  <strong>Health Condition:</strong> <span style="color: red;">${condition}</span> <br>
                                  <strong>Suggested Doctor:</strong> <span style="color: blue;">${doctor}</span>`;

        document.getElementById("healthDataList").appendChild(healthOutput);

        // Clear input fields
        document.getElementById("heartRate").value = "";
        document.getElementById("bloodPressure").value = "";
        document.getElementById("age").value = "";
    } else {
        alert("Please enter all health details!");
    }
}

// Function to analyze health condition and suggest doctor
function analyzeHealthCondition(heartRate, bloodPressure, age) {
    heartRate = parseInt(heartRate);
    age = parseInt(age);

    let bpValues = bloodPressure.split("/");
    let systolic = parseInt(bpValues[0]);
    let diastolic = parseInt(bpValues[1]);

    let condition = "Normal & Healthy";
    let doctor = "General Physician";

    if (heartRate < 60 || systolic < 90 || diastolic < 60) {
        condition = "Low Blood Pressure or Bradycardia";
        doctor = "Cardiologist";
    } else if (heartRate > 100 || systolic > 140 || diastolic > 90) {
        condition = "Hypertension or Tachycardia";
        doctor = "Cardiologist";
    } else if (age > 50 && (systolic > 130 || diastolic > 85)) {
        condition = "Mild Hypertension (Age-Related)";
        doctor = "Geriatric Specialist";
    } else if (heartRate > 120) {
        condition = "Possible Arrhythmia";
        doctor = "Electrophysiologist";
    } else if (systolic > 180 || diastolic > 120) {
        condition = "Hypertensive Crisis! Seek Immediate Help!";
        doctor = "Emergency Doctor";
    }

    return { condition, doctor };
}

// Logout function
function logout() {
    alert("You have been logged out.");
    location.reload(); // Refresh the page to force re-login
}
