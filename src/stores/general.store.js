import {atom} from 'recoil'

export const theme = atom({
    key : "theme",
    default : "light"
})

export const roleUser = atom({
    key: 'role',
    default : "owner"
})