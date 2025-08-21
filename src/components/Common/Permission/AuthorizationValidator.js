import AccessValidator from "./AccessValidator";

function AuthorizationValidator({
    requiredRoles,
    children,
    fallback = null,
    skeleton = null,
    onDenied,
    onAllowed,
}) {
    if (!requiredRoles?.length) {
        return children;
    }

    return (
        <AccessValidator
            requiredRoles={requiredRoles}
            fallback={fallback}
            skeleton={skeleton}
            onDenied={onDenied}
            onAllowed={onAllowed}
        >
            {children}
        </AccessValidator>
    );
}

export default AuthorizationValidator;
