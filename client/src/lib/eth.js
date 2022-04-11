const getEth = () => {
    const {ethereum} = window;
    if (!ethereum) {
        alert("Wallet not detected. Make sure you have Metamask extension installed and activated.");
    }
    return ethereum;
};

export const withEth = (f) => async (props) => {
    try {
        const ethereum = getEth();
        await f(ethereum, props);
    } catch (error) {
        console.error(error);
    }
};
