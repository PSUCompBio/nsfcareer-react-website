import React from 'react';
import Footer from '../../components/Footer';
import { getStatusOfDarkmode } from '../../reducer';
import WebFont from 'webfontloader';
import DarkMode from './../../components/DarkMode';
import './developer.css';

class DeveloperPage extends React.Component {
	componentDidMount() {
		// Scrolling the screen to top
		window.scrollTo(0, 0)

		if (getStatusOfDarkmode().status === true) {
			document.getElementsByTagName('body')[0].style.background = '#171b25';
				this.refs["h2"].style.color = '#fff';
                this.refs["developer-text"].style.color = '#fff';


		}

		let getHeight = document.querySelector('.navbar').clientHeight;
		getHeight = parseFloat(getHeight) - 20;
		document.querySelector(".developer_container").style.marginTop = getHeight + 'px';

		window.addEventListener('resize', this.resize);

		this.setContainerHeight();
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.resize);
	}

	resize = () => {
		let getHeight = document.querySelector('.navbar').clientHeight;
		getHeight = parseFloat(getHeight) - 20;
		document.querySelector(".developer_container").style.marginTop = getHeight + 'px';
	}

	setContainerHeight = () => {
		let docHeight = document.body.clientHeight;
		let headerHeight = document.querySelector('.navbar').clientHeight;
		let footerHeight = document.querySelector('.footer').clientHeight;
		let conatainerHeight = parseFloat(docHeight) - parseFloat(headerHeight) - parseFloat(footerHeight);
		document.querySelector(".developer_container").style.minHeight = conatainerHeight + 'px';
	}

  render() {
    return (
      <React.Fragment>
        <div className="developer_container contact__page-center-align">
          <div className="row mobile-section-top-fix pt-surface animated zoomIn">
            <div className="col-md-6 col-sm-6 request_block">
				<div>
					<h2 ref="h2" >SAMPLE API DOCUMENTATION</h2>
					<hr></hr>
				</div>
				<div>
					<p ref="developer-text" className="request_intro_txt">INTRODUCTION</p>
					<span ref="developer-text">To get simulations output</span>
					<hr></hr>
				</div>
				<div className="row">
					<div className="col-md-3 col-sm-3 get-blk">
						<span ref="developer-text" className="request_get_txt">GET</span>
					</div>
					<div className="col-md-3 col-sm-3">
						<span ref="developer-text" >http://dbtserver.com/api/v1/simulations</span>
					</div>
				</div>
				<hr></hr>
				<div>
					<span ref="developer-text" className="font_txt_bold">INPUT JSON</span>
					<hr></hr>
				</div>
				<div className="request_code_block">
					<pre>
						<code ref="developer-text" ><span class="p">{'{'}</span><span class="w">
						{'\n   '}</span><span class="s2">"playerId"</span><span class="p">:</span><span class="w"> </span><span class="err">Id of the player</span><span class="p">,</span><span class="w">
						{'\n   '}</span><span class="s2">"linearAcceleration"</span><span class="p">:</span><span class="w"> </span><span class="p">{'{'}</span><span class="w">
						{'\n      '}</span><span class="s2">"x"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of x-axis,</span><span class="w">
						{'\n      '}</span><span class="s2">"y"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of y-axis,</span><span class="w">
						{'\n      '}</span><span class="s2">"z"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of z-axis,</span><span class="w">
						{'\n   '}</span><span class="p">{'}'},</span><span class="w">
						{'\n   '}</span><span class="s2">"angularAcceleration"</span><span class="p">:</span><span class="w"> </span><span class="p">{'{'}</span><span class="w">
						{'\n      '}</span><span class="s2">"x"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of x-axis,</span><span class="w">
						{'\n      '}</span><span class="s2">"y"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of y-axis,</span><span class="w">
						{'\n      '}</span><span class="s2">"z"</span><span class="p">:</span><span class="w"> </span><span class="s2">value of z-axis,</span><span class="w">
						{'\n   '}</span><span class="p">{'}'}</span><span class="w">
						{'\n'}</span><span class="p">{'}'}</span><span class="w">
						{'\n'}</span></code>
					</pre>
				</div>
			</div>
            <div className="col-md-6 col-sm-6 response_block">
				<div className="response_title_block">
					<h2 className="response_title" >Response</h2>
					<hr></hr>
				</div>
				<div className="response_sub_block">
					<div>
						<span>200</span>
						<hr></hr>
					</div>
					<div>
						<span>Headers</span>
						<hr></hr>
					</div>
					<div>
						<p><span className="res_headers_titls">Content-Type: </span><span>application/json</span></p>
						<p><span className="res_headers_titls">X-My-Header: </span><span>The Value</span></p>
						<hr></hr>
					</div>
					<div>
						<span>Body</span>
						<hr></hr>
					</div>
					<div className="response_code_block">
						<pre>
							<code><span class="p">{'{'}</span><span class="w">
							{'\n   '}</span><span class="s2">"isSuccess"</span><span class="p">:</span><span class="w"> </span><span class="err">true</span><span class="p">,</span><span class="w">
							{'\n   '}</span><span class="s2">"status"</span><span class="p">:</span><span class="w"> </span><span class="s2">"200"</span><span class="p">,</span><span class="w">
							{'\n   '}</span><span class="s2">"data"</span><span class="p">:</span><span class="w"> </span><span class="p">[</span><span class="w">
							{'\n       '}</span><span class="kc">"List of base64 code of simulation output images"</span><span class="w"><span class="w">
							{'\n   '}</span><span class="p">]</span>
							{'\n'}</span><span class="p">{'}'}</span><span class="w">
							{'\n'}</span></code>
						</pre>
					</div>
				</div>
            </div>
          </div>
        </div>
        <DarkMode isDarkMode={this.props.isDarkModeSet} />

        <Footer />
      </React.Fragment>
    );
  }
}

export default DeveloperPage;
