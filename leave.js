// document.addEventListener("DOMContentLoaded", () => {

//     // ---------- ELEMENTS ----------
//     const modal = document.getElementById("modal");
//     const openBtn = document.querySelector(".new-request-btn button");
//     const closeBtn = document.querySelector("#modal span");
//     const leaveForm = document.getElementById("leave-form");
//     const employeeSelect = document.getElementById("employee");
//     const leaveTypeSelect = document.getElementById("leave-type");
//     const leaveTable = document.getElementById("leave-details");
//     const requestContainer = document.querySelector(".container-request");

//     // ---------- TABLE SCROLL ----------
//     requestContainer.style.maxHeight = "350px";
//     requestContainer.style.overflowY = "auto";
//     requestContainer.style.overflowX = "auto";

//     // ---------- DATA ----------
//     let leaveRequests = [];

//     // ---------- OPEN MODAL ----------
//     openBtn.addEventListener("click", () => {
//         modal.style.display = "flex";
//     });

//     // ---------- CLOSE MODAL ----------
//     closeBtn.addEventListener("click", closeModal);

//     window.addEventListener("click", (e) => {
//         if (e.target === modal) {
//             closeModal();
//         }
//     });

//     function closeModal() {
//         modal.style.display = "none";
//         leaveForm.reset();
//     }

//     // ---------- LOAD EMPLOYEE DROPDOWN FROM JSON SERVER ----------
//     async function loadEmployees() {
//         try {
//             const response = await fetch("http://localhost:3000/employees");

//             if (!response.ok) {
//                 throw new Error("Could not fetch employee data");
//             }

//             const employees = await response.json();

//             // clear existing options
//             employeeSelect.innerHTML = `
//                 <option value="">Select Employee</option>
//             `;

//             employees.forEach(emp => {
//                 const firstName = emp.firstName || emp.firstname || emp.name || "";
//                 const lastName = emp.lastName || emp.lastname || "";

//                 const fullName = `${firstName} ${lastName}`.trim();

//                 const option = document.createElement("option");
//                 option.value = fullName;
//                 option.textContent = fullName;

//                 employeeSelect.appendChild(option);
//             });

//         } catch (error) {
//             console.error("Employee dropdown error:", error);

//             employeeSelect.innerHTML = `
//                 <option value="">Unable to load employees</option>
//             `;
//         }
//     }

//     loadEmployees();

//     // ---------- LOAD LEAVE TYPE OPTIONS ----------
//     leaveTypeSelect.innerHTML = `
//         <option value="">Select Leave Type</option>
//         <option value="Vacation">Vacation</option>
//         <option value="Sick Leave">Sick Leave</option>
//         <option value="Casual Leave">Casual Leave</option>
//         <option value="Emergency Leave">Emergency Leave</option>
//         <option value="Half Day">Half Day</option>
//     `;

//     // ---------- FORM SUBMIT ----------
//     leaveForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//         const employee = employeeSelect.value;
//         const leaveType = leaveTypeSelect.value;
//         const startDate = document.getElementById("start-day").value;
//         const endDate = document.getElementById("end-day").value;
//         const reason = document.getElementById("reason").value.trim();

//         // validation
//         if (!employee) {
//             alert("Please select an employee");
//             return;
//         }

//         if (!leaveType) {
//             alert("Please select leave type");
//             return;
//         }

//         if (!startDate || !endDate) {
//             alert("Please select start and end date");
//             return;
//         }

//         if (!reason) {
//             alert("Please enter reason");
//             return;
//         }

//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         if (end < start) {
//             alert("End date cannot be before start date");
//             return;
//         }

//         // calculate days
//         const days =
//             Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

//         // save request
//         leaveRequests.push({
//             employee,
//             leaveType,
//             startDate,
//             endDate,
//             days,
//             status: "Pending"
//         });

//         renderTable();
//         closeModal();
//     });

//     // ---------- RENDER TABLE ----------
//     function renderTable() {
//         leaveTable.innerHTML = "";

//         leaveRequests.forEach((request, index) => {

//             let statusColor = "#f1c40f";

//             if (request.status === "Approved") {
//                 statusColor = "green";
//             } else if (request.status === "Rejected") {
//                 statusColor = "red";
//             }

//             const row = document.createElement("tr");

//             row.innerHTML = `
//                 <td>${request.employee}</td>
//                 <td>${request.leaveType}</td>
//                 <td>${request.startDate}</td>
//                 <td>${request.endDate}</td>
//                 <td>${request.days}</td>
//                 <td style="color:${statusColor}; font-weight:bold;">
//                     ${request.status}
//                 </td>
//                 <td>
//                     <button class="approve-btn" data-index="${index}">
//                         Approve
//                     </button>

//                     <button class="reject-btn" data-index="${index}">
//                         Reject
//                     </button>

//                     <button class="delete-btn" data-index="${index}">
//                         Delete
//                     </button>
//                 </td>
//             `;

