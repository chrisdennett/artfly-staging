import React, { Component } from "react";
import { connect } from 'react-redux';
// styles
import './notifications_styles.css';

const testNotification = { wording: 'Artwork Loading', timestamp: 1 };

class NotificationViewer extends Component {

    constructor(props) {
        super(props);

        this.state = { TESTnotifications: [testNotification] }
    }


    render() {
        const { TESTnotifications } = this.state;
        const { notifications } = this.props;

        console.log("notifications: ", notifications);

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