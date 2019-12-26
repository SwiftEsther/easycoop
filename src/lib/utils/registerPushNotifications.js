import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

const PUSH_ENDPOINT = 'https://test_notifications_api.herokuapp.com/api/users';

// async function registerForPushNotificationsAsync(email = '', updateUser, pushTokenSaved) {
async function registerForPushNotificationsAsync(email = '', pushTokenSaved) {
    console.log(pushTokenSaved);
    if(pushTokenSaved){
        return
    }
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;


    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(token)

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
            email,
        }),
    }).then(function (response) {
        return response.json();
    }).then(function (myJson) {
        // updateUser({
        //     pushTokenSaved:true
        // })
        console.log(JSON.stringify(myJson));
    }).catch(error => {
        console.log(error)
    });

}

export { registerForPushNotificationsAsync }
