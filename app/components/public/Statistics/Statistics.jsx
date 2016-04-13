import React from 'react';
let {Component} = React;
import { Grid, Row, Col } from 'react-bootstrap';
import $ from 'jquery';
import './Statistics.css';

let js = require('raw!./src.js'); /*eslint no-undef:0 */

export default class Statistics extends Component {
  render() {
    $.getScript("https://www.gstatic.com/charts/loader.js",function(){
      eval(js);
    });
    return (
      <Grid>
      <Row>
        <Col md={8} mdPush={2}>
          <h1>Life, death and statistics in Westeros</h1>
          <p><span>While we all wait for the Winds of Winter to come out, we figured that it will be pretty cool to design some machine learning algorithm that will answer the question that is on every Game of Thrones&rsquo;
            fan mind -</span><span>&nbsp;which character is likelier to die next? </span>
          </p>
          <h2>Plenty of characters to go around</h2>
          <span>Our first step was to go and collect all data we can find about the characters mentioned in the five Ice and Fire books, novellas and reader&#39;
            s companions. Turns out there&rsquo;s quite a few of them, 2028 characters to be exact. And they all have a part to play in moving the plot forward. You can see in Figure 1 how many characters (by gender) mentioned in each of the books. &nbsp;</span>
            <div className="center" id="new_characters_introduced"></div>
            <p><span className="caption">Figure 1. Population by gender in the Ice and Fire books</span>
            </p>
            <p><span></span>
            </p>
            <p><span></span>
            </p>
            <p><span>The GoT show is also full of many characters - there are on average 33.8 characters in each episode and 3.88 new characters are introduced in each episode. That may explain why this show is so bloody expensive... Check out Figure 2 for character count/episode and new character count/episode.</span>
            </p>
            <p><span></span>
            </p>
            <p><span></span>
            </p>
            <p><span></span>
            </p>
            <p><span></span>
            </p>
            <div className="center" id="characters_per_episode"></div>
            <p><span></span>
            </p>
            <p><span className="caption">Figure 2. Number of characters  and new characters presented in each of the Game of Thrones episodes.
</span>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <h2 id="h.jlkuqyn7n7zv"><span>There are more men than women in GoT. By a factor of 2. </span></h2>
              <p><span>Having collected the data about all the characters, we first wanted to see what are the survival chances of characters across gender. First, it comes as no surprise that in a male dominated world, such as the one described in A Song of Ice and Fire, most characters are male. Actually </span><span>the male/female ratio is a bit over </span><span>2:1</span><span>. &nbsp;</span>
              </p>
              <p><span></span>
              </p>
              <h2 id="h.s076qg89ov01"><span>Men tend to be more noble.</span></h2>
              <p><span>Men also have an advantage when it comes to rank - there are 53 more noble men than small folk. Women, however are likelier to play the role of peasants - there are 1.7 peasant women for each noble woman. Check out Figure 3 for rank distribution by gender.</span>
              </p>
              <p><span></span>
              </p>
              <h2><span>Women are survivors </span>
              </h2>
              <p><span></span>
              </p>
              <p><span>The good news for women are that they are less likely to be killed off than men - while 43% of men characters are dead</span><span>&nbsp;
                by the end of fifth book&rsquo;</span><span>, 79% of women characters are still alive. Check out Figure 3 for survivability distribution by gender.</span>
              </p>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <div className="center" id="dead_and_alive"></div>
              <p><span className="caption">Figure 3. Distribution of men and women within noble/non-noble and alive/dead characters.</span>
              </p>
              <h1 id="h.m7qy93gzi4my"><span>Now let&rsquo;
                s look at the question at hand - who is likelier to die next?</span></h1>
              <p><span>Okay, so there are more men and they are at greater risk of getting hurt. This is not real news for a knight leading a vanguard of 5,000 men. &nbsp;
                As a matter of fact, our </span><span><a href="https://got.show/machine-learning-algorithm-predicts-death-game-of-thrones">machine
                learning algorithm </a></span><span>cannot be more clear on that. When looking at the </span><span><a href="https://got.show/machine-learning-algorithm-predicts-death-game-of-thrones">predicted
                likelihood of death (PLOD)</a></span><span>&nbsp;</span><span>we saw that the</span><span>&nbsp;
                average likelihood of death for men is 33%</span><span>&nbsp;and for women it is 23%. Figure 4 shows the distribution of PLODs for male and female characters and how men are likelier to be killed off than women. </span>
              </p>
              <p><span></span>
              </p>
              <div className="center" id="distribution_plods"></div>
              <p>
                <span className="caption">Figure 4. Men are likelier to die than women. For instance, 21% of all men (Y-axis) are at </span><span>60% </span><span>likelihood of death (X-axis)</span><span>, which is depicted by the </span><span>blue star. For women, this ratio is only at 9% at the same 60% likelihood of death, which is depicted by the red star.</span>
              </p>
              <p><span></span>
              </p>
              <p><span>So, yeah, gender matters and all the ladies can kick back and relax while the guys go and butcher each other for honor and glory. But what about rank you may ask? Is being a Lord any guarantee for a safer life? Or is being the lowest of peasants buys you more years? &nbsp;
                As it turns out, rank makes very little difference - kings, lords, knights, clergy, maesters and yeah peasants are all subjected to the same risk levels (Figure 5) . Pretty surprising, considering this is a world where the blood of the commoners can be spilled indiscriminately. </span>
              </p>
              <p><span></span>
              </p>
              <div className="center" id="distribution_nobles_plods"></div>
              <p><span className="caption">Figure 5. Nobles are at the same risk to die as peasants. Similar to Figure 4, plotted are percentages of noble (blue line) and peasant (red line) characters (Y-axis) for whom we predict a certain likelihood of death (X-axis).For nobles, the average PLOD is 31% and for peasants it is 27%.</span>
              </p>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <p><span>Now what about a character&rsquo;s age? Which age groups are likelier to be at greater risk of death than others? Check out Figure 6, which shows a histogram of age groups and their average predicted likelihoods of death. Unsurprisingly, the period when a character rises to prominence (between the age 21-40) is also the most precarious time in a character&rsquo;
                s life. The good news for characters who manage to live into their 70s (an unusually old age in the Ice and Fire world) is that they are likelier to die of old age. &nbsp; </span>
              </p>
              <div className="center" id="distribution_plods_age_distribution"></div>
              <p><span className="caption">Figure 6. Characters of age groups 21-40 and 51-60 (X-axis) are at highest risk of death (Y-axis).</span>
              </p>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <p><span></span>
              </p>
              <p><span>So gender, rank and age - they can all play a part in determining a likelihood of death for characters in the Ice and Fire world. You can actually </span><span><a
                href="https://got.show/machine-learning-algorithm-predicts-death-game-of-thrones">read
                more on the the many character features we threw into our prediction algorithms</a></span><span>. </span>
              </p>

               <h2><span>What makes an episode great?</span></h2>
              <span>The predicted likelihood of death value is a cool way for us to estimate who is next in line to be eliminated. It can also be used to gauge</span><span>&nbsp;
                which episode in the show could be the most suspenseful</span><span>&nbsp;- by say cramming many characters with high risk of dying into an episode and putting viewers at the edge of their sears. </span><span>We did just that </span><span>- we took our predicted risk of death values and averaged them for all characters appearing in each episode. </span><span>The result can be seen in Figure 7. </span><span>I don&#39;
                t know about you, but it seems like</span><span>&nbsp;Seasons 1 and Season 2 appear to be clear winners in terms of the amount of potential suspense packed into them</span><span>. What do you think? Were the first two seasons most suspenseful? </span><span><a
                href="http://goo.gl/YIEa7w">Vote here</a></span><span>.</span>
              <div className="center" id="avgPLOD_per_episode"></div>
              <p><span className="caption">Figure 7. Predicted likelihood of death averaged across characters in each episode that was aired in the first five seasons of Game of Thrones.</span>
              </p>
            </p>
        </Col>
      </Row>
      </Grid>
    );
  }
}
