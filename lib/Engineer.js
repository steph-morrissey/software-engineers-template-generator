// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer {
  constructor(name, id, email, github) {
    this.github = github;
  }
  getGithub() {
    return this.github;
  }
  getRole() {
    return this.constructor.name;
  }
}

module.exports = Engineer;
