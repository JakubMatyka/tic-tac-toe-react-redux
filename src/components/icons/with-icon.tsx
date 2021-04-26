export const withIcon = (WrappedComponent: React.ComponentClass | React.FunctionComponent) => {
	return function WithIcon(props: any) {
		return <WrappedComponent width={20} height={20} {...props} />
	}
}
