import React from 'react';
let {Component} = React;
import { Row, Col } from 'react-bootstrap';

import './Privacy.css';

export default class PrivacyPolicy extends Component {
	render() {
	return (
		<Row>
			<Col xs={10} xsOffset={1} sm={10} smOffset={1} md={8} mdOffset={2}>
				<div id='ppHeader'>got.show Privacy Policy</div>
				<div id='ppBody'>
					<div className='ppConsistencies'>
						<div className='col-sm-2'>
							<div className="quick-links text-center">Information Collection</div>
						</div>
						<div className='col-sm-2'>
							<div className="quick-links text-center">Information Usage</div>
						</div>
						<div className='col-sm-2'></div>
						<div className='col-sm-2'>
							<div className="quick-links text-center">Cookie Usage</div>
						</div>
						<div className='col-sm-2'>
							<div className="quick-links text-center">3rd Party Disclosure</div>
						</div>
						<div className='col-sm-2'>
							<div className="quick-links text-center">3rd Party Links</div>
						</div>
						<div className='col-sm-2'></div>
						<div className='col-sm-2'></div>
					</div>
					<div className='style1'></div>
					<div className='ppConsistencies'>
						<div className='col-sm-2'>
							<div className="col-12 quick-links2 gen-text-center">Google AdSense</div>
						</div>
						<div className='col-sm-2'>
							<div className="col-12 quick-links2 gen-text-center">
								Fair Information Practices
								<div className="col-8 gen-text-left gen-xs-text-center style2">Fair information<br /> Practices</div>
							</div>
						</div>
						<div className='col-sm-2'>
							<div className="col-12 quick-links2 gen-text-center coppa-pad">
								COPPA
							</div>
						</div>
						<div className='col-sm-2'>
							<div className="quick-links2 gen-text-center">Our Contact Information<br /></div>
						</div>
					</div>
					<div className='style3'></div>
					<div className='innerText'>This privacy policy has been compiled to better serve those who are concerned with how their 'Personally identifiable information' (PII) is being used online. PII, as used in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website.<br /></div>
					<span id='infoCo'></span><br />
					<div className='grayText'><strong>What personal information do we collect from the people that visit our blog, website or app?</strong></div>
					<br />
					<div className='innerText'>We do not collect information from visitors of our site.</div>
					or other details to help you with your experience.
				</div>
				<br />
				<div className='grayText'><strong>When do we collect information?</strong></div>
				<br />
				<div className='innerText'>We collect information from you when you or enter information on our site.</div>
				<br /> <span id='infoUs'></span><br />
				<div className='grayText'><strong>How do we use your information? </strong></div>
				<br />
				<div className='innerText'> We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:<br /><br /></div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> To improve our website in order to better serve you.</div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> To allow us to better service you in responding to your customer service requests.</div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> To administer a contest, promotion, survey or other site feature.</div>
				<span id='coUs'></span><br />
				<div className='grayText'><strong>Do we use 'cookies'?</strong></div>
				<br />
				<div className='innerText'>We do not use cookies for tracking purposes </div>
				<div className='innerText'><br />You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser (like Internet Explorer) settings. Each browser is a little different, so look at your browser's Help menu to learn the correct way to modify your cookies.<br /></div>
				<br />
				<div className='innerText'>If you disable cookies off, some features will be disabled that make your site experience more efficient and some of our services will not function properly.</div>
				<br />
				<div className='innerText'>However, you can still place orders .</div>
				<br /><span id='trDi'></span><br />
				<div className='grayText'><strong>Third-party disclosure</strong></div>
				<br />
				<div className='innerText'>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</div>
				<span id='trLi'></span><br />
				<div className='grayText'><strong>Third-party links</strong></div>
				<br />
				<div className='innerText'>We do not include or offer third-party products or services on our website.</div>
				<span id='gooAd'></span><br />
				<div className='blueText'><strong>Google</strong></div>
				<br />
				<div className='innerText'>Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. https://support.google.com/adwordspolicy/answer/1316548?hl=en <br /><br /></div>
				<div className='innerText'>We use Google AdSense Advertising on our website.</div>
				<div className='innerText'><br />Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.<br /></div>
				<div className='innerText'><br /><strong>We have implemented the following:</strong></div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> Google Display Network Impression Reporting</div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> Demographics and Interests Reporting</div>
				<br />
				<div className='innerText'>We along with third-party vendors, such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website. </div>
				<div className='innerText'><br />Opting out:<br />
					Users can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising initiative opt out page or permanently using the Google Analytics Opt Out Browser add on.
				</div>
				<span id='coppAct'></span><br />
				<div className='blueText'><strong>COPPA (Children Online Privacy Protection Act)</strong></div>
				<br />
				<div className='innerText'>When it comes to the collection of personal information from children under 13, the Children's Online Privacy Protection Act (COPPA) puts parents in control.  The Federal Trade Commission, the nation's consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.<br /><br /></div>
				<div className='innerText'>We do not specifically market to children under 13.</div>
				<span id='ftcFip'></span><br />
				<div className='blueText'><strong>Fair Information Practices</strong></div>
				<br />
				<div className='innerText'>The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.<br /><br /></div>
				<div className='innerText'><strong>In order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:</strong></div>
				<div className='innerText'>We will notify the users via in-site notification</div>
				<div className='innerText'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <strong>&bull;</strong> Within 7 business days</div>
				<div className='innerText'><br />We also agree to the Individual Redress Principle, which requires that individuals have a right to pursue legally enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.</div>
				<span id='canSpam'></span><br />
				<div className='blueText'><strong>CAN SPAM Act</strong></div>
				<br />
				<div className='innerText'>The CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.<br /><br /></div>
				<div className='innerText'><strong>We collect your email address in order to:</strong></div>
				<div className='innerText'><br /><strong>To be in accordance with CANSPAM we agree to the following:</strong></div>
				<div className='innerText'><strong><br />If at any time you would like to unsubscribe from receiving future emails, you can email us at</strong></div>
				and we will promptly remove you from <strong>ALL</strong> correspondence.<br /><span id='ourCon'></span><br />
				<div className='blueText'><strong>Contacting Us</strong></div>
				<br />
				<div className='innerText'>If there are any questions regarding this privacy policy you may contact us using the information below.<br /><br /></div>
				<div className='innerText'>got.show</div>
				<div className='innerText'>Boltzmannstrasse, 3 </div>
				Garching, Bayern 85748
				<div className='innerText'>Germany</div>
				<div className='innerText'>christian.dallago@in.tum.de </div>
				<div className='innerText'><br />Last Edited on 2016-04-01</div>
			</Col>
		</Row>
	);
	}
}

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		