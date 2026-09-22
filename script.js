// Initial dataset
let employeeRecords = [
  { id: "EMP1001", name: "Ravi Kumar", dept: "Finance", days_present: 24, basic_salary: 42000, overtime_hours: 6 },
  { id: "EMP1002", name: "Anita Rao", dept: "HR", days_present: 19, basic_salary: 38000, overtime_hours: 2 },
  { id: "EMP1003", name: "Siddharth Nair", dept: "IT", days_present: 25, basic_salary: 60000, overtime_hours: 10 },
  { id: "EMP1004", name: "Pooja Patel", dept: "Marketing", days_present: 18, basic_salary: 35000, overtime_hours: 0 }
];

// Constants
const TOTAL_WORKING_DAYS = 26;
const OT_HOURLY_RATE = 250;

// Mathematical Calculation Functions
function calculateAttendancePct(daysPresent, totalDays = TOTAL_WORKING_DAYS) {
  return Number(((daysPresent / totalDays) * 100).toFixed(2));
}

function calculateOvertimePay(overtimeHours, rate = OT_HOURLY_RATE) {
  return overtimeHours * rate * 1.5;
}

function processEmployeeData(emp) {
  const attendancePct = calculateAttendancePct(emp.days_present);
  const overtimePay = calculateOvertimePay(emp.overtime_hours);
  const finalSalary = emp.basic_salary + overtimePay;
  const status = attendancePct >= 75 ? "OK" : "Below Threshold";

  return { ...emp, attendancePct, overtimePay, finalSalary, status };
}

// Render Dashboard UI
function renderDashboard() {
  const tableBody = document.getElementById("employeeTableBody");
  const searchVal = document.getElementById("searchInput").value.toLowerCase();
  const filterVal = document.getElementById("filterStatus").value;

  const processedData = employeeRecords.map(processEmployeeData);

  // Filter Data
  const filteredData = processedData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchVal) || emp.id.toLowerCase().includes(searchVal);
    const matchesStatus = filterVal === "ALL" || emp.status === filterVal;
    return matchesSearch && matchesStatus;
  });

  // Render Table Rows
  tableBody.innerHTML = filteredData.map(emp => `
    <tr>
      <td><strong>${emp.id}</strong></td>
      <td>${emp.name}</td>
      <td>${emp.dept}</td>
      <td>${emp.days_present} / ${TOTAL_WORKING_DAYS}</td>
      <td><strong>${emp.attendancePct}%</strong></td>
      <td>Rs.${emp.basic_salary.toLocaleString()}</td>
      <td>Rs.${emp.overtimePay.toLocaleString()}</td>
      <td><strong>Rs.${emp.finalSalary.toLocaleString()}</strong></td>
      <td>
        <span class="badge ${emp.status === 'OK' ? 'badge-ok' : 'badge-warning'}">
          ${emp.status}
        </span>
      </td>
      <td>
        <button onclick="deleteRecord('${emp.id}')" class="btn btn-danger" title="Delete">
          <i data-lucide="trash-2"></i>
        </button>
      </td>
    </tr>
  `).join("");

  // Update KPI Cards
  const totalPayroll = processedData.reduce((acc, curr) => acc + curr.finalSalary, 0);
  const totalOvertime = processedData.reduce((acc, curr) => acc + curr.overtimePay, 0);
  const lowAttendanceCount = processedData.filter(emp => emp.attendancePct < 75).length;

  document.getElementById("kpiTotalEmp").innerText = processedData.length;
  document.getElementById("kpiTotalPayroll").innerText = `Rs.${totalPayroll.toLocaleString()}`;
  document.getElementById("kpiLowAttendance").innerText = lowAttendanceCount;
  document.getElementById("kpiTotalOvertime").innerText = `Rs.${totalOvertime.toLocaleString()}`;

  // Refresh Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Add New Record Form Submission
document.getElementById("employeeForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const newEmp = {
    id: document.getElementById("empId").value.trim(),
    name: document.getElementById("empName").value.trim(),
    dept: document.getElementById("empDept").value,
    days_present: parseInt(document.getElementById("daysPresent").value, 10),
    basic_salary: parseFloat(document.getElementById("basicSalary").value),
    overtime_hours: parseFloat(document.getElementById("overtimeHours").value)
  };

  // Check unique ID
  if (employeeRecords.some(emp => emp.id.toLowerCase() === newEmp.id.toLowerCase())) {
    alert("An employee with this ID already exists!");
    return;
  }

  employeeRecords.push(newEmp);
  renderDashboard();

  // Reset form inputs
  document.getElementById("employeeForm").reset();
  document.getElementById("daysPresent").value = 22;
  document.getElementById("overtimeHours").value = 0;
  document.getElementById("basicSalary").value = 35000;
});

// Delete Record
function deleteRecord(id) {
  if (confirm(`Are you sure you want to delete employee ID: ${id}?`)) {
    employeeRecords = employeeRecords.filter(emp => emp.id !== id);
    renderDashboard();
  }
}

// Download TXT Summary Report
document.getElementById("exportTxtBtn").addEventListener("click", () => {
  let reportText = "EMPLOYEE ATTENDANCE & SALARY SUMMARY REPORT\n";
  reportText += "========================================================\n\n";

  employeeRecords.map(processEmployeeData).forEach(emp => {
    reportText += `${emp.name} | ${emp.attendancePct}% | Rs.${emp.finalSalary} | ${emp.status}\n`;
  });

  downloadFile("summary_report.txt", reportText, "text/plain");
});

// Download CSV Data
document.getElementById("exportCsvBtn").addEventListener("click", () => {
  let csvContent = "ID,Name,Department,Days Present,Attendance %,Basic Salary,Overtime Pay,Final Salary,Status\n";

  employeeRecords.map(processEmployeeData).forEach(emp => {
    csvContent += `"${emp.id}","${emp.name}","${emp.dept}",${emp.days_present},${emp.attendancePct},${emp.basic_salary},${emp.overtimePay},${emp.finalSalary},"${emp.status}"\n`;
  });

  downloadFile("employee_records.csv", csvContent, "text/csv");
});

// Helper Function for File Downloads
function downloadFile(filename, textContent, mimeType) {
  const blob = new Blob([textContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Attach Search and Filter Listeners
document.getElementById("searchInput").addEventListener("input", renderDashboard);
document.getElementById("filterStatus").addEventListener("change", renderDashboard);

// Initial Load
document.addEventListener("DOMContentLoaded", renderDashboard);