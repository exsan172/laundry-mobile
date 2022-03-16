import { atom } from 'recoil'
import moment from 'moment-timezone'

const today   = moment().tz("Asia/Jakarta").format('YYYY-MM-D')
const nextDay = moment().tz("Asia/Jakarta")
const next    = nextDay.format('D')
const nextDte = nextDay.format('YYYY-')+nextDay.format('MM-')+(parseInt(next)+1)

export const Transaction = atom({
    key: 'transaction',
    default: []
})

export const listEmploye = atom({
    key: 'employe',
    default: []
})

export const listStore = atom({
    key: 'store',
    default: []
})

export const fromDate = atom({
    key: 'fromDates',
    default: today
})

export const toDate = atom({
    key: 'toDates',
    default: nextDte
})

export const profitToday = atom({
    key: 'profitToday',
    default: 0
})

