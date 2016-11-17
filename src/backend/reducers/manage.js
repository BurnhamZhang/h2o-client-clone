import {MANAGE_LEAVE,MANAGE_LOGIN,MANAGE_RECEIVE_ORDERS } from '../actions/manage';

export default function example(state = {
  order: {},
  courier: {}
}, action) {
  switch (action.type) {
    case MANAGE_RECEIVE_ORDERS:
      return Object.assign({}, state, {
        order:action.payload
      })
      break;
    default:
      return state
  }
}
