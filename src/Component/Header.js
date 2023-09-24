import React from "react";

const Header = (props) => {
    return (
        <header>
            <h1>{props.heading}</h1>
        </header>
    )
}
Header.defaultProps = {
    heading : "To Do List"
}
export default Header;