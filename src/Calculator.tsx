import React, { useState } from 'react';
import './Calculator.css'; // Import CSS file for styling

import axios from 'axios';

const Calculator: React.FC = () => {

const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiration: '',
    cvc: '',
    country: 'Australia'
    });  
    
    const [signInFormData, setSignInFormData] = useState({
      email: '',
      password: '',
    });

    const [expression, setExpression] = useState<string>('');
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>('signup');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Track login status
    const [memory, setMemory] = useState<number | null>(null);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
    };

    const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setSignInFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    };

  const handleButtonClick = (value: string) => {
    setExpression(prevExpression => prevExpression + value);
  };

  const handleCalculate = () => {
    try {
      const result = eval(expression);
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const handleClear = () => {
    setExpression('');
  };

  const handleGoPremiumClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:5291/api/SignUp', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setIsLoggedIn(true);
      console.log('Response:', response); // Log the entire response object


      if (response.status === 200) {
        console.log('Sign-up successful!');
        setIsLoggedIn(true);
        
      } else {
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5291/api/SignIn', signInFormData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        // Successful sign-in
        setShowPopup(false); // Close the sign-in popup
        setIsLoggedIn(true); // Set login status to true
      } else {
        // Unsuccessful sign-in
        // Show error message as a popup
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  const handleMemoryClear = () => {
    setMemory(null);
  };

  const handleMemoryRecall = () => {
    if (memory !== null) {
      setExpression(prevExpression => prevExpression + memory.toString());
    }
  };

  const handleMemoryStore = () => {
    try {
      const result = eval(expression);
      setMemory(parseFloat(result.toString()));
    } catch (error) {
      setMemory(null);
    }
  };

  const handleMemoryAdd = () => {
    try {
      const result = eval(expression);
      if (memory !== null) {
        setMemory(memory + parseFloat(result.toString()));
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleSquareRoot = () => {
    try {
      const result = Math.sqrt(parseFloat(expression));
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

  const handleSquare = () => {
    try {
      const result = parseFloat(expression) ** 2;
      setExpression(result.toString());
    } catch (error) {
      setExpression('Error');
    }
  };

// Render advanced calculator if user is logged in
if (isLoggedIn) {
  return (
    <div>
    <nav className="navbar">
      <div className="navbar-title">Web Calculator</div>
      <div className="navbar-right">
        <button className="premium-link" onClick={handleGoPremiumClick}>Go Premium</button>
      </div>
    </nav>
    <div className="calculator-container">
      <h2 className="calculator-title">Advanced</h2> {/* Title */}
      <div className="calculator">
        <input type="text" value={expression} readOnly className="result-input" />
        <div className="button-grid">
          <button onClick={handleMemoryClear}>MC</button>
          <button onClick={handleMemoryRecall}>MR</button>
          <button onClick={handleMemoryStore}>MS</button>
          <button onClick={handleMemoryAdd}>M+</button>

          <button onClick={handleSquareRoot}>√</button>
          <button onClick={handleSquare}>^2</button>

          <button onClick={() => handleButtonClick('7')}>7</button>
          <button onClick={() => handleButtonClick('8')}>8</button>
          <button onClick={() => handleButtonClick('9')}>9</button>
          <button onClick={() => handleButtonClick('+')}>+</button>

          <button onClick={() => handleButtonClick('4')}>4</button>
          <button onClick={() => handleButtonClick('5')}>5</button>
          <button onClick={() => handleButtonClick('6')}>6</button>
          <button onClick={() => handleButtonClick('-')}>-</button>

          <button onClick={() => handleButtonClick('1')}>1</button>
          <button onClick={() => handleButtonClick('2')}>2</button>
          <button onClick={() => handleButtonClick('3')}>3</button>
          <button onClick={() => handleButtonClick('*')}>*</button>

          <button onClick={() => handleButtonClick('0')}>0</button>
          <button onClick={() => handleButtonClick('.')}>.</button>
          <button onClick={handleCalculate}>=</button>
          <button onClick={handleClear}>C</button>
          <button onClick={() => handleButtonClick('/')}>/</button>
        </div>
      </div>
    </div>
  </div>
  );
}


  
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">Web Calculator</div>
        <div className="navbar-right">
          <button className="premium-link" onClick={handleGoPremiumClick}>Go Premium</button>
        </div>
      </nav>
      <div className="calculator-container">
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <div className="popup-header">
                <button className={activeTab === 'signup' ? 'active' : ''} onClick={() => handleTabChange('signup')}>Sign Up</button>
                <button className={activeTab === 'signin' ? 'active' : ''} onClick={() => handleTabChange('signin')}>Sign In</button>
                <button className="close-btn" onClick={handleClosePopup}>X</button>
              </div>
              {activeTab === 'signup' && (
                <div className="signup-form">
                  <h2>Sign Up</h2>
                  <form onSubmit={handleSignUp}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card">Card Number</label>
                      <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="Card Number" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiration">Expiration</label>
                      <input type="text" name="expiration" value={formData.expiration} onChange={handleInputChange} placeholder="Expiration (MM/YY)" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvc">CVC</label>
                      <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="CVC" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country">Country</label>
                      <select id="country" name="country">
                        <option value="australia" selected>Australia</option>
                        <option value="usa">USA</option>
                        <option value="canada">Canada</option>
                        {/* Add more options */}
                      </select>
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
              {activeTab === 'signin' && (
                <div className="signin-form">
                  <h2>Sign In</h2>
                  <form onSubmit={handleSignIn}>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" value={signInFormData.email} onChange={handleSignInInputChange} placeholder="Email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" value={signInFormData.password} onChange={handleSignInInputChange} placeholder="Password" />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}
         <h2 className="calculator-title">Basic</h2> {/* Title */}
        <div className="calculator">
          <input type="text" value={expression} readOnly className="result-input" />
          <div className="button-grid">
            <button onClick={() => handleButtonClick('7')}>7</button>
            <button onClick={() => handleButtonClick('8')}>8</button>
            <button onClick={() => handleButtonClick('9')}>9</button>
            <button onClick={() => handleButtonClick('+')}>+</button>

            <button onClick={() => handleButtonClick('4')}>4</button>
            <button onClick={() => handleButtonClick('5')}>5</button>
            <button onClick={() => handleButtonClick('6')}>6</button>
            <button onClick={() => handleButtonClick('-')}>-</button>

            <button onClick={() => handleButtonClick('1')}>1</button>
            <button onClick={() => handleButtonClick('2')}>2</button>
            <button onClick={() => handleButtonClick('3')}>3</button>
            <button onClick={() => handleButtonClick('*')}>*</button>

            <button onClick={() => handleButtonClick('0')}>0</button>
            <button onClick={() => handleButtonClick('.')}>.</button>
            <button onClick={handleCalculate}>=</button>
            <button onClick={handleClear}>C</button>
            <button onClick={() => handleButtonClick('/')}>/</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
