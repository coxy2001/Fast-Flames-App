import { createContext, useState } from 'react';

const ClickContext = createContext(0, () => { });

export const ClickProvider = ({ children }) => {
    const [white, setWhite] = useState(0);
    const incrWhite = () => setWhite((amount) => amount + 1);

    const [red, setRed] = useState(0);
    const incrRed = () => setRed((amount) => amount + 1);

    const [blue, setBlue] = useState(0);
    const incrBlue = () => setBlue((amount) => amount + 1);

    const [orange, setOrange] = useState(0);
    const incrOrange = () => setOrange((amount) => amount + 1);

    return (
        <ClickContext.Provider value={[
            white,
            red,
            blue,
            orange,
            incrWhite,
            incrRed,
            incrBlue,
            incrOrange,
            ]}>
            {children}
        </ClickContext.Provider>
    );
};

export default ClickContext;