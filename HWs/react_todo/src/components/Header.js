import React from "react";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
        // this.handleClick = this.handleClick.bind(this);
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    render() {
        const { title, handleChange } = this.props;
        return (
            <>
                <h1 className={styles["header"]}>{title}</h1>
                <input type="text" placeholder="Todo..." value={this.state.message} onChange={this.handleChange} />
                <button
                    onClick={() => {
                        handleChange(this.state.message)
                        this.setState({message: ""});
                    }}
                />
            </>
        );
    }
}

export default Header;