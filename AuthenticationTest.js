// Import necessary modules and dependencies
const Moralis = require('moralis');
const { login } = require('./main'); // Assuming your authentication function is in a separate file

// Mock Moralis authentication function
jest.mock('moralis', () => ({
  authenticate: jest.fn(),
  start: jest.fn()
}));

describe('Authentication Test', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mock calls before each test
  });

  it('should authenticate user successfully', async () => {
    // Mock successful authentication response
    Moralis.authenticate.mockResolvedValueOnce({ username: 'testuser', email: 'test@example.com' });

    // Call the login function
    await login();

    // Expect Moralis.authenticate to be called with expected parameters
    expect(Moralis.authenticate).toHaveBeenCalledWith({ signingMessage: 'Hello World!' });

    // Expect Moralis.enableWeb3 to be called
    expect(Moralis.enableWeb3).toHaveBeenCalled();

    // You can add more assertions as needed
  });

  it('should handle authentication failure', async () => {
    // Mock authentication failure response
    const error = new Error('Authentication failed');
    Moralis.authenticate.mockRejectedValueOnce(error);

    // Call the login function
    await login();

    // Expect Moralis.authenticate to be called with expected parameters
    expect(Moralis.authenticate).toHaveBeenCalledWith({ signingMessage: 'Hello World!' });

    // Expect error handling logic to be triggered
    // For example, check if appropriate error messages are logged or displayed to the user
  });

  // Add more test cases for different authentication scenarios (e.g., invalid credentials, network errors) if needed
});
