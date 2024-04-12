
function SuccessPopup({ message }) {
    return (
        
      <div className="popup-overlay-vertical">
        <div className="success-popup">
          <div className="success-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p className="sucess-message">{message}</p>
        </div>
      </div>
    );
  }

  export default SuccessPopup;
