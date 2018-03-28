// import LikeAnimation from './animations/animationLike'
import React from 'react'
import { HeartFull, HeartEmpty } from '../common/Icons'
import { colors, fonts } from '../../lib/constants'

const LikeIcon = ({ hasLiked }) => (
	hasLiked 
		? 
		<HeartFull color={colors.primary}/> 
		: 
		<HeartEmpty color={colors.fontdark}/>
)

class LikeButton extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {

	}

	render() {
		const { numberOfLikes, likeFont, hasLiked, handleLike, id, cards, likes } = this.props

		return (
			<div 
				className="like-area"
				onClick={() => handleLike(id)}
				> 
				<LikeIcon hasLiked={hasLiked}/>
				<div className="num-likes"> {numberOfLikes}</div>

				<style jsx>{`
					.like-area {
						display: flex
				    justify-content: flex-start
				    align-items: center
					}
					.like-area:hover {
						cursor: pointer
					}

					.num-likes {
						margin-left: 8px
						font-size: 18px
						font-weight: ${fonts.medium}
						user-select: none
					}
				`}</style>
			</div>

			)
	}
}


export default LikeButton

//TODO Add lottie animation (window is not defined? bodymovin should work)
// <LikeAnimation start={true} />
