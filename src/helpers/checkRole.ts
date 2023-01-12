export const checkRole = (allowedRoles: string[], role: string): Boolean => {
    return allowedRoles.includes(role);
}

