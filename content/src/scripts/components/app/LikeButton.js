import React, {Component} from 'react'
import { HeartFull, HeartEmpty } from '../common/Icons'
import { colors, fonts } from '../../lib/constants'
import * as actionCreators from '../../actions/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//TODO Add lottie animation (window is not defined? bodymovin should work)
// <LikeAnimation start={true} />

const LikeButton = ({likes, hasLiked, handleLike, id}) => (

	<div 
		className="likeButton-area"
		onClick={() => handleLike(id)}
		> 
		<LikeIcon hasLiked={hasLiked}/>

		<div className="likeButton-numLikes"> {likes}</div>

		<style jsx global>{`
			.likeButton-area {
				display: flex;
		    justify-content: flex-start;
		    align-items: center;
			}
			.likeButton-area:hover {
				cursor: pointer;
			}

			.likeButton-numLikes {
				margin-left: 8px;
				margin-top: 2px;
				font-size: 16px;
				font-weight: ${fonts.medium};
				user-select: none;
			}
		`}</style>
	</div>

)

const LikeIcon = ({ hasLiked }) => (
	hasLiked 
		? 
		<HeartFull color={colors.primary}/> 
		: 
		<HeartEmpty color={colors.fontdark}/>
)

const mapStateToProps = state => {
	return {...state.user, ...state.app}
}


const mapDispatchToProps = dispatch => {
	return bindActionCreators(actionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(LikeButton)


