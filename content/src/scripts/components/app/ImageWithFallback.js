import React from 'react'

class ImageWithFallback extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			error: false
		}
	}

	handleLoadingError () {
		this.setState({
			error: true
		})
	}

	render() {
		const { fallback, src, className, style } = this.props

		return (

			<img 
				src={this.state.error ? fallback : src}
				onError={this.handleLoadingError.bind(this)}
				className={className}
				style={style}/>
			)
	}
}

export default ImageWithFallback