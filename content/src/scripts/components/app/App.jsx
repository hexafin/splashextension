import React, {Component} from 'react'
import {connect} from 'react-redux'
import { colors, defaults, fonts } from '../../lib/constants'
import Font from './Font'
import ColorPalette from './ColorPalette'
import StyleReset from './StyleReset'
import pineapple from '../../../assets/pineapple2.png'
import FontSection from './FontSection'
import ColorSection from './ColorSection'
import TrafficSection from './TrafficSection'
import SocialSection from './SocialSection'
import { BoxArrow } from '../common/Icons'
import FullPagePreview from './FullPagePreview'
import ImageWithFallback from './ImageWithFallback'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('props', this.props)
    const { loadingUrlData,
            siteData,
            url,
            fullPagePreview,
            screenshotInProgress,
            screenshotPreview
          } = this.props
    const showFonts = () => (
      <div className="pa-container">
      <div className="FontAndPreviewSection">
          <FontSection />
          <FullPagePreview image={fullPagePreview}/>
      </div>
          <ColorSection />
          <SocialSection />
      </div>

    )

    const showLoader = () => (
      <div> LOADING FUCK </div>
    )

    const getFaviconUrl = () => {
      const link = document.querySelector("link[rel*='icon']")
      console.log('link', link)
      if (link) {
        return link.href
      } else {
        return ''
      }
    }


    return (
      <StyleReset>
      <HideIfScreenshot screenshotInProgress={screenshotInProgress}>
        
        <div className="logo-header">
            <div className="logo-slogan">We are pineappleing <span>{url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")}</span></div>
            <ImageWithFallback 
              className="logo-siteFavicon" 
              src={getFaviconUrl()} 
              fallback="https://cdn-static-1.medium.com/_/fp/icons/favicon-rebrand-medium.3Y6xpZ-0FSdWDnPM3hSBIA.ico"
            />
          </div>
         {screenshotPreview && <img style={{maxWidth: "100%"}} src={screenshotPreview.imgUrl}/>}
        {!loadingUrlData && showFonts()}
        {loadingUrlData && showLoader()}
      </HideIfScreenshot>

        <style jsx global>{`
          
          .pa-container {
            margin: 0;
            padding: 15px 20px 20px;
          }

          .FontAndPreviewSection {
            display: flex;
            justify-content: space-between;
          }

          .logo-header {
            display: flex;
            align-items: flex-end;
            padding: 10px 20px;
            justify-content: space-between;
            box-shadow: ${defaults.shadow};
          }

          .logo-siteFavicon {
            height: 18px;
            width: 18px;
            border-radius: 2px;
          }

          .logo-img {
            width: 15px;
            height: 26px;
          }

          .logo-slogan {
            font-size: 14px;
          }

          .logo-slogan span {
            font-weight: 600;
          }


          `}
        </style>
      </StyleReset>
    );
  }
}

const HideIfScreenshot = ({screenshotInProgress, children}) => {
  return !screenshotInProgress ? <div>{children}</div> : <div></div>
}


const mapStateToProps = (state = initialState) => {
  return {
    ...state.app,
    ...state.user,
  };
};

export default connect(mapStateToProps)(App);
