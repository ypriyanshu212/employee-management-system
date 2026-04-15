// fetch('http://localhost:3000/employees')
// .then(res => res.json())
// .then(data => {
//     calculateSalary(data);
// })
// function calculateSalary(data){
//     const tabledata = document.getElementById('tabledata');
//     // tabledata.innerHTML="";
//     data.forEach(emp => {
//         let total = 0;
//         total += emp.salary;
//     }); 
//     console.log("tatal-salary: ", total);
//     document.getElementById("total").innerText = total;
// }

// chatgpt
// fetch('http://localhost:3000/employees')
//     .then(res => res.json())
//     .then(data => {
//         calculateSalary(data);
//     });

// function calculateSalary(data) {
//     let total = 0;

//     data.forEach(emp => {
//         total += Number(emp.salary);
//     });

//     console.log("total-salary:", total);

//     document.getElementById("total").innerText =
//         // "₹ " + 
//         total.toLocaleString();
// }


document.addEventListener("DOMContentLoaded", () => {

    const EMP_API = "http://localhost:3000/employees";
    const ATT_API = "http://localhost:3000/attendence";

    async function loadPayroll() {
        try {
            const [empRes, attRes] = await Promise.all([
                fetch(EMP_API),
                fetch(ATT_API)
            ]);

            const employees = await empRes.json();
            const attendance = await attRes.json();

            console.log("Employees:", employees);
            console.log("Attendance:", attendance);

            let totalSalary = 0;
            let active = 0;
            let pending = 0;

            attendance.forEach(record => {

                const emp = employees.find(e => e.id === record.employeeId);

                console.log("Match:", record.employeeId, emp);

                if (!emp) return;

                if (record.checkOut && record.checkOut !== "") {
                    active++;
                    totalSalary += Number(emp.salary);
                } else {
                    pending++;
                }
            });

            document.getElementById("total").innerText = "₹ " + totalSalary;

            document.querySelector(".employees-value h2").innerText = active;
            document.querySelector(".pending-value h2").innerText = pending;

        } catch (err) {
            console.log("ERROR:", err);
        }
    }

    loadPayroll();
});chart