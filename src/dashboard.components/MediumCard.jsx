//imports
import PropTypes from "prop-types";

//components
function MediumCard(props) {
  return (
    <div className="medium-card">
      <div className={props.classname}>
        <h2>{props.cardName}</h2>
        <p className="card-description">{props.cardDescription}</p>
        <p className="card-price">{props.displayValue}</p>
        <p className={props.circleHeader}>{props.cardHeaderValue}</p>
        {/**CURRENT */}
        <div className={props.cardPosition}>
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
        {/**CURRENT */}

        {/**TARGET */}
        <div className={props.cardPosition1}>
          <div className="circle">
            <div className="percentage">{props.percentage1}</div>
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
        {/**TARGET */}

        {/**BEST */}
        <div className={props.cardPosition2}>
          <div className="circle">
            <div className="percentage">{props.percentage2}</div>
            <div className="imported-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="160px"
                height="160px"
              >
                <defs>
                  <linearGradient id="GradientColor">
                    <stop offset="0%" stopColor="#e91e63" />
                    <stop offset="100%" stopColor="#673ab7" />
                  </linearGradient>
                </defs>
                <circle cx="80" cy="80" r="40" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
        {/**BEST */}
      </div>
    </div>
  );
}

export default MediumCard;
