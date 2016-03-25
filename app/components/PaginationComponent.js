var React = require('react');

var PaginationElement = React.createClass({
	selectPageSize: function() {
	    this.props.selectPageSize(this.refs.pageSizeSelect.value);
	},
	prev: function() {
		this.props.pageDecrement();
	},
	next: function() {
		this.props.pageIncrement();
	},
	render: function() {
	    return (
		    <form className="pagination-component">
		    	<input onClick={this.prev} disabled={this.props.page<=1} value="Prev" type="button" />
		    	<select onChange={this.selectPageSize} value={this.props.pageSize} ref="pageSizeSelect" >
		    		<option value={2}>2</option>
		    		<option value={4}>4</option>
		    		<option value={6}>6</option>
		    	</select>
		    	<input onClick={this.next} disabled={this.props.page>=this.props.maxPage} value="Next" type="button" />
		    </form>
	    );
	}
});

module.exports = PaginationElement;