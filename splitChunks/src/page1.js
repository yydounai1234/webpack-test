import { add,isFullMark } from './utils'

export const mark = add(80)

import(/* webpackChunkName: "async" */ './async').then(_ => {
    console.log(_)
    console.log('test')
}).catch(err => {
    console.log(err)
})