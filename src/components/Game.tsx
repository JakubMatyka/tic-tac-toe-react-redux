import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Board } from './Board'
import { resetGame, startGame, startNewRound, updateStatus, updateWins } from '../store/actions'
import { Store } from '../store/types'
import '../styles.scss'

export const Game = () => {
	const allChecked = useSelector((store: Store) => store.allChecked)
	const gameStarted = useSelector((store: Store) => store.gameStarted)
	const status = useSelector((store: Store) => store.status)
	const wins = useSelector((store: Store) => store.wins)
	const winner = useSelector((store: Store) => store.winner)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(updateStatus())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (winner) {
			dispatch(updateWins())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [winner])

	useEffect(() => {
		console.log(allChecked)
		if (allChecked) {
			// dispatch(startGame(false))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [allChecked])

	const handleGameReset = () => {
		dispatch(resetGame())
		dispatch(updateStatus())
	}

	const handleGameStart = () => {
		if (winner || allChecked) {
			dispatch(startNewRound())
			dispatch(updateStatus())
		}
		if (!allChecked) {
			dispatch(startGame(true))
		}
	}

	return (
		<>
			<div className='container'>
				<div className='game-info'>
					<div>{status}</div>
					<div>X: {wins.X} wins</div>
					<div>O: {wins.O} wins</div>
				</div>
				<div className='board-container'>
					<Board />
				</div>
				<div className='navigation'>
					<button
						className='start'
						onClick={handleGameStart}
						disabled={gameStarted && !allChecked && !winner}
					>
						{winner || gameStarted ? 'New round' : 'Start'}
					</button>
					<button onClick={handleGameReset}>Reset</button>
				</div>
			</div>
		</>
	)
}
