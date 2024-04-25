import React, { useState } from 'react';
import './Calculator.css'; // Import CSS file for styling

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('signup');

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

  const handleSignUp = () => {
    // Implement sign-up logic
  };

  const handleSignIn = () => {
    // Implement sign-in logic
  };

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
                      <input type="text" id="name" name="name" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="card">Card Number</label>
                      <input type="text" id="card" name="card" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="expiration">Expiration</label>
                      <input type="text" id="expiration" name="expiration" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvc">CVC</label>
                      <input type="text" id="cvc" name="cvc" />
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
                      <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input type="password" id="password" name="password" />
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
