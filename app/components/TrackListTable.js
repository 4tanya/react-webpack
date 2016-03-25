var React = require('react');

var TrackHeadingRow = React.createClass({
	getSortedProperty: function(e) {
		var property = e.currentTarget.attributes.id.value;
		if (this.props.toSorted !== property)
			e.currentTarget.className = 'active';
		else e.currentTarget.className = (e.currentTarget.className === 'active') ? '' : 'active';
		this.props.setSortedProperty(e.currentTarget.attributes.id.value);
	},
	render: function() {
	    return (
	    	<tr>
		    	<th onClick={this.getSortedProperty} id='artist'>Artist</th>
		    	<th onClick={this.getSortedProperty} id='title'>Title</th>
		    	<th onClick={this.getSortedProperty} id='year'>Year</th>
		    	<th onClick={this.getSortedProperty} id='duration'>Duration</th>
		    	<th onClick={this.getSortedProperty} id='genre'>Genre</th>
	    	</tr>
	    );
	}
});

var TrackRow = React.createClass({
	render: function() {
	    return (
		    <tr id={this.props.index.toString()}>
		        <td>{this.props.track.artist}</td>
		        <td>{this.props.track.title}</td>
		        <td>{this.props.track.year}</td>
		        <td>{this.props.track.duration}</td>
		        <td>{this.props.track.genre}</td>
		    </tr>
	    );
	}
});

var TrackListTable = React.createClass({
	getInitialState: function() {
		return {
			toSorted: null,
			isDiffered: true
		}
	},
	getPropertyToSorted: function(property) {
		this.setState(
			function(previousState) {
				return {
					toSorted: property,
					isDiffered: previousState.toSorted !== property || !previousState.isDiffered
				}
			}  
		);
	},
	sort: function(a, b) {
		var property = this.state.toSorted;
		if (a[property] > b[property]) return 1;
	    if (a[property] < b[property]) return -1;
	    return 0;
	},
	sortInverse: function(a, b) {
		var property = this.state.toSorted;
		if (a[property] > b[property]) return -1;
	    if (a[property] < b[property]) return 1;
	    return 0;
	},
	render: function() {
		var filteredTracks = this.props.tracks,
			rows = [];
	    if (this.state.toSorted) {
	    	var sortFunc = (this.state.isDiffered) ? this.sort : this.sortInverse;
	    	filteredTracks.sort(sortFunc);
	    };
	    for (var i=0; i<filteredTracks.length; i++) {
	    	rows.push(<TrackRow track={filteredTracks[i]} index={i} />);
	    }
	    return (
		    <table className="track-list-table">
		        <thead><TrackHeadingRow toSorted={this.state.toSorted} setSortedProperty={this.getPropertyToSorted} /></thead>
		        <tbody>{rows}</tbody>
		    </table>
	    );
	}
});

module.exports = TrackListTable;