import React, { Component } from 'react'
import { BookmarkFull, BookmarkEmpty } from '../common/Icons'
import { colors, fonts } from '../../lib/constants'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/user'

//TODO Add lottie animation (window is not defined? bodymovin should work)
// <LikeAnimation start={true} />

const BookmarkButton = ({ hasBookmarked, handleBookmark, id}) =>  (

	<div 
		className="BookmarkButton-area"
		onClick={() => handleBookmark(id)}
		> 
		
		<BookmarkIcon
			hasBookmarked={hasBookmarked}/>

		<style jsx global>{`
			.BookmarkButton-area {
				display: flex;
		    justify-content: flex-start;
		    align-items: center;
			}
		
			.BookmarkButton-area:hover {
				cursor: pointer;
			}

			.BookmarkButton-numBookmarks {
				margin-left: 8px;
				margin-top: 2px;
				font-size: 16px;
				font-weight: ${fonts.medium};
				user-select: none;
			}
		`}</style>
	</div>

)

const BookmarkIcon = ({ hasBookmarked }) => (
	hasBookmarked 
		? 
		<BookmarkFull color={colors.primary}/> 
		: 
		<BookmarkEmpty color={colors.fontdark}/>
)

const mapStateToProps = state => {
	return {...state.user, ...state.app}
}


const mapDispatchToProps = dispatch => {
	return bindActionCreators(actionCreators, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(BookmarkButton)



