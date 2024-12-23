import axios from "axios";
const API_URL = "https://localhost:7120/api"


export const fetchStudents = ()=> {
    return axios.get(`https://localhost:7120/api/Student/GetAll?pageNumber=1&pageSize=10`)
}
export const fetchSubjects = ()=> {
    return axios.get(`https://localhost:7120/api/Subject/GetAll?pageNumber=1&pageSize=10`)
}
export const fetchEnrollments = ()=> {
    return axios.get(`https://localhost:7120/api/Enrollment`)
}
export const deleteEnrollment = (id)=> {
    return axios.delete(`https://localhost:7120/api/Enrollment/${id}`)
}
// export const updateEnrollment = (id)=> {
//     return axios.put(`https://localhost:7120/api/Enrollment/${id}`)
// }

export const createEnrollment = async (enrollmentData) => {
    try {
        const response = await axios.post('https://localhost:7120/api/Enrollment/Create', enrollmentData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response;
    } catch (error) {
        throw error; // Throw the error so you can handle it in your component
    }
};

export const updateEnrollment = (id, updatedEnrollmentData) => {
    return axios.put(`https://localhost:7120/api/Enrollment/${id}`, updatedEnrollmentData, {
      headers: {
        'Content-Type': 'application/json', // Ensuring the correct content type
      },
    })
      .then(response => {
        console.log("Enrollment updated:", response.data);
        return response.data;
      })
      .catch(error => {
        console.error("Error updating enrollment:", error);
        throw error;
      });
  };
  