//             leaveTable.appendChild(row);
//         });

//         // approve
//         document.querySelectorAll(".approve-btn").forEach(btn => {
//             btn.addEventListener("click", function () {
//                 const index = this.dataset.index;
//                 leaveRequests[index].status = "Approved";
//                 renderTable();
//             });
//         });

//         // reject
//         document.querySelectorAll(".reject-btn").forEach(btn => {
//             btn.addEventListener("click", function () {
//                 const index = this.dataset.index;
//                 leaveRequests[index].status = "Rejected";
//                 renderTable();
//             });
//         });

//         // delete
//         document.querySelectorAll(".delete-btn").forEach(btn => {
//             btn.addEventListener("click", function () {
//                 const index = this.dataset.index;
//                 leaveRequests.splice(index, 1);
//                 renderTable();
//             });
//         });
//     }
// });


document.addEventListener("DOMContentLoaded", () => {

    // ---------- API ----------
    const EMP_API = "http://localhost:3000/employees";
    const LEAVE_API = "http://localhost:3000/leaves";

    // ---------- ELEMENTS ----------
    const modal = document.getElementById("modal");
    const leaveForm = document.getElementById("leave-form");
    const employeeSelect = document.getElementById("employee");
    const leaveTypeSelect = document.getElementById("leave-type");
    const leaveTable = document.getElementById("leave-details");

    // ---------- GLOBAL FUNCTIONS (FOR onclick) ----------
    // ✅ IMPORTANT FIX (your HTML uses onclick)

    window.openmodal = function () {
        modal.style.display = "flex";
    };

    window.closemodal = function () {
        modal.style.display = "none";
        leaveForm.reset();
    };

    // ---------- DATA ----------
    let leaveRequests = [];

    // ---------- LOAD EMPLOYEES ----------
    async function loadEmployees() {
        const res = await fetch(EMP_API);
        const employees = await res.json();

        employeeSelect.innerHTML = `<option value="">Select Employee</option>`;

        employees.forEach(emp => {
            const name = emp.name;

            const option = document.createElement("option");
            option.value = name;
            option.textContent = name;

            employeeSelect.appendChild(option);
        });
    }

    // ---------- LOAD LEAVES FROM DB ----------
    async function loadLeaves() {
        const res = await fetch(LEAVE_API);
        leaveRequests = await res.json();
        renderTable();
    }

    // ---------- LEAVE TYPES ----------
    leaveTypeSelect.innerHTML = `
        <option value="">Select Leave Type</option>
        <option value="Vacation">Vacation</option>
        <option value="Sick Leave">Sick Leave</option>
        <option value="Casual Leave">Casual Leave</option>
        <option value="Emergency Leave">Emergency Leave</option>
        <option value="Half Day">Half Day</option>
    `;

    // ---------- SUBMIT FORM ----------
    leaveForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const employee = employeeSelect.value;
        const leaveType = leaveTypeSelect.value;
        const startDate = document.getElementById("start-day").value;
        const endDate = document.getElementById("end-day").value;
        const reason = document.getElementById("reason").value.trim();

        if (!employee || !leaveType || !startDate || !endDate || !reason) {
            alert("Fill all fields");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            alert("End date cannot be before start date");
            return;
        }

        const days = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;

        const newLeave = {
            employee,
            leaveType,
            startDate,
            endDate,
            days,
            reason,
            status: "Pending"
        };

        // ✅ SAVE TO JSON SERVER
        await fetch(LEAVE_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newLeave)
        });

        loadLeaves();   // refresh table
        closemodal();
    });

    // ---------- RENDER TABLE ----------
    function renderTable() {
        leaveTable.innerHTML = "";

        leaveRequests.forEach(req => {

            let color = "orange";
            if (req.status === "Approved") color = "green";
            if (req.status === "Rejected") color = "red";

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${req.employee}</td>
                <td>${req.leaveType}</td>
                <td>${req.startDate}</td>
                <td>${req.endDate}</td>
                <td>${req.days}</td>
                <td style="color:${color}; font-weight:bold;">
                    ${req.status}
                </td>
                <td>
                    <button onclick="approveLeave('${req.id}')">Approve</button>
                    <button onclick="rejectLeave('${req.id}')">Reject</button>
                    <button onclick="deleteLeave('${req.id}')">Delete</button>
                </td>
            `;

            leaveTable.appendChild(row);
        });
    }

    // ---------- ACTION BUTTONS ----------

    window.approveLeave = async function (id) {
        await fetch(`${LEAVE_API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Approved" })
        });
        loadLeaves();
    };

    window.rejectLeave = async function (id) {
        await fetch(`${LEAVE_API}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Rejected" })
        });
        loadLeaves();
    };

    window.deleteLeave = async function (id) {
        await fetch(`${LEAVE_API}/${id}`, {
            method: "DELETE"
        });
        loadLeaves();
    };

    // ---------- INIT ----------
    loadEmployees();
    loadLeaves();

});