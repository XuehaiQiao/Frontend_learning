import React from 'react';

export const myMemo = (Component) => {
    return class NewComponent extends React.Component {
        render() {
            return <Component {...this.props} />;
        }

        shouldComponentUpdate(nextProps) {
            if (this.props === nextProps) {
                return false;
            }
            return true;
        }
    };
};