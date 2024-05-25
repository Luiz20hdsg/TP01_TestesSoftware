export class InvalidHealthProblemDegree extends Error {
    constructor() {
      super("The Health problem degree must be between 0 and 2");
    }
  }
  