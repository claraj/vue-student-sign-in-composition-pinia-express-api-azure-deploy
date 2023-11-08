import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {

    const studentList = ref( [] )

    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref( [] )

    function getAllStudents() {
        return studentAPI.get().then( students => {
            studentList.value = students
        })
    }

    function addNewStudent(student) {
        studentAPI.post(student).then( resp => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            getAllStudents()
        })
    }

    function arrivedOrLeft(student) {
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            getAllStudents()
        })
    }

    const sortedStudents = computed( () => {
        return studentList.value.toSorted( (s1, s2) => {
            return s1.name.localeCompare(s2.name)
        })
    })

    const studentCount = computed( () => {
        return studentList.value.length
    })

    return { 
        // reactive data
        studentList, 
        mostRecentStudent, 
        addNewStudentErrors,

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        getAllStudents,

        // computed properties
        sortedStudents,
        studentCount
    }

})