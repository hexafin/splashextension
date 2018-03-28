import React from 'react'
import LikeButton from './LikeButton'
import BookmarkButton from './BookmarkButton'
import ScreenshotButton from './ScreenshotButton'
import LikedByAvatars from './LikedByAvatars'

const mockprops = {
	hasLiked: false,
	numberOfLikes: 12,
	handleLike: 2,
	id: 2,
}

const avatars = [
'https://pbs.twimg.com/profile_images/471133165336023041/-jap5Acy_normal.jpeg',
'https://pbs.twimg.com/profile_images/751015840464695296/atZxLCkV_normal.jpg',
'https://pbs.twimg.com/profile_images/946823287186665472/iNHVNpi4_normal.jpg',
]

const SocialSection = () => (
	<div className="socialSection">
		<div className="socialSection-left">
			<LikeButton hasLiked={false} numberOfLikes={122} id={2}/>
		  <LikedByAvatars style={{marginLeft: '10px'}} users={avatars} style={{marginLeft: '10px'}}/>
		</div>
		<div className="socialSection-right">
			<div><ScreenshotButton hasScreenshotted={false} /></div>
			<BookmarkButton hasBookmarked={true} id={3}/>
		</div>
	<style jsx global>{`
		.socialSection-right {
			display: flex;
    	width: 52px;
    	justify-content: space-between;
		}

		.socialSection-avatars {
			margin-left: 20px;
		}

		.socialSection-hint {
			position: absolute;
	    top: -27px;
	    right: 0;
	    font-size: 14px;
	    color: #a7a7a7;
	    right: 64px;
	    top: 2px;
	    line-height: 21px;
		}

		.socialSection {
			display: flex;
			position: relative;
			justify-content: space-between;
		}

		.socialSection * {
			display: flex;
			align-items: center;
		}

		.socialSection-left {
			display: flex;
		}

		`}
	</style>
	</div>
)

export default SocialSection