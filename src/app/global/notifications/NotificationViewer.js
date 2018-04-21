import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './notifications_styles.css';

class NotificationViewer extends Component {

    render() {
        const { notifications } = this.props;
        const showNotifications = notifications && notifications.length > 0;
        const viewerClasses = showNotifications ? 'notifications' : 'notifications-hidden';

        return (
            <div className={'notificationsHolder'}>

                <div className={viewerClasses}>
                    {showNotifications &&

                    notifications.map((notification) => {
                        return <div className={'notification'} key={notification.timeStamp}>
                            {notification.wording}
                        </div>
                    })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        notifications: state.notifications
    }
};
const mapActionsToProps = null; //{ listenForUserChanges, listenForUserArtworkChanges };
export default connect(mapStateToProps, mapActionsToProps)(NotificationViewer);