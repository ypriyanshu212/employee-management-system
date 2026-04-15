const form = document.getElementById("employeeForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // stop page reload

    const fname = document.getElementById("fname").value;
    const lname = document.getElementById("lname").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const department = document.getElementById("department").value;
    const position = document.getElementById("position").value;
    const salary = document.getElementById("salary").value;
    const start = document.getElementById("start").value;
    const status = document.getElementById("status").value;

    const data = {
      name: fname +" "+ lname,
      salary: Number(salary),
      email : email,
      phone : Number(phone),
      department : department,
      position : position,
      start : start,
      status : status,
    };

    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      console.log("Data added:", result);
      alert("Employee added successfully ✅");
    })
  });



// add data to table 
async function loadEmployees() {
    const tableBody = document.getElementById("table_data");

    try {
        const response = await fetch("http://localhost:3000/employees");
        const employees = await response.json();

        tableBody.innerHTML = "";

        employees.forEach(employee => {
            const row = document.createElement("tr");
            row.setAttribute("data-id", employee.id);

            row.innerHTML = `
                <td class="emp-name">${employee.name}</td>
                <td class="emp-email">${employee.email}</td>
                <td class="emp-position">${employee.position}</td>
                <td class="emp-department">${employee.department}</td>
                <td class="emp-status">
                    <span class="status ${employee.status.toLowerCase()}">
                        ${employee.status}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="edit-btn" onclick="editEmployee(${employee.id})">
                            <i class="fa-solid fa-pen"></i>
                        </button>

                        <button class="delete-btn" onclick="deleteEmployee(${employee.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error(error);
    }
}

function editEmployee(id) {
    const row = document.querySelector(`#table_data tr[data-id="${id}"]`);

    const name = row.querySelector(".emp-name").innerText;
    const email = row.querySelector(".emp-email").innerText;
    const position = row.querySelector(".emp-position").innerText;
    const department = row.querySelector(".emp-department").innerText;
    const status = row.querySelector(".emp-status span").innerText;

    row.innerHTML = `
        <td>
            <input type="text" class="edit-input" id="name-${id}" value="${name}">
        </td>
        <td>
            <input type="email" class="edit-input" id="email-${id}" value="${email}">
        </td>
        <td>
            <input type="text" class="edit-input" id="position-${id}" value="${position}">
        </td>
        <td>
            <input type="text" class="edit-input" id="department-${id}" value="${department}">
        </td>
        <td>
            <select class="edit-select" id="status-${id}">
                <option value="Active" ${status === "Active" ? "selected" : ""}>Active</option>
                <option value="Inactive" ${status === "Inactive" ? "selected" : ""}>Inactive</option>
                <option value="Leave" ${status === "Leave" ? "selected" : ""}>Leave</option>
            </select>
        </td>
        <td>
            <div class="action-buttons">
                <button class="edit-btn save-btn" onclick="saveEmployee(${id})">
                    <i class="fa-solid fa-check"></i>
                </button>

                <button class="delete-btn cancel-btn" onclick="loadEmployees()">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        </td>
    `;
}

async function saveEmployee(id) {
    const updatedEmployee = {
        id: id,
        name: document.getElementById(`name-${id}`).value,
        email: document.getElementById(`email-${id}`).value,
        position: document.getElementById(`position-${id}`).value,
        department: document.getElementById(`department-${id}`).value,
        status: document.getElementById(`status-${id}`).value
    };

    try {
        await fetch(`http://localhost:3000/employees/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedEmployee)
        });

        loadEmployees();

    } catch (error) {
        console.error(error);
    }
}

async function deleteEmployee(id) {
    const confirmDelete = confirm("Are you sure you want to delete this employee?");

    if (!confirmDelete) return;

    try {
        await fetch(`http://localhost:3000/employees/${id}`, {
            method: "DELETE"
        });

        loadEmployees();

    } catch (error) {
        console.error(error);
    }
}

loadEmployees();


