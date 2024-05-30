export interface TeacherData {
  firstName: string,
  lastName: string,
  subject: string
  }

export interface TeacherResponse {
  data: TeacherData[]
}

export interface StudentData {
  firstName: string,
  lastName: string,
  subject: string
  }

export interface StudentResponse {
  data: StudentData[]
}