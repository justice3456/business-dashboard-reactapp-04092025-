//imports
import PropTypes from "prop-types";

//components

function DashboardTexts(props) {
    return (
        <>
            <h1 className="business-name">{props.pageTitle}</h1>
            <p className={props.salesPerWeek}>Sales per week</p>
        </>
    )

}

export default DashboardTexts;