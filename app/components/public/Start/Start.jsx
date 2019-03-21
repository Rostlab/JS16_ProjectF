import React from 'react';
let {Component} = React;
import { Row,Col, Grid } from 'react-bootstrap';
import { Link } from 'react-router';
import ForTheThrone from '../../common/ForTheThrone/ForTheThrone.jsx';
import './Start.css';
import logo from './gotstatslogosmall.jpg';
import jonSnow from './images/season-6-tease.jpg';
import melisandre from './images/Melisandre.jpg';

export default class Start extends Component {
  render() {
    return (
        <div className="home">
          <Row>
            <Col>
              <ForTheThrone />
            </Col>
          </Row>
          <Grid>
            <Row className="stats-home">
              <Col xs={8} xsOffset={0} sm={6} smOffset={1}>
                <Link to={"/episodes-recap"}><h1>Season 6 Epsiodes Recap</h1></Link>
                <p className="lead">Who died? Who survived? Who died and will survive? And, who did we warn you is likely to get chopped? <Link to={"/episodes-recap"}>Read more</Link></p>
              </Col>
              <Col xs={4} xsOffset={0} sm={2} smOffset={2}>
                <Link to={"/episodes-recap"}><img src={melisandre} className="start-logo" /></Link>
              </Col>
            </Row>
            <hr></hr>
            <Row className="stats-home">
              <Col xs={10} xsOffset={1} sm={3} smOffset={1}>
                <Link to={"/statistics"}><img src={logo} className="start-logo" /></Link>
              </Col>
              <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
                <Link to={"/statistics"}><h1>Life, death and statistics in Westeros</h1></Link>
                <p className="lead">While we all wait for the Winds of Winter to come out, we figured that it will be pretty cool
                to design some machine learning algorithm that will answer the question that is on every Game of Thrones’ fan mind - which character is likelier to die next? <Link to={"/statistics"}>Read more</Link></p>
              </Col>
            </Row>

            <hr></hr>
            <Row className="stats-home">
              <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
                <h1><a href="https://www.got.show/jon-snow-is-not-dead.html">Why Jon Snow is not dead</a></h1>
                <p className="lead">“The past is already written, the ink is dry” – so says the teaser for the sixth season of the popular TV show Game of Thrones. And until recently, that’s what we at got.show believed too. It was nine long months ago, during the season five finale (“Mother’s Mercy”) that we saw our favorite character Jon Snow join his father in GoT heaven however. But now we have reason to believe that he’s going to stick around on earth with the rest of us for just a little longer. You don’t think so? Well .. you know nothing, Jon Snow. <a href="http://www.got.show/jon-snow-is-not-dead.html">Read more</a></p>
              </Col>
              <Col xs={10} xsOffset={1} sm={3} smOffset={1}>
                <a href="https://www.got.show/jon-snow-is-not-dead.html">
                <img className="start-logo" alt="Official Announcement poster for the sixth season Game of Thrones, featuring Jon Snow." src={jonSnow}/></a>
              </Col>
            </Row>

            <hr></hr>
            <Row className="stats-home">
              <Col xs={10} xsOffset={1} sm={3} smOffset={1}>
                <a href="https://got.show/daenerys-targaryen.html">
                <img className="start-logo" alt="Daenerys Targaryen. Game of Thrones‘ mother of dragons." src="https://vignette1.wikia.nocookie.net/gameofthrones/images/5/58/Daenerys-Targaryen.jpg/revision/latest?cb=20141202204150&amp;path-prefix=de"/></a>
              </Col>
              <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
                <h1><a href="https://got.show/daenerys-targaryen.html">Why Daenerys Targaryen will win the Game of Thrones</a></h1>
                <p className="lead">Daenerys. Khaleesi. Mother of Dragons. Mhysa - a queen with a growing list titles and an even bigger list of reasons to take her seriously.
                  Ever since king Robert dethroned the Targaryens, she has been seeking for a way to win back the Iron Throne.
                  Let’s face it, the moment Daenerys let Drogo  kill her (admittedly annoying) brother, that's when we all knew that this young girl is
                  playing to win. Here is why we believe that soon she be sitting on the Iron Throne. <a href="https://got.show/daenerys-targaryen.html">Read more</a></p>
              </Col>
            </Row>

            <hr></hr>
            <Row className="stats-home">
              <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
                <h1>
                <a href="https://got.show/house-stark.html">
                Will Bran, Arya &amp; Sansa be the last of their kind in Game of Thrones?</a></h1>
                <p className="lead">House Stark of Winterfell has been having kind of a rough patch lately, don’t you think so? Although “rough patch” is
                  quite the understatement when you’re talking about multiple fatalities in the family. And “lately” refers to the
                  very first season of Game of Thrones, where we all taught an impressive lesson on how little George R.R. Martin cares
                  about his main characters.It seems like winter’s been coming and staying for Bran, Arya and Sansa. But what exactly have they been up to lately – and where are they heading? <a href="https://got.show/house-stark.html">Read more</a></p>
              </Col>
              <Col xs={10} xsOffset={1} sm={3} smOffset={1}>
                <a href="https://got.show/house-stark.html">
                <img className="start-logo" alt="Where are Arya, Sansa and Bran." src="images/sansa_bran_arya_map.png" /></a>
              </Col>
            </Row>

            <hr></hr>
            <Row className="stats-home">
              <Col xs={10} xsOffset={1} sm={3} smOffset={1}>
                <a href="https://got.show/when-theon-met-ramsay.html">
                <img className="start-logo" alt="Theon Greyjoy and Ramsay Snow at play" src="https://i.ytimg.com/vi/in0eB7N5pNM/maxresdefault.jpg"/></a>
              </Col>
              <Col xs={10} xsOffset={1} sm={6} smOffset={1}>
                <h1><a href="https://got.show/when-theon-met-ramsay.html">When Theon Met Ramsay</a></h1>
                <p className="lead">Ahh! Theon and Ramsay, Ramsay and Theon... There used to be a time when Theon was prince and Ramsay was but a servant to that prince. Back then, Ramsay was called Reek (because he stank) and he did Theon's bidding. But, all of a sudden, the tables have turned on Theon and from being a self-proclaimed Prince of Winterfell, he was a captive at the Dreadfort, propped up to be The bastard of Bolton's personal pet. From then on, Theon was Reek and Reek was Ramsay. And as Theon was sinking lower and lower (and losing some vital body parts), Ramsay was rising in the world. <a href="https://got.show/when-theon-met-ramsay.html">Read more</a></p>
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }
}
