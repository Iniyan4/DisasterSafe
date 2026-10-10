
import NetInfo from '@react-native-community/netinfo';

export async function isInternetAvailable():
    Promise<boolean> {
    const state = await NetInfo.fetch();

    return (
        state.isConnected === true &&
        state.isInternetReachable === true
    );
}

export function subscribeToNetwork(
    callback: (online: boolean) => void
) {
    return NetInfo.addEventListener((state) => {
        callback(
            state.isConnected === true &&
            state.isInternetReachable === true
        );
    });
}
