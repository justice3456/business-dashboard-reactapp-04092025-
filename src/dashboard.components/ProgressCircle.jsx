//imports
import PropTypes from "prop-types";

//components
function ProgressCircle(props) {
  return (
    
      <div className={props.position}>
        <div className="circle">
          <div className="percentage">{props.percentage}</div>
          <div className="imported-circle">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="160px"
              height="160px"
            >
              <defs>
                <linearGradient id="GradientColor">
                  <stop offset="0%" stop-color="#e91e63" />
                  <stop offset="100%" stop-color="#673ab7" />
                </linearGradient>
              </defs>
              <circle cx="80" cy="80" r="40" stroke-linecap="round" />
            </svg>

          </div>
        </div>
      </div>
    
  );
}

export default ProgressCircle;
