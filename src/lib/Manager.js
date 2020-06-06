// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
class Manager {
  constructor(name, id, email, officeNumber) {
    this.officeNumber = officeNumber;
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
  getRole() {
    return this.constructor.name;
  }
}

module.exports = Manager;
