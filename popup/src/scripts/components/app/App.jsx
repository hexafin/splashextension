import React, {Component} from 'react'
import {connect} from 'react-redux'
import { colors, defaults, fonts } from '../../lib/constants'
import Font from './Font'
import ColorPalette from './ColorPalette'

import pineapple from '../../../assets/pineapple.png'
const mockFonts = [{
  displayFontName: 'Braggadocio',
  actualFontName: 'Avenir Next',
  displayFontWeight: 'Bold',
  actualFontWeight: 400,
},
{
  displayFontName: 'Braggadocio2',
  actualFontName: 'Avenir Next',
  displayFontWeight: 'Bold',
  actualFontWeight: 400,
}]
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    console.log('hey dispatching', this.props)
    this.props.dispatch({
      type: 'GET_URL_DETAILS',
      url: 'pepperfilters.com'
    })
  }

  render() {
    console.log('props', this.props)
    return (
      <div className="wrapper">
       <div className="logo-header">
            <img className="logo" src={pineapple}></img>
            <div className="logo-slogan">We pineappled <strong>openai.com</strong> for you</div>
          </div>
        <div className="container">
          <div className="fonts">
            <div className="header">FONTS</div>
           {mockFonts.map(font => <Font key={font.displayFontName} {...font}/>)}
          </div>
          <div>
            <div className="header header-colors">COLORS</div>
            <ColorPalette {...this.props}/>
          </div>
        </div>
        <style jsx>{`
          .wrapper {
            font-family: ${fonts.primary}
          }
          .container {
            margin: 0
            text-rendering: optimizeLegibility
            -webkit-font-smoothing: antialiased
            -moz-osx-font-smoothing: grayscale
            width: 400px
            height: 300px
            padding: 15px 15px 15px
          }
          .logo-header {
            display: flex
            align-items: flex-end
            padding: 5px 13px 12px
            box-shadow: ${defaults.shadow}
          }
          .logo {
            width: 15px
            height: 26px
          }

          .logo-slogan {
            font-size: 14px
            margin-left: 9px
          }

          .header {
            font-size: 14px
            color: ${colors.fontgrey}
            margin-bottom: 8px
          }

          .header-colors {
            margin-top: 15px
          }



          `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.app
  };
};

export default connect(mapStateToProps)(App);
