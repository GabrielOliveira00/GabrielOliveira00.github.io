export interface TeacherData {
  firstName: string,
  lastName: string,
  subject: string
  }

export interface TeacherResponse {
  data: TeacherData[]
}

export interface StudentData {
  name: string,
  email: string,

  }

export interface StudentResponse {
  data: StudentData[]
}