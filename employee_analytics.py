# employee_analytics.py
# Run this script directly in VS Code

# -------------------------------------------------------------------
# 1. Employee Records Dataset
# -------------------------------------------------------------------
employee_records = [
    {
        "id": "EMP1001",
        "name": "Ravi Kumar",
        "dept": "Finance",
        "days_present": 24,
        "basic_salary": 42000,
        "overtime_hours": 6,
    },
    {
        "id": "EMP1002",
        "name": "Anita Rao",
        "dept": "HR",
        "days_present": 19,
        "basic_salary": 38000,
        "overtime_hours": 2,
    },
    {
        "id": "EMP1003",
        "name": "Siddharth Nair",
        "dept": "IT",
        "days_present": 25,
        "basic_salary": 60000,
        "overtime_hours": 10,
    },
    {
        "id": "EMP1004",
        "name": "Pooja Patel",
        "dept": "Marketing",
        "days_present": 18,
        "basic_salary": 35000,
        "overtime_hours": 0,
    },
]

# -------------------------------------------------------------------
# 2. Calculation Logic & Functions
# -------------------------------------------------------------------
def calculate_attendance_pct(days_present, total_days=26):
    """Calculates attendance percentage rounded to 2 decimal places."""
    return round((days_present / total_days) * 100, 2)


def calculate_overtime_pay(overtime_hours, rate=250):
    """Calculates overtime pay at 1.5x the hourly rate."""
    return overtime_hours * rate * 1.5


# -------------------------------------------------------------------
# 3. Summary Report Generation
# -------------------------------------------------------------------
def generate_summary_report(records, filename="summary_report.txt"):
    """Processes employee records and generates a summary text report."""
    with open(filename, "w") as report:
        for emp in records:
            try:
                # Calculations
                pct = calculate_attendance_pct(emp["days_present"])
                overtime_pay = calculate_overtime_pay(emp["overtime_hours"])
                total_salary = emp["basic_salary"] + overtime_pay

                # Attendance Threshold Evaluation
                status = "OK" if pct >= 75 else "Below Threshold"

                # Formatting and File output
                line = f"{emp['name']} | {pct}% | Rs.{total_salary} | {status}\n"
                report.write(line)

            except KeyError as e:
                print(f"Missing field for employee ID {emp.get('id', 'Unknown')}: {e}")
            except ZeroDivisionError:
                print(f"Invalid total days calculation for employee ID {emp.get('id')}.")

    print(f"Summary report generated successfully in '{filename}'.")


# -------------------------------------------------------------------
# Script Execution Entry Point
# -------------------------------------------------------------------
if __name__ == "__main__":
    generate_summary_report(employee_records)