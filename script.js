// script.js

function addSubjectFields() {
    const numSubjects = parseInt(document.getElementById("numSubjects").value);
    const addNamesCheckbox = document.getElementById("addNames");
    const subjectInputsDiv = document.getElementById("subjectInputs");
    subjectInputsDiv.innerHTML = '';

    for (let i = 1; i <= numSubjects; i++) {
        const subjectDiv = document.createElement("div");
        const nameInput = addNamesCheckbox.checked ? `<input type="text" id="subject${i}" placeholder="Subject Name" required>` : '';
        subjectDiv.innerHTML = `
            <div class="form-group">
                <label>Subject ${i}:</label>
                ${nameInput}
                <input type="number" id="credits${i}" placeholder="Credits" step="0.5" required>
                <input type="text" id="grade${i}" placeholder="Letter Grade" required>
            </div>
        `;
        subjectInputsDiv.appendChild(subjectDiv);
    }
}

function calculateSGPA() {
    const grading_scale = {
        "E": 5.0,
        "D": 6.0,
        "C": 7.0,
        "B": 8.0,
        "A": 9.0,
        "S": 10.0
    };

    const numSubjects = parseInt(document.getElementById("numSubjects").value);
    let total_credits = 0;
    let total_grade_points = 0;

    for (let i = 1; i <= numSubjects; i++) {
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const letter_grade = document.getElementById(`grade${i}`).value;

        if (letter_grade in grading_scale) {
            const grade_points = grading_scale[letter_grade];
            total_grade_points += grade_points * credits;
            total_credits += credits;
        } else {
            alert(`Invalid letter grade '${letter_grade}' entered. Please try again.`);
            return;
        }
    }

    if (total_credits > 0) {
        const sgpa = total_grade_points / total_credits;
        document.getElementById("sgpaResult").textContent = `Your SGPA for this semester is: ${sgpa.toFixed(2)}`;
    } else {
        alert("No valid data entered.");
    }
}

function clearFields() {
    const subjectInputsDiv = document.getElementById("subjectInputs");
    subjectInputsDiv.innerHTML = '';
    document.getElementById("sgpaResult").textContent = '';
}
