let subjects = [];
let totalCreditHours = 0;
let totalPoints = 0;

document.getElementById('addSubject').addEventListener('click', function () {
    const subjectName = document.getElementById('subjectName').value.trim();
    const creditHours = parseFloat(document.getElementById('creditHours').value);
    const grade = parseFloat(document.getElementById('grade').value);

    if (!subjectName || isNaN(creditHours) || isNaN(grade)) {
        document.getElementById('message').innerText = 'يرجى إدخال تفاصيل صحيحة.';
        return;
    }

    document.getElementById('message').innerText = '';

    subjects.push({ subjectName, creditHours, grade });
    totalCreditHours += creditHours;
    totalPoints += grade * creditHours;

    updateTable();

    const semesterGPA = (totalPoints / totalCreditHours).toFixed(2);
    document.getElementById('semesterGPA').innerText = semesterGPA;

    calculateCumulativeGPA();

    document.getElementById('subjectName').value = '';
    document.getElementById('creditHours').value = '';
    document.getElementById('grade').value = '';
});

function updateTable() {
    const tbody = document.querySelector('#subjectsTable tbody');
    tbody.innerHTML = '';
    subjects.forEach((subject, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${subject.subjectName}</td>
            <td>${subject.creditHours}</td>
            <td>${convertGradeToLetter(subject.grade)}</td>
            <td><button onclick="removeSubject(${index})">حذف</button></td>
        `;
        tbody.appendChild(row);
    });
}

function calculateCumulativeGPA() {
    const previousGPA = parseFloat(document.getElementById('previousGPA').value) || 0;
    const previousHours = parseFloat(document.getElementById('previousHours').value) || 0;

    const cumulativePoints = totalPoints + (previousGPA * previousHours);
    const cumulativeHours = totalCreditHours + previousHours;

    const cumulativeGPA = (cumulativePoints / cumulativeHours).toFixed(2);
    document.getElementById('cumulativeGPA').innerText = cumulativeGPA;
}

function removeSubject(index) {
    totalCreditHours -= subjects[index].creditHours;
    totalPoints -= subjects[index].grade * subjects[index].creditHours;
    subjects.splice(index, 1);
    updateTable();

    const semesterGPA = (totalPoints / totalCreditHours || 0).toFixed(2);
    document.getElementById('semesterGPA').innerText = semesterGPA;
    calculateCumulativeGPA();
}

function convertGradeToLetter(grade) {
    switch (grade) {
        case 5: return "+A";
        case 4.75: return "A";
        case 4.5: return "+B";
        case 4: return "B";
        case 3.5: return "+C";
        case 3: return "C";
        case 2.5: return "+D";
        case 2: return "D";
        default: return "F";
    }
}

// تبديل الوضع الداكن
document.getElementById('toggleDarkMode').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.container').classList.toggle('dark-mode');
    document.querySelector('#subjectsTable').classList.toggle('dark-mode');
});
