import { createStore } from 'redux'
import { calculateWinner } from '../utils'
import {
	ActionTypes,
	RESET_GAME,
	SET_NEXT_XO,
	START_GAME,
	START_NEW_ROUND,
	UPDATE_ALL_CHECKED,
	UPDATE_SQUARES,
	UPDATE_STATUS,
	UPDATE_WINNER,
	UPDATE_WINS,
} from './actions'
import { Squares, Store, Wins, XO } from './types'

const initialState = {
	allChecked: false,
	squares: Array(9).fill(null),
	xIsNext: true,
	winner: null,
	status: `Winner: ${null}`,
	wins: { X: 0, O: 0 },
	gameStarted: false,
	startingPlayer: 'X' as XO,
}

const updateAllChecked = (squares: Squares): boolean => {
	return [...squares].every((square) => square !== null)
}

const updateSquares = (
	squares: Squares,
	xIsNext: boolean,
	gameStarted: boolean,
	index: number,
): Squares => {
	if (!gameStarted) {
		alert('You should start game first!')
		return squares
	}
	const tempSquares = [...squares]

	return tempSquares.map((square, idx) =>
		index === idx ? (tempSquares[index] = xIsNext ? 'X' : 'O') : square,
	)
}

const setNextXO = (xIsNext: boolean): boolean => !xIsNext

const updateWinner = (squares: Squares): XO | null => calculateWinner(squares)

const updateStatus = (squares: Squares, winner: XO | null, xIsNext: boolean): string => {
	if (winner) {
		return `Winner: ${winner}`
	}

	const tempSquares = [...squares]
	const allChecked = tempSquares.every((square) => square !== null)

	if (!winner && allChecked) {
		return `It's a tie`
	}

	return `Next player: ${xIsNext ? 'X' : 'O'}`
}

const updateWins = (wins: Wins, winner: XO | null): Wins => {
	if (!winner) {
		return wins
	}
	let tempWins = { ...wins }
	winner === 'X' ? (tempWins.X = tempWins.X + 1) : (tempWins.O = tempWins.O + 1)

	return tempWins
}

const startGame = (start: boolean) => {
	return start
}

const resetGame = (): Store => initialState

const startNewRound = (startingPlayer: XO) => {
	return {
		squares: [...initialState.squares],
		winner: initialState.winner,
		startingPlayer: startingPlayer === 'X' ? ('O' as XO) : ('X' as XO),
	}
}

// Redux implementation
function gameReducer(store: Store = initialState, action: ActionTypes) {
	switch (action.type) {
		case UPDATE_ALL_CHECKED:
			return { ...store, allChecked: updateAllChecked(store.squares) }
		case UPDATE_SQUARES:
			return {
				...store,
				squares: updateSquares(
					store.squares,
					store.xIsNext,
					store.gameStarted,
					action.payload,
				),
			}
		case SET_NEXT_XO:
			return { ...store, xIsNext: setNextXO(store.xIsNext) }
		case UPDATE_WINNER:
			return {
				...store,
				winner: updateWinner(store.squares),
				wins: updateWins(store.wins, store.winner),
			}
		case UPDATE_STATUS:
			return { ...store, status: updateStatus(store.squares, store.winner, store.xIsNext) }
		case UPDATE_WINS:
			return { ...store, wins: updateWins(store.wins, store.winner) }
		case START_GAME:
			return { ...store, gameStarted: startGame(action.payload) }
		case RESET_GAME:
			return resetGame()
		case START_NEW_ROUND:
			return { ...store, ...startNewRound(store.startingPlayer) }
		default:
			return store
	}
}

const store = createStore(
	gameReducer,
	//@ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

export default store
