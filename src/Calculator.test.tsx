import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // Mock axios for API requests
import Calculator from './Calculator'; // Import the Calculator component

jest.mock('axios'); // Mock axios module

describe('Calculator Component', () => {
  test('renders basic calculator when user is not logged in', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    
    // Check if basic calculator elements are rendered
    expect(getByText('Web Calculator')).toBeInTheDocument();
    expect(getByText('Basic')).toBeInTheDocument();
    expect(getByPlaceholderText('0')).toBeInTheDocument();
    expect(getByText('+')).toBeInTheDocument();
    expect(getByText('=')).toBeInTheDocument();
  });

  test('renders advanced calculator when user is logged in', () => {
    // Mock isLoggedIn to true
    const { getByText } = render(<Calculator />);
    expect(getByText('Web Calculator')).toBeInTheDocument();
    expect(getByText('Advanced')).toBeInTheDocument();
    // Add more assertions for advanced calculator elements
  });

  test('performs addition operation correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const inputField = getByPlaceholderText('0');

    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('+'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    
    expect(inputField).toHaveValue('10');
  });

  test('handles form submission for sign-up', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const nameInput = getByPlaceholderText('Name');
    const emailInput = getByPlaceholderText('Email');
    // Add more inputs if needed

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    // Simulate form submission
    fireEvent.click(getByText('Submit'));

    // Wait for API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5291/api/SignUp',
        {
          name: 'John Doe',
          email: 'john@example.com',
          // Add more form data if needed
        },
        expect.any(Object) // Expecting options object
      );
    });
    // Add assertions for success or failure
  });

  test('handles form submission for sign-in', async () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    // Simulate form submission
    fireEvent.click(getByText('Submit'));

    // Wait for API call to resolve
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5291/api/SignIn',
        {
          email: 'john@example.com',
          password: 'password123',
          // Add more form data if needed
        },
        expect.any(Object) // Expecting options object
      );
    });
    // Add assertions for success or failure
  });

  test('performs subtraction operation correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const inputField = getByPlaceholderText('0');

    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('-'));
    fireEvent.click(getByText('3'));
    fireEvent.click(getByText('='));
    
    expect(inputField).toHaveValue('4');
  });

  test('handles memory operations correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const inputField = getByPlaceholderText('0');

    fireEvent.click(getByText('7'));
    fireEvent.click(getByText('M+'));
    fireEvent.click(getByText('C'));
    fireEvent.click(getByText('MR'));
    fireEvent.click(getByText('='));
    
    expect(inputField).toHaveValue('7');
  });

  test('calculates square root correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const inputField = getByPlaceholderText('0');

    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('√'));
    fireEvent.click(getByText('='));
    
    expect(inputField).toHaveValue('3');
  });

  test('handles error gracefully for invalid expressions', () => {
    const { getByText, getByPlaceholderText } = render(<Calculator />);
    const inputField = getByPlaceholderText('0');

    fireEvent.click(getByText('9'));
    fireEvent.click(getByText('/'));
    fireEvent.click(getByText('0'));
    fireEvent.click(getByText('='));
    
    expect(inputField).toHaveValue('Error');
  });


});
