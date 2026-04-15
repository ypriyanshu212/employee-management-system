// // ---------- JSON SERVER URL ----------
// const API_URL = "http://localhost:3000/employees";

// const employeeSelect = document.getElementById("employee-select");
// const tbody = document.querySelector(".attendencet-border tbody");
// const searchInput = document.querySelector('.today-attendance-container input[type="text"]');
// const presentCount = document.querySelector(".present-today h2");

// let employees = [];
// let attendanceData = [];

// // ---------- LOAD EMPLOYEES ----------
// async function loadEmployees() {
//     try {
//         const response = await fetch(API_URL);
//         employees = await response.json();

//         employeeSelect.innerHTML = `<option value="">Select Employee</option>`;

//         employees.forEach(emp => {
//             // change these names if your json uses different keys
//             const firstName = emp.firstName || emp.firstname || emp.name || "";
//             const lastName = emp.lastName || emp.lastname || "";

//             const option = document.createElement("option");
//             option.value = emp.id;
//             option.textContent = `${firstName} ${lastName}`.trim();

//             employeeSelect.appendChild(option);
//         });
//     } catch (err) {
//         console.log(err);
//     }
// }

// loadEmployees();

// // ---------- RENDER TABLE ----------
// function renderAttendance(data = attendanceData) {
//     tbody.innerHTML = "";

//     data.forEach(emp => {
//         tbody.innerHTML += `
//             <tr>
//                 <td>${emp.name}</td>
//                 <td>${emp.department}</td>
//                 <td>${emp.checkIn}</td>
//                 <td>${emp.hours ? emp.hours : "-"}</td>
//                 <td>${emp.checkOut ? emp.checkOut : "-"}</td>
//             </tr>
//         `;
//     });

//     presentCount.textContent = data.length;
// }

// // ---------- CHECK IN ----------
// function check_in() {
//     const selectedId = employeeSelect.value;

//     if (selectedId === "") {
//         alert("Select employee first");
//         return;
//     }

//     const emp = employees.find(e => String(e.id) === selectedId);

//     if (!emp) {
//         alert("Employee not found");
//         return;
//     }

//     // avoid duplicate check in
//     const already = attendanceData.find(
//         e => String(e.id) === selectedId && e.checkOut === ""
//     );

//     if (already) {
//         alert("Employee already checked in");
//         return;
//     }

//     const firstName = emp.firstName || emp.firstname || emp.name || "";
//     const lastName = emp.lastName || emp.lastname || "";

//     const now = new Date();

//     attendanceData.push({
//         id: emp.id,
//         name: `${firstName} ${lastName}`.trim(),
//         department: emp.department || "N/A",

//         // keep full date object for hours calculation
//         checkInDate: now,

//         // only display time in table
//         checkIn: now.toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit"
//         }),

//         checkOut: "",
//         hours: ""
//     });

//     renderAttendance();
// }

// // ---------- CHECK OUT ----------
// function check_out() {
//     const selectedId = employeeSelect.value;

//     if (selectedId === "") {
//         alert("Select employee first");
//         return;
//     }

//     const record = attendanceData.find(
//         e => String(e.id) === selectedId && e.checkOut === ""
//     );

//     if (!record) {
//         alert("Employee has not checked in");
//         return;
//     }

//     const now = new Date();

//     record.checkOut = now.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit"
//     });

//     // calculate hours correctly
//     const diff = now - new Date(record.checkInDate);

//     const totalMinutes = Math.floor(diff / 1000 / 60);
//     const hours = Math.floor(totalMinutes / 60);
//     const minutes = totalMinutes % 60;

//     record.hours = `${hours}h ${minutes}m`;

//     renderAttendance();
// }

// // ---------- SEARCH ----------
// searchInput.addEventListener("input", function () {
//     const value = this.value.toLowerCase();

//     const filtered = attendanceData.filter(emp =>
//         emp.name.toLowerCase().includes(value) ||
//         emp.department.toLowerCase().includes(value)
//     );

//     renderAttendance(filtered);
// });


