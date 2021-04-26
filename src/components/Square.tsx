import { useDispatch, useSelector } from 'react-redux'
import {
	setNextXO,
	updateAllChecked,
	updateSquares,
	updateStatus,
	updateWinner,
} from '../store/actions'
import { Squares, Store } from '../store/types'
import { X } from './icons/x'
import { O } from './icons/o'

type Props = {
	index: number
}

export const Square = ({ index }: Props) => {
	const squares = useSelector((store: Store) => store.squares)
	const dispatch = useDispatch()

	const handleClick = () => {
		if (squares[index]) {
			return
		}
		dispatch(updateSquares(index))
		dispatch(setNextXO())
		dispatch(updateWinner())
		dispatch(updateStatus())
		dispatch(updateAllChecked())
	}

	const renderContent = (squares: Squares, index: number) => {
		if (!squares[index]) {
			return ''
		}
		return squares[index] === 'X' ? <X /> : <O />
	}

	return (
		<button className='square' onClick={handleClick}>
			{renderContent(squares, index)}
		</button>
	)
}
