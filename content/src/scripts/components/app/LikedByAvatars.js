import React from 'react'
import { colors } from '../../lib/constants'

const LikedByAvatars = ({users, style}) => (
	<div style={style} className="LikedByAvatars">
		{users.map((avatar, index) => <div key={index} className="LikedByAvatars-avatar"><Avatar image={avatar} /></div>)}
		<style jsx global>{`
			.LikedByAvatars {
				display: flex;
				align-items: center;
			}
			.LikedByAvatars-avatar {
				margin-right: -8px;
			}
		`}
		</style>
	</div>
)

const AvatarPlaceholder = () => (
	<div className="avatarPlaceholder">
	<style jsx global>{`
			.avatarPlaceholder {
				background: ${colors.fontgrey};
				border-radius: 100px;
				height: 20px;
				width: 20px;
			}
		`}
	</style>
	</div>
)

const Avatar = ({image}) => (
	<div style={{background: 'url(' + image + ')', backgroundSize: 'contain'}}className="avatarImage">
		<style jsx global> {`
			.avatarImage {
				background: ${colors.fontgrey};
		    width: 20px;
		    height: 20px;
		    background-size: contain;
		    border-radius: 20px;
			}
		`}
		</style>
	</div>
)

export default LikedByAvatars