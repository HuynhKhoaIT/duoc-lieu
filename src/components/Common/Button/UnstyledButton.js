import classNames from "classnames";

import Box from "../Box";
import styles from "./UnstyledButton.module.scss";

function UnstyledButton({ component = "button", type = "button", className, children, ...props }) {
    return (
        <Box
            {...props}
            className={classNames(className, styles.root)}
            type={type}
            component={component}
        >
            {children}
        </Box>
    );
}

export default UnstyledButton;
