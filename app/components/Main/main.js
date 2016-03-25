var React = require('react');
var TrackListWrapper = require('../TrackListWrapper');

'use strict'

var tracks = [
    {artist: 'Coldplay', duration: '3.57', genre: 'dance', year: 2016, title: 'Adventure Of A Lifetime'},
    {artist: 'Lost Frequencies feat. Janieck Devy', duration: '3.54', genre: 'pop', year: 2016, title: 'Reality'},
    {artist: 'Kwabs', duration: '3.59', genre: 'pop', year: 2016, title: 'Walk'},
    {artist: 'Adam Lambert', duration: '3.84', genre: 'rock', year: 2015, title: 'Ghost Town'},
    {artist: 'Ёлка', duration: '3.74', genre: 'r\'n\'b', year: 2015, title: 'Грею счастье'},
    {artist: 'Smash', duration: '3.94', genre: 'trance', year: 2016, title: 'The Night Is Young (Feat Ridley)'},
];

var App = React.createClass({
	render: function() {
	    return (
	        <div>
	        	<TrackListWrapper tracks={tracks} />
	        </div>
	    );
	}
});

module.exports = App;