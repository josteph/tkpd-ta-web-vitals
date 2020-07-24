/**
 * Function to catch global errors that is caught by Error Boundary. This is required in automated test so Error Boundary still works as expected but the error it caught will still fails the test.
 */
export default function catchGlobalErrors() {
  afterEach(() => {
    if (global.errors && global.errors.length > 0) {
      const error = global.errors[0];
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(String(error));
    }
  });
}
