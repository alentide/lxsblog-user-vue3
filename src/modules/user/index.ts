export const UserTypes = {
    ADMIN: 'admin',
    USER: 'user',
    TOURIST: 'tourist',
} as const

export type UserType = typeof UserTypes[keyof typeof UserTypes]

class UserDto {
    id!: number
    username!: string
    email!: string
    type!: UserType
}

export class User {
    id: number = 0
    email: string = ''
    username: string = ''
    type: UserType = UserTypes.TOURIST
    constructor(data: UserDto) {
        Object.assign(this, data)
    }
}

export class EmptyUser extends User {
    constructor() {
        super({
            id: 0,
            username: '',
            email: '',
            type: UserTypes.TOURIST
        })
    }
}


