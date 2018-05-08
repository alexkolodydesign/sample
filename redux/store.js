import nextConnectRedux from 'next-connect-redux'
import { initStore } from './actions'

export const nextConnect = nextConnectRedux(initStore)
