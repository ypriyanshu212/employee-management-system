function employee_box() {
    document.querySelectorAll('#emp, #add_emp, #atten, #leave, #pay')
        .forEach(item => {
            item.style.display = "none";
        });
    document.getElementById('emp').style.display = "block";

    document.querySelectorAll('#employee_menu, #add_employee_menu, #attencance_menu, #leave_menu, #payroll_menu')
        .forEach(item => {
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    document.getElementById('employee_menu').style.backgroundColor = "black";
    document.getElementById('employee_menu').style.color = "white";
}
function Addemployee_box() {
    document.querySelectorAll('#emp, #atten, #leave, #pay')
        .forEach(item => {
            item.style.display = "none";
        });
    document.getElementById('add_emp').style.display = "block";

    // dark and light btn 
    document.querySelectorAll('#employee_menu, #add_employee_menu, #attencance_menu, #leave_menu, #payroll_menu')
        .forEach(item => {
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    document.getElementById('add_employee_menu').style.backgroundColor = "black";
    document.getElementById('add_employee_menu').style.color = "white";
}
function attencance_box() {
    document.querySelectorAll('#emp, #add_emp ,#atten, #leave, #pay')
        .forEach(item => {
            item.style.display = "none";
        });
    document.getElementById('atten').style.display = "block";


    // dark and light btn 
    document.querySelectorAll('#employee_menu, #add_employee_menu, #attencance_menu, #leave_menu, #payroll_menu')
        .forEach(item => {
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    document.getElementById('attencance_menu').style.backgroundColor = "black";
    document.getElementById('attencance_menu').style.color = "white";
}
function leave_box() {
     document.querySelectorAll('#emp, #add_emp ,#atten, #leave, #pay')
        .forEach(item => {
            item.style.display = "none";
        });
    document.getElementById('leave').style.display = "block";

    // dark and light btn 
    document.querySelectorAll('#employee_menu, #add_employee_menu, #attencance_menu, #leave_menu, #payroll_menu')
        .forEach(item => {
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    document.getElementById('leave_menu').style.backgroundColor = "black";
    document.getElementById('leave_menu').style.color = "white";
}
function payroll_box() {
    document.querySelectorAll('#emp, #add_emp ,#atten, #leave, #pay')
        .forEach(item => {
            item.style.display = "none";
        });
    document.getElementById('pay').style.display = "block";

    // dark and light btn 
    document.querySelectorAll('#employee_menu, #add_employee_menu, #attencance_menu, #leave_menu, #payroll_menu')
        .forEach(item => {
            item.style.backgroundColor = "white";
            item.style.color = "black";
        });
    document.getElementById('payroll_menu').style.backgroundColor = "black";
    document.getElementById('payroll_menu').style.color = "white";
}



// chat gpt
// function showSection(sectionId, menuItem) {

//     // all section ids
//     const sections = ['emp', 'add_emp', 'atten', 'leave', 'pay'];

//     // hide all sections
//     sections.forEach(id => {
//         document.getElementById(id).style.display = "none";
//     });

//     // show selected section
//     document.getElementById(sectionId).style.display = "block";

//     // remove active class from all menu items
//     const menuItems = document.querySelectorAll('.menu-container ul li');

//     menuItems.forEach(item => {
//         item.classList.remove('active');
//     });

//     // add active class to clicked menu
//     menuItem.classList.add('active');
// }
// window.onload = function () {
//     showSection('emp', document.querySelector('.menu-container ul li'));
// };
// document.getElementById('employee_menu').style.backgroundColor = "black";
// document.getElementById('add_employee_menu').style.backgroundColor = "white";