import React from 'react';
let {Component} = React;
import { Row,Col, Grid } from 'react-bootstrap';
import AntagonistsComp from '../../common/AntagonistsComp/AntagonistsComp.jsx';
import './Start.css';
import logo from './gotstatslogosmall.jpg';
import HomepageBlog from '../../../../config/markdown/home-blog.md';
export default class Start extends Component {
render() {
return (
<Grid>
  <div className="home">
    <Row fluid>
    <Col>
    <div className="header-image" />
      </Col>
      </Row>
      <Row>
      <Col>
      <AntagonistsComp />
        </Col>
        </Row>
        <Row className="stats-home">
        <Col xs={10} xsOffset={1} sm={3} smOffset={2}>
        <img src={logo} className="start-logo" />
        </Col>
        <Col xs={10} xsOffset={1} sm={5} smOffset={0}>
        <h1>Life, death and statistics in Westeros</h1>
        <p className="lead">While we all wait for the Winds of Winter to come out, we figured that it will be pretty cool
        to design some machine learning algorithm that will answer the question that is on every Game of Thrones’ fan mind - which character is likelier to die next?</p>
        </Col>
        </Row>
        <hr>

        <Row className="stats-home">
        <Col xs={10} xsOffset={1} sm={5} smOffset={0}>
        <h1><a href="https://www.got.show/why-jon-snow-is-not-dead">Why Jon Snow is not dead</a></h1>
        <p className="lead">“The past is already written, the ink is dry” – so says the teaser for the sixth season of the popular TV show Game of Thrones. And until recently, that’s what we at got.show believed too. It was nine long months ago, dudring the season five finale (“Mother’s Mercy”) that we saw our favorite character Jon Snow join his father in GoT heaven however. But now we have reason to believe that he’s going to stick around on earth with the rest of us for just a little longer. You don’t think so? Well .. you know nothing, Jon Snow. <a href="https://www.got.show/why-jon-snow-is-not-dead">Read more</a></p>
        </Col>
        <Col xs={10} xsOffset={1} sm={3} smOffset={2}>
        <a href="https://www.got.show/why-jon-snow-is-not-dead">
        <img className="start-logo" alt="Official Announcement poster for the sixth season Game of Thrones, featuring Jon Snow." src="http://www.hbo.com/custom-assets/img/series/game-of-thrones/season-6-tease.jpg"/></a>
        </Col>
        </Row>
        <hr>

        <Row className="stats-home">
        <Col xs={10} xsOffset={1} sm={3} smOffset={0}>
        <a href="https://got.show/Why-Daenerys-Targaryen-will-win-the-Game-of-Thrones">
        <img className="start-logo" alt="Daenerys Targaryen. Game of Thrones‘ mother of dragons." src="http://vignette1.wikia.nocookie.net/gameofthrones/images/5/58/Daenerys-Targaryen.jpg/revision/latest?cb=20141202204150&amp;path-prefix=de"/></a>
        </Col>
        <Col xs={10} xsOffset={1} sm={5} smOffset={2}>
        <h1><a href="https://got.show/Why-Daenerys-Targaryen-will-win-the-Game-of-Thrones">Why Daenerys Targaryen will win the Game of Thrones</a></h1>
        <p className="lead">Daenerys. Khaleesi. Mother of Dragons. Mhysa - a queen with a growing list titles and an even bigger list of reasons to take her seriously.
          Ever since king Robert dethroned the Targaryens, she has been seeking for a way to win back the Iron Throne.
          Let’s face it, the moment Daenerys let Drogo  kill her (admittedly annoying) brother, that's when we all knew that this young girl is
          playing to win. Here is why we believe that soon she be sitting on the Iron Throne. <a href="https://got.show/Why-Daenerys-Targaryen-will-win-the-Game-of-Thrones">Read more</a></p>
          </Col>
          </Row>
          <hr>
          <Row className="stats-home">
          <Col xs={10} xsOffset={1} sm={5} smOffset={0}>
          <h1>
          <a href="https://got.show/House-Stark-in-Game-of-Thrones">
          Will Bran, Arya &amp; Sansa be the last of their kind in Game of Thrones?</a></h1>
          <p className="lead">House Stark of Winterfell has been having kind of a rough patch lately, don’t you think so? Although “rough patch” is
            quite the understatement when you’re talking about multiple fatalities in the family. And “lately” refers to the
            very first season of Game of Thrones, where we all taught an impressive lesson on how little George R.R. Martin cares
            about his main characters.It seems like winter’s been coming and staying for Bran, Arya and Sansa. But what exactly have they been up to lately – and where are they heading?<a href="https://got.show/House-Stark-in-Game-of-Thrones">Read more</a></p>
            </Col>
            <Col xs={10} xsOffset={1} sm={3} smOffset={2}>
            <a href="https://got.show/House-Stark-in-Game-of-Thrones">
            <img className="start-logo" alt="Where are Arya, Sansa and Bran." src="images/sansa_bran_arya_map.png" /></a>
            </Col>
            </Row>
            <hr>
            <Row className="stats-home">
            <Col xs={10} xsOffset={1} sm={3} smOffset={0}>
            <a href="https://got.show/When-Theon-Met-Ramsay">
            <img className="start-logo" alt="Theon Greyjoy and Ramsay Snow at play" src="https://i.ytimg.com/vi/in0eB7N5pNM/maxresdefault.jpg"/></a>
            </Col>
            <Col xs={10} xsOffset={1} sm={5} smOffset={2}>
            <h1><a href="https://got.show/When-Theon-Met-Ramsay">When Theon Met Ramsay</a></h1>
            <p className="lead">Ahh! Theon and Ramsay, Ramsay and Theon... There used to be a time when Theon was prince and Ramsay was but a servant to that prince. Back then, Ramsay was called Reek (because he stank) and he did Theon's bidding. But, all of a sudden, the tables have turned on Theon and from being a self-proclaimed Prince of Winterfell, he was a captive at the Dreadfort, propped up to be The bastard of Bolton's personal pet. From then on, Theon was Reek and Reek was Ramsay. And as Theon was sinking lower and lower (and losing some vital body parts), Ramsay was rising in the world. <a href="https://got.show/When-Theon-Met-Ramsay">Read more</a></p>
            </Col>
            </Row>
          </div>
        </Grid>
        );
        }
        }
