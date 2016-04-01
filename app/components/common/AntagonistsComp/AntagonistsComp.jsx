import React from 'react';
//import path from 'path';
let {Component} = React;
function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}
let images = requireAll(require.context("./img", false, /^\.\/.*\.jpg$/));

import json from 'json!./antagonists.json';

export default class AntagonistsComp extends Component {
  render() {
    console.log(images[0], '.jpg'); /*eslint no-console:0,no-undef:0*/

  return (
    <div className="home">
      {json.map(function(pair) {
        console.log (pair);
        return <img src={'/assets/static/images/'+pair[0].replace(' ','_')+'.jpg'}/>;
      })}
    </div>
    );
  }
}
