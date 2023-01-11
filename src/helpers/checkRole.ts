import { RoleDTO } from "../role/role.dto";

export const checkRole = (allowedRoles: string[], roles: RoleDTO[]): Boolean => {
    return roles.every((role: RoleDTO) => allowedRoles.includes(role.name));
}

