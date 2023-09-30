document.addEventListener('DOMContentLoaded', () => {
    const numSemestersInput = document.getElementById('numSemesters');
    const createTableBtn = document.getElementById('createTableBtn');
    const tableContainer = document.getElementById('tableContainer');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultDiv = document.getElementById('result');

    let numSemesters = 1;

    createTableBtn.addEventListener('click', () => {
        numSemesters = parseInt(numSemestersInput.value, 10);
        createTable(numSemesters);
        tableContainer.style.display = 'block';
    });

    calculateBtn.addEventListener('click', () => {
        const sgpaInputs = document.querySelectorAll('.sgpa');
        const creditInputs = document.querySelectorAll('.credits');

        let totalCredits = 0;
        let totalWeightedPoints = 0;

        for (let i = 0; i < numSemesters; i++) {
            const sgpa = parseFloat(sgpaInputs[i].value);
            const credits = parseInt(creditInputs[i].value);

            if (!isNaN(sgpa) && !isNaN(credits)) {
                totalCredits += credits;
                totalWeightedPoints += sgpa * credits;
            }
        }

        if (totalCredits > 0) {
            const cgpa = totalWeightedPoints / totalCredits;
            resultDiv.textContent = `Your CGPA is: ${cgpa.toFixed(2)}`;
        } else {
            resultDiv.textContent = 'Please enter valid SGPA and credits.';
        }
    });

    clearBtn.addEventListener('click', () => {
        clearInputs();
        resultDiv.textContent = '';
    });

    function createTable(num) {
        const table = document.createElement('table');
        const tableHeader = document.createElement('tr');
        const sgpaHeader = document.createElement('th');
        const creditHeader = document.createElement('th');

        sgpaHeader.textContent = 'SGPA';
        creditHeader.textContent = 'Credits';

        tableHeader.appendChild(sgpaHeader);
        tableHeader.appendChild(creditHeader);
        table.appendChild(tableHeader);

        for (let i = 0; i < num; i++) {
            const row = document.createElement('tr');
            const sgpaCell = document.createElement('td');
            const creditCell = document.createElement('td');

            const sgpaInput = document.createElement('input');
            sgpaInput.setAttribute('type', 'number');
            sgpaInput.classList.add('sgpa');
            sgpaCell.appendChild(sgpaInput);

            const creditInput = document.createElement('input');
            creditInput.setAttribute('type', 'number');
            creditInput.classList.add('credits');
            creditCell.appendChild(creditInput);

            row.appendChild(sgpaCell);
            row.appendChild(creditCell);
            table.appendChild(row);
        }

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    function clearInputs() {
        const sgpaInputs = document.querySelectorAll('.sgpa');
        const creditInputs = document.querySelectorAll('.credits');

        sgpaInputs.forEach(input => (input.value = ''));
        creditInputs.forEach(input => (input.value = ''));
    }
});
