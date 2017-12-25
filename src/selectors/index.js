import { createSelector } from 'reselect'

const getCounter= state => state.counter

export const counterSelector = createSelector(
    getCounter,
    (counter) => counter
)
