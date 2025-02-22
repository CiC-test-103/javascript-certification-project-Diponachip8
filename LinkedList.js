// Necessary Imports (you will need to use this)
const { Student } = require('./Student')
const fs = require('fs').promises;
/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data               // Student
  next               // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(student) {
    // TODO
    const newStudent = new Student(student)
    const newNode = new Node(newStudent);
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++; 
    
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    // TODO
    if(!this.head) return;

    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      if (!this.head) this.tail = null;
      this.length--;
      return;
    }

     let current = this.head;
     while (current.next) {
       if(current.next.data.getEmail() === email){
         current.next = current.next.next;
         if (!current.next) this.tail = current;
         this.length--;
         return;
       }
       current = current.next;
     }
   }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    // TODO
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) { 
        return current.data;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    let students = [];
    let current = this.head;
    while (current) {
      students.push(current.data.getString());
      current = current.next;
      }
    return students; 
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let students = []
    let current = this.head;
    while (current) {
      students.push(current.data);
      current = current.next;
    }
    return students.sort((a, b) => a.getName().localeCompare(b.getName()));
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    // TODO
    return this.#sortStudentsByName().filter(student => student.getSpecialization() === specialization);
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    // TODO
    return this.#sortStudentsByName().filter(student => student.getYear() <= new Date().getFullYear() - minAge);
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    // TODO
    try{
      const studentsArray = [];
      let current = this.head;

      while (current) {
        studentsArray.push(current.data);
        current = current.next;
      }



      const jsonData = JSON.stringify(studentsArray, null,2);
      await fs.writeFile(fileName, jsonData, 'utf8');
      console.log(`LinkedList saved to ${fileName}`);
    } catch (error) {
      console.error(`Error saving LinkedList to JSON: ${error.message}`);
    }

    let current = this.head;
    while (current) {
      students.push(current.data);
      current = current.next;
    }
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    // TODO
    try{

      this.clearStudents();
      const data = await fs.readFile(fileName, 'utf8');
      const studentsArray = JSON.parse(data);

      for(const studentData of studentsArray) {
        const{name, year, email, specialization} = studentData;
        const newStudent = new Student (name, year, email, specialization);
        this.addStudent(newStudent);
      }
      console.log(`Data loaded from ${fileName}`);
    } catch (error) {
      console.error(`Error loading LinkedList from JSON: ${error.message}`);
    }
  }


   
}

module.exports = { LinkedList }
