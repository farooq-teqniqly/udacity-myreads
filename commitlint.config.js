export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Restrict the allowed types
    "type-enum": [2, "always", ["feat", "fix", "docs", "refactor", "style", "test", "chore"]],
    // Ensure type is not empty
    "type-empty": [2, "never"],
    // Allow complete sentences and punctuation in the subject
    "subject-case": [0],
    // Ensure subject is not empty
    "subject-empty": [2, "never"],
    // Optional: Increase header max length if needed
    "header-max-length": [2, "always", 120],
    // Allow subject to end with punctuation
    "subject-full-stop": [0]
  },
};
