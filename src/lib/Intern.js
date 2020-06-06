// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern {
  constructor(name, email, id, school) {
    this.school = school;
  }
  getRole() {
    return this.constructor.name;
  }
  getSchool() {
    return this.school;
  }
}

module.exports = Intern;
