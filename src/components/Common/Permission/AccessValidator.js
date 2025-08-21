import useAccessValidator from "./useAccessValidator";

function AccessValidator({
    requiredRoles,
    children,
    fallback = null,
    skeleton = null,
    onDenied,
    onAllowed,
}) {
    const isAllowed = useAccessValidator({ requiredRoles });

    if (isAllowed === undefined) {
        return skeleton;
    }

    if (isAllowed) {
        onAllowed?.();
        return children;
    } else {
        onDenied?.();
        return fallback;
    }
}

export default AccessValidator;
