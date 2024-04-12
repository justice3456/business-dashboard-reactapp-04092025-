//imports
import PropTypes from "prop-types";

//components

function DashboardTexts(props) {
    return (
        <>
            <h1 className="business-name">{props.pageTitle}</h1>
            <p className={props.salesPerWeek}>Sales for the last 7 days</p>
        </>
    )

}

export default DashboardTexts;