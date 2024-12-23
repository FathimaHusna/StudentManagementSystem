import React, { useEffect, useState } from "react";
import { createEnrollment, fetchStudents, fetchSubjects} from "../services/api";




export default function AddEnrollment() {
    const [students, setStudents] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [loading, setLoading] = useState(true);

 

    useEffect(() => {
        const getStudentsAndSubjects = async () => {
            try {
                const studentResponse = await fetchStudents();
                const studentData = studentResponse.data;
                setStudents(studentData);

                const subjectResponse = await fetchSubjects();
                const subjectData = subjectResponse.data;
                setSubjects(subjectData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                alert("Failed to load students or subjects. Please try again later.");
                setLoading(false);
            }
        };

        getStudentsAndSubjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedStudent || !selectedSubject) {
            alert("Please select both a student and a subject.");
            return;
           
        }
    
        console.log("Selected Student ID:", selectedStudent);
        console.log("Selected Subject ID:", selectedSubject);
        console.log("Available Students:", students);
        console.log("Available Subjects:", subjects);
    
        // Find the selected student and subject by ID
        const selectedStudentData = students.find(student => student.studentID === parseInt(selectedStudent)); // Ensure IDs are compared as numbers
        const selectedSubjectData = subjects.find(subject => subject.subjectID === parseInt(selectedSubject)); // Ensure IDs are compared as numbers
    
        console.log("Selected Student Data:", selectedStudentData);
        console.log("Selected Subject Data:", selectedSubjectData);
    
        // Ensure that both the student and subject exist
        if (!selectedStudentData || !selectedSubjectData) {
            alert("Invalid student or subject selection.");
            return;
        }
    
        const enrollmentData = {
            studentID: selectedStudent,
            subjectID: selectedSubject,
            enrollmentDate: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
            Students: `${selectedStudentData.firstName} ${selectedStudentData.lastName}`,  // Full name of the student
            Subjects: selectedSubjectData.subjectName,  // Name of the subject
        };
    
        console.log("Enrollment Data:", enrollmentData); // Log the data
    
        try {
            const response = await createEnrollment(enrollmentData);
            if (response.status === 201) {
                alert("Enrollment successful!");
                setSelectedStudent(""); // Clear student selection
                setSelectedSubject(""); // Clear subject selection
            } else {
                alert("Failed to enroll student. Please try again.");
            }
        } catch (error) {
            console.error("Error enrolling student:", error);
            alert("Failed to enroll student. Please check your inputs.");
        }
    };
    
    

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Enroll Student in Subject</h2>
            {loading ? (
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                    <div className="mb-3">
                        <label htmlFor="student" className="form-label">
                            Student
                        </label>
                        <select
                            id="student"
                            value={selectedStudent}
                            onChange={(e) => setSelectedStudent(e.target.value)}
                            className="form-select"
                            disabled={students.length === 0}
                        >
                            <option value="">Select a student</option>
                            {students.length > 0 ? (
                                students.map((student) => (
                                    <option key={student.studentID} value={student.studentID}>
                                        {student.firstName} {student.lastName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No students available</option>
                            )}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">
                            Subject
                        </label>
                        <select
                            id="subject"
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            className="form-select"
                            disabled={subjects.length === 0}
                        >
                            <option value="">Select a subject</option>
                            {subjects.length > 0 ? (
                                subjects.map((subject) => (
                                    <option key={subject.subjectID} value={subject.subjectID}>
                                        {subject.subjectName}
                                    </option>
                                ))
                            ) : (
                                <option value="">No subjects available</option>
                            )}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        Enroll
                    </button>
                </form>
            )}
        </div>
    );
}
