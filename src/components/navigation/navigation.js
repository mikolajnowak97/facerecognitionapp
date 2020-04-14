import React from 'react';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onRouteChange, isSignedIn } = this.props;
        if (isSignedIn) {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign out</p>
                </nav>)
        } else {
            return (
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p onClick={() => onRouteChange('demo')} className='f3 link dim black underline pa3 pointer'>Demo</p>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign in</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
                </nav>
            );
        }
    }
}
export default Navigation;