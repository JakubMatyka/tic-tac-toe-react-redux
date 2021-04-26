export const UPDATE_ALL_CHECKED = 'UPDATE_ALL_CHECKED'
export const UPDATE_SQUARES = 'UPDATE_SQUARES'
export const SET_NEXT_XO = 'SET_NEXT_XO'
export const UPDATE_WINNER = 'UPDATE_WINNER'
export const UPDATE_STATUS = 'UPDATE_STATUS'
export const UPDATE_WINS = 'UPDATE_WINS'
export const START_GAME = 'START_GAME'
export const RESET_GAME = 'RESET_GAME'
export const START_NEW_ROUND = 'START_NEW_ROUND'

export type ActionTypes =
	| { type: typeof UPDATE_ALL_CHECKED }
	| { type: typeof UPDATE_SQUARES; payload: number }
	| { type: typeof SET_NEXT_XO }
	| { type: typeof UPDATE_WINNER }
	| { type: typeof UPDATE_STATUS }
	| { type: typeof UPDATE_WINS }
	| { type: typeof START_GAME; payload: boolean }
	| { type: typeof RESET_GAME }
	| { type: typeof START_NEW_ROUND }

export const updateAllChecked = (): ActionTypes => ({ type: UPDATE_ALL_CHECKED })

export const updateSquares = (idx: number): ActionTypes => ({
	type: UPDATE_SQUARES,
	payload: idx,
})

export const setNextXO = (): ActionTypes => ({ type: SET_NEXT_XO })

export const updateWinner = (): ActionTypes => ({ type: UPDATE_WINNER })

export const updateStatus = (): ActionTypes => ({ type: UPDATE_STATUS })

export const updateWins = (): ActionTypes => ({ type: UPDATE_WINS })

export const startGame = (start: boolean): ActionTypes => ({ type: START_GAME, payload: start })

export const resetGame = (): ActionTypes => ({ type: RESET_GAME })

export const startNewRound = (): ActionTypes => ({ type: START_NEW_ROUND })
