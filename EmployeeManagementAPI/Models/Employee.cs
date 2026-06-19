namespace EmployeeManagementAPI.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }

        public string FullName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Gender { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public int DesignationId { get; set; }

        public decimal Salary { get; set; }

        public string EmployeeType { get; set; } = string.Empty;
    }
}