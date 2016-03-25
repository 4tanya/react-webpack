var React = require('react');

var Filters = require('./FilterComponent');
var TrackListTable = require('./TrackListTable');
var PaginationComponent = require('./PaginationComponent');

var TrackListWrapper = React.createClass({
	getInitialState: function() {
	    return {
	        filterValues: {
	        	artists: '',
	        	genres: '',
	        	years: null
	        },
	        page: 1,
	        pageSize: 2
	    };
	},
	filteredTracks: [],
	displayedTracks: [],
	filters: [],
	selectFilter: function(filterKey, filterValue) {
		var filterValues = this.state.filterValues;
		for (var key in filterValues) {
			if (key == filterKey) filterValues[key] = filterValue;
		}
	    this.setState({
	    	filterValues: filterValues,
	    	page: 1
	    });
	},
	getFilterOptionsArray: function(optionValue, optionArray) {
	    if (!optionArray.length) return optionArray.push(optionValue);
		if (optionArray.indexOf(optionValue) === -1) return optionArray.push(optionValue);
	},
	getFilters: function() {
		var artists = [],
			genres = [],
			years = [];
		for (var i=0; i<this.filteredTracks.length; i++) {
			var track = this.filteredTracks[i];
			this.getFilterOptionsArray(track.artist, artists);
			this.getFilterOptionsArray(track.genre, genres);
			this.getFilterOptionsArray(track.year, years);
		}
		this.filters.artists = artists;
		this.filters.genres = genres;
		this.filters.years = years;
	},
	getFilteredTracks: function() {
		var filterValues = this.state.filterValues,
	    	filterValuesArray = new Array();
	    for (var key in filterValues) {
    		if (filterValues[key]) filterValuesArray.push(filterValues[key].toString());
    	}
	    this.filteredTracks = this.props.tracks.filter(function(t){
	    	if (!filterValuesArray.length) return t;
	    	var foundedValues = new Array();
    		for (var k in t) {
    			if (filterValuesArray.indexOf(t[k].toString()) !== -1) {
    				if (!foundedValues.length || foundedValues.indexOf(t[k].toString()) === -1) foundedValues.push(t[k].toString());
    			} 
    		}
    		return isArraysEquals(filterValuesArray, foundedValues);
	    });
	},
	getDisplayedTracks: function() {
		var startPos = +this.state.pageSize * (+this.state.page - 1),
	    	endPos = +this.state.pageSize + startPos;
	    this.displayedTracks = this.filteredTracks.slice(startPos, endPos);
	},
	selectPageSize: function(pageSize) {
		this.setState({
			pageSize: pageSize,
			page: 1
		});
	},
	maxPageCounter: function(trackListLength) {
		var pageSize = this.state.pageSize;
		this.maxPage = trackListLength/pageSize;
	},
	pageIncrement:function(){
		var pageNext = this.state.page + 1;
		if (this.state.page<this.maxPage)  
			this.setState({page: pageNext});
	},
	pageDecrement:function(){
		var pagePrev = this.state.page-1;
		if (this.state.page>1)
			this.setState({page: pagePrev});
	},
	render: function() {
	    this.getFilteredTracks();
	    this.getDisplayedTracks();
	    this.maxPageCounter(this.filteredTracks.length);
		this.getFilters();
	    return (
		    <div>
		        <Filters filters={this.filters} filterValues={this.state.filterValues} onSelectFilter={this.selectFilter} />
		        <TrackListTable tracks={this.displayedTracks} />
		        <PaginationComponent 
		        	pageSize={this.state.pageSize} 
		        	selectPageSize={this.selectPageSize} 
		        	page={this.state.page} 
		        	maxPage={this.maxPage} 
		        	pageIncrement={this.pageIncrement} 
		        	pageDecrement={this.pageDecrement} />
		    </div>
	    );
	}
});

function isArraysEquals(arr1, arr2) {
	if (!arr1 || !arr2 || arr1.length !== arr2.length) return false;
    for (var i = 0, l=arr1.length; i < l; i++) {
        if (arr1[i] instanceof Array && arr2[i] instanceof Array && !isArraysEquals(arr1[i], arr2[i])) return false;          
        return arr1[i] === arr2[i];   
    }       
};

module.exports = TrackListWrapper;