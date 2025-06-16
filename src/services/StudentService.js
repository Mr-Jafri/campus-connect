import Student from '../models/Student.js';

class StudentService {
  static async createStudent(studentData) {
    try {
      const student = new Student(studentData);
      await student.save();
      return student;
    } catch (error) {
      throw error;
    }
  }

  static async getAllStudents() {
    try {
      return await Student.find();
    } catch (error) {
      throw error;
    }
  }

  static async getStudentById(id) {
    try {
      const student = await Student.findById(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
  }

  static async updateStudent(id, updateData) {
    try {
      const student = await Student.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
  }

  static async deleteStudent(id) {
    try {
      const student = await Student.findByIdAndDelete(id);
      if (!student) {
        throw new Error('Student not found');
      }
      return student;
    } catch (error) {
      throw error;
    }
  }
}

export default StudentService; 