// ---------- API URLs ----------
const EMP_API = "http://localhost:3000/employees";
const ATTENDANCE_API = "http://localhost:3000/attendence";

// ---------- DOM ----------
const employeeSelect = document.getElementById("employee-select");
const tbody = document.querySelector(".attendencet-border tbody");
const searchInput = document.querySelector('.today-attendance-container input[type="text"]');
const presentCount = document.querySelector(".present-today h2");

// ---------- DATA ----------
let employees = [];
let attendanceData = [];

// ---------- LOAD EMPLOYEES ----------
async function loadEmployees() {
    try {
        const response = await fetch(EMP_API);
        employees = await response.json();

        employeeSelect.innerHTML = `<option value="">Select Employee</option>`;

        employees.forEach(emp => {
            const firstName = emp.firstName || emp.firstname || emp.name || "";
            const lastName = emp.lastName || emp.lastname || "";

            const option = document.createElement("option");
            option.value = emp.id;
            option.textContent = `${firstName} ${lastName}`.trim();

            employeeSelect.appendChild(option);
        });

    } catch (err) {
        console.log("Error loading employees:", err);
    }
}

// ---------- LOAD ATTENDANCE ----------
async function loadAttendance() {
    try {
        const res = await fetch(ATTENDANCE_API);
        attendanceData = await res.json();
        renderAttendance();
    } catch (err) {
        console.log("Error loading attendance:", err);
    }
}

// ---------- RENDER TABLE ----------
function renderAttendance(data = attendanceData) {
    tbody.innerHTML = "";

    data.forEach(emp => {
        tbody.innerHTML += `
        <tr>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.checkIn}</td>
            <td>${emp.hours ? emp.hours : "-"}</td>
            <td>${emp.checkOut ? emp.checkOut : "-"}</td>
        </tr>
        `;
    });

    presentCount.textContent = data.length;
}

// ---------- CHECK IN ----------
function check_in() {
    const selectedId = employeeSelect.value;

    if (selectedId === "") {
        alert("Select employee first");
        return;
    }

    const emp = employees.find(e => String(e.id) === selectedId);

    if (!emp) {
        alert("Employee not found");
        return;
    }

    // Prevent duplicate check-in
    const already = attendanceData.find(
        e => String(e.employeeId) === selectedId && e.checkOut === ""
    );

    if (already) {
        alert("Employee already checked in");
        return;
    }

    const firstName = emp.firstName || emp.firstname || emp.name || "";
    const lastName = emp.lastName || emp.lastname || "";

    const now = new Date();

    const newRecord = {
        employeeId: emp.id,
        name: `${firstName} ${lastName}`.trim(),
        department: emp.department || "N/A",
        checkInDate: now,
        checkIn: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        checkOut: "",
        hours: ""
    };

    fetch(ATTENDANCE_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecord)
    })
    .then(res => res.json())
    .then(data => {
        attendanceData.push(data);
        renderAttendance();
    })
    .catch(err => console.log("Check-in error:", err));
}

// ---------- CHECK OUT ----------
function check_out() {
    const selectedId = employeeSelect.value;

    if (selectedId === "") {
        alert("Select employee first");
        return;
    }

    const record = attendanceData.find(
        e => String(e.employeeId) === selectedId && e.checkOut === ""
    );

    if (!record) {
        alert("Employee has not checked in");
        return;
    }

    const now = new Date();

    const diff = now - new Date(record.checkInDate);
    const totalMinutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const updatedData = {
        checkOut: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        }),
        hours: `${hours}h ${minutes}m`
    };

    fetch(`${ATTENDANCE_API}/${record.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(data => {
        Object.assign(record, data);
        renderAttendance();
    })
    .catch(err => console.log("Check-out error:", err));
}

// ---------- SEARCH ----------
searchInput.addEventListener("input", function () {
    const value = this.value.toLowerCase();

    const filtered = attendanceData.filter(emp =>
        emp.name.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value)
    );

    renderAttendance(filtered);
});

// ---------- INIT ----------
loadEmployees();
loadAttendance();