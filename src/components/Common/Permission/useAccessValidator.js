import { useAppContext } from "@/contexts";

const defaultValidator = (userRole, requiredRoles) => {
    return requiredRoles.some((role) => userRole === role);
};

function useAccessValidator({ requiredRoles, validator = defaultValidator } = {}) {
    const { activeRole } = useAppContext();

    if (!activeRole) {
        return undefined;
    }

    return validator(activeRole, requiredRoles);
}

export default useAccessValidator;
