var React = require('react');

var FilterOption = React.createClass({
	render: function() {
		return <option value={this.props.text}>{this.props.text}</option>
	}
});

var Filter = React.createClass({
	handleChange: function() {
		this.props.onSelectFilter(this.refs.filterTextSelect.id, this.refs.filterTextSelect.value);
	},
	render: function() {
		var options = [];
		var propsOptions = this.props.options;
		for (var i=0; i<propsOptions.length; i++) {
			options.push(<FilterOption value={this.props.name + i} text={propsOptions[i]} />);
		}
		return (
			<div>
				<label htmlFor={this.props.name}>{this.props.name}</label>
				<select id={this.props.name} value={this.props.filterValue} onChange={this.handleChange} ref="filterTextSelect" >
					<option value="">Select {this.props.name}</option>
					{options}
				</select>
			</div>
		);
	}
});

var Filters = React.createClass({
	render: function() {
		var filters = [];
		for (var key in this.props.filters) {
			filters.push(<Filter name={key} options={this.props.filters[key]} filterValue={this.props.filterValues[key]} onSelectFilter={this.props.onSelectFilter} />);
		}
	    return (
		    <form className="filters">
		      	{filters}
		    </form>
	    );
	}
});

module.exports = Filters;