import React from "react";

// export const Splash = () => (
// 	<svg
// 		width="15px"
// 		height="20px"
// 		viewBox="0 0 15 20"
// 		version="1.1"
// 		xmlns="http://www.w3.org/2000/svg"
// 	>
// 		<g
// 			id="Page-1"
// 			stroke="none"
// 			strokeWidth="1"
// 			fill="none"
// 			fillRule="evenodd"
// 		>
// 			<g
// 				id="Desktop-HD-Copy-4"
// 				transform="translate(-232.000000, -39.000000)"
// 				fill="#4D00FF"
// 			>
// 				<g id="Group-Copy" transform="translate(232.000000, 39.000000)">
// 					<path
// 						d="M7.41176471,19.9314457 C11.5051693,19.9314457 14.8235294,16.6550638 14.8235294,12.613442 C14.8235294,8.57182015 8.80386266,0.105358705 7.41176471,0.105358705 C6.01966675,0.105358705 0,8.57182015 0,12.613442 C0,16.6550638 3.31836009,19.9314457 7.41176471,19.9314457 Z"
// 						id="Oval-3"
// 					/>
// 				</g>
// 			</g>
// 		</g>
// 	</svg>
// );

export const SplashSmile = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="34"
		height="44"
		viewBox="0 0 34 44"
	>
		<defs>
			<path
				id="splashsmile-a"
				d="M16.8070556,42.8546603 C25.7579665,42.8546603 33.0141135,35.9087312 33.0141135,27.3404934 C33.0141135,18.7722556 19.8511096,0.823358438 16.8070556,0.823358438 C13.7630016,0.823358438 0.599997759,18.7722556 0.599997759,27.3404934 C0.599997759,35.9087312 7.85614472,42.8546603 16.8070556,42.8546603 Z"
			/>
			<filter
				id="splashsmile-b"
				width="158.6%"
				height="145.2%"
				x="-29.3%"
				y="-20.2%"
				filterUnits="objectBoundingBox"
			>
				<feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1" />
				<feGaussianBlur
					in="shadowOffsetOuter1"
					result="shadowBlurOuter1"
					stdDeviation="3"
				/>
				<feColorMatrix
					in="shadowBlurOuter1"
					values="0 0 0 0 0.24736926   0 0 0 0 0.24736926   0 0 0 0 0.24736926  0 0 0 0.0777287138 0"
				/>
			</filter>
			<linearGradient
				id="splashsmile-c"
				x1="100%"
				x2="17.895%"
				y1="123.362%"
				y2="-6.546%"
			>
				<stop offset="0%" />
				<stop offset="100%" />
				<stop offset="100%" />
			</linearGradient>
			<path
				id="splashsmile-f"
				d="M9.98252999,31.9418851 C14.5828084,35.4513963 19.3460065,35.4513963 24.2721244,31.9418851"
			/>
			<filter
				id="splashsmile-e"
				width="724.5%"
				height="3490.4%"
				x="-312.3%"
				y="-1467.3%"
				filterUnits="objectBoundingBox"
			>
				<feMorphology
					in="SourceAlpha"
					operator="dilate"
					radius="1.12"
					result="shadowSpreadOuter1"
				/>
				<feOffset
					dy="6"
					in="shadowSpreadOuter1"
					result="shadowOffsetOuter1"
				/>
				<feMorphology
					in="SourceAlpha"
					radius="1.12"
					result="shadowInner"
				/>
				<feOffset dy="6" in="shadowInner" result="shadowInner" />
				<feComposite
					in="shadowOffsetOuter1"
					in2="shadowInner"
					operator="out"
					result="shadowOffsetOuter1"
				/>
				<feGaussianBlur
					in="shadowOffsetOuter1"
					result="shadowBlurOuter1"
					stdDeviation="13.5"
				/>
				<feColorMatrix
					in="shadowBlurOuter1"
					values="0 0 0 0 0.24736926   0 0 0 0 0.24736926   0 0 0 0 0.24736926  0 0 0 0.0777287138 0"
				/>
			</filter>
		</defs>
		<g fill="none" fillRule="evenodd">
			<mask id="splashsmile-d" fill="#fff">
				<use xlinkHref="#splashsmile-a" />
			</mask>
			<use
				fill="#000"
				filter="url(#splashsmile-b)"
				xlinkHref="#splashsmile-a"
			/>
			<use fill="#4D00FF" xlinkHref="#splashsmile-a" />
			<path
				fill="url(#splashsmile-c)"
				d="M13.1722987,11.1281287 L16.8070556,0.599997997 C28.897249,10.3824809 34.3752179,19.4968695 33.2409621,27.943164 C31.5395785,40.6126057 27.3444171,43.5946073 16.5891878,42.6849789 C9.41903496,42.07856 8.28007191,31.5596099 13.1722987,11.1281287 Z"
				mask="url(#splashsmile-d)"
				opacity=".08"
			/>
			<g
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<use
					fill="#000"
					filter="url(#splashsmile-e)"
					xlinkHref="#splashsmile-f"
				/>
				<use
					stroke="#FFF"
					strokeWidth="2.24"
					xlinkHref="#splashsmile-f"
				/>
			</g>
		</g>
	</svg>
);

export const Lock = () => (
	<svg
		width="10px"
		height="13px"
		viewBox="0 0 7 9"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<g
			id="Page-1"
			stroke="none"
			strokeWidth="1"
			fill="none"
			fillRule="evenodd"
		>
			<g
				id="Splash-Extension"
				transform="translate(-85.000000, -297.000000)"
				fill="#C9C9C9"
			>
				<g
					id="Starting-Screen"
					transform="translate(45.000000, 35.000000)"
				>
					<g
						id="Group-4"
						transform="translate(40.000000, 261.000000)"
					>
						<path
							d="M1.92857126,5.37142897 L5.01428528,5.37142897 L5.01428528,4.21428621 C5.01428528,3.78839126 4.86361716,3.42477886 4.56227639,3.12343809 C4.26093563,2.82209733 3.89732322,2.6714292 3.47142827,2.6714292 C3.04553332,2.6714292 2.68192092,2.82209733 2.38058015,3.12343809 C2.07923939,3.42477886 1.92857126,3.78839126 1.92857126,4.21428621 L1.92857126,5.37142897 Z M6.94285655,5.95000035 L6.94285655,9.42142862 C6.94285655,9.5821437 6.88660711,9.71874946 6.77410656,9.83125001 C6.66160601,9.94375057 6.52500024,10 6.36428517,10 L0.578571379,10 C0.417856303,10 0.281250538,9.94375057 0.168749985,9.83125001 C0.0562494327,9.71874946 0,9.5821437 0,9.42142862 L0,5.95000035 C0,5.78928527 0.0562494327,5.65267951 0.168749985,5.54017896 C0.281250538,5.4276784 0.417856303,5.37142897 0.578571379,5.37142897 L0.771428505,5.37142897 L0.771428505,4.21428621 C0.771428505,3.47499687 1.0366044,2.84018184 1.56696415,2.30982209 C2.0973239,1.77946234 2.73213893,1.51428644 3.47142827,1.51428644 C4.21071762,1.51428644 4.84553265,1.77946234 5.37589239,2.30982209 C5.90625214,2.84018184 6.17142804,3.47499687 6.17142804,4.21428621 L6.17142804,5.37142897 L6.36428517,5.37142897 C6.52500024,5.37142897 6.66160601,5.4276784 6.77410656,5.54017896 C6.88660711,5.65267951 6.94285655,5.78928527 6.94285655,5.95000035 Z"
							id="lock---FontAwesome"
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
);

export const Cross = () => (
	<svg
		width="14px"
		height="14px"
		viewBox="0 0 14 14"
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
	>
		<title>Group 11</title>
		<desc>Created with Sketch.</desc>
		<defs>
			<path d="M0,14 L14,0" id="splashCross-path-1" />
			<path d="M0,14 L14,0" id="splashCross-path-3" />
		</defs>
		<g id="splashCross-Path-6">
			<use
				stroke="#C9C9C9"
				strokeWidth="1.42999998"
				xlinkHref="#splashCross-path-1"
			/>
		</g>
		<g
			id="splashCross-Path-6-Copy"
			transform="translate(7.00000, 7.00000) rotate(90.000000) translate(-7.00000, -7.00000) "
		>
			<use
				stroke="#C9C9C9"
				strokeWidth="1.42999998"
				xlinkHref="#splashCross-path-3"
			/>
		</g>
	</svg>
);
