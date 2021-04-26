export type XO = 'X' | 'O'
export type Wins = { X: number; O: number }
export type Square = XO
export type Squares = Square[]

export interface Store {
	allChecked: boolean
	squares: Squares
	xIsNext: boolean
	winner: XO | null
	status: string
	wins: Wins
	gameStarted: boolean
	startingPlayer: XO
}
