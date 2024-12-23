import React, { useEffect, useState } from "react";
import {
  fetchEnrollments,
  deleteEnrollment,
  updateEnrollment,
} from "../services/api";

export default function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [editingEnrollment, setEditingEnrollment] = useState(null); // Track the enrollment being edited
  const [studentName, setStudentName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");

  useEffect(() => {
    const getEnrollments = async () => {
      try {
        const response = await fetchEnrollments();
        console.log(response); // Check if student and subject are populated
        const enrollmentData = response.data || [];
        setEnrollments(enrollmentData);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      }
    };
    getEnrollments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteEnrollment(id);
      setEnrollments(
        enrollments.filter((enrollment) => enrollment.enrollmentID !== id)
      );
      alert("Enrollment deleted successfully.");
    } catch (error) {
      console.error("Error deleting enrollment:", error);
      alert("Failed to delete enrollment.");
    }
  };

  const handleEdit = (enrollment) => {
    setEditingEnrollment(enrollment); // Set the enrollment being edited
    setStudentName(enrollment.students); // Set the current student name
    setSubjectName(enrollment.subjects); // Set the current subject name
    setEnrollmentDate(
      new Date(enrollment.enrollmentDate).toISOString().slice(0, 19)
    ); // Set the current enrollment date
  };

  const handleSave = async () => {
    const updatedEnrollment = {
      enrollmentID: editingEnrollment.enrollmentID,
      studentID: editingEnrollment.studentID,
      students: studentName,
      subjectID: editingEnrollment.subjectID,
      subjects: subjectName,
      enrollmentDate: enrollmentDate,
    };

    try {
      await updateEnrollment(editingEnrollment.enrollmentID, updatedEnrollment);
      setEnrollments(
        enrollments.map((enrollment) =>
          enrollment.enrollmentID === editingEnrollment.enrollmentID
            ? updatedEnrollment
            : enrollment
        )
      );
      alert("Enrollment updated successfully.");
      setEditingEnrollment(null); // Reset editing state after saving
    } catch (error) {
      console.error("Error updating enrollment:", error);
      alert("Failed to update enrollment.");
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-4">Enrollment List</h2>
      {enrollments.length === 0 ? (
        <p className="text-center">No enrollments found.</p>
      ) : (
        <ul className="list-group">
          {enrollments.map((enrollment) => {
            // Ensure that the student and subject data are available
            if (!enrollment.students || !enrollment.subjects) {
              return null; // Skip enrollment if student or subject is missing
            }

            return (
              <li
                key={enrollment.enrollmentID}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{enrollment.students}</strong> enrolled in{" "}
                  <strong>{enrollment.subjects}</strong>
                  <div className="mt-2 text-muted">
                    <small>
                      Enrollment Date:{" "}
                      {new Date(enrollment.enrollmentDate).toLocaleString()}
                    </small>
                  </div>
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    right: "200px",
                    minWidth: "100px",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => handleEdit(enrollment)} // Edit button
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(enrollment.enrollmentID)}
                >
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Edit Enrollment Modal */}
      {editingEnrollment && (
        <div
          className="modal show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Enrollment</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditingEnrollment(null)} // Close the modal without saving
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="studentName">Student Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="studentName"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)} // Update student name
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectName">Subject Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subjectName"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)} // Update subject name
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="enrollmentDate">Enrollment Date</label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="enrollmentDate"
                    value={enrollmentDate}
                    onChange={(e) => setEnrollmentDate(e.target.value)} // Update enrollment date
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingEnrollment(null)} // Close without saving
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave} // Save the edited enrollment
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
