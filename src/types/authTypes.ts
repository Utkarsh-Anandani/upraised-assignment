export interface authPayload {
    email: string,
    password: string
}

export interface jwtPayload {
    email: string,
    id: string,
    iat: number,
    exp: number
}