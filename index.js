var elasticsearch = require('elasticsearch');
var employee = require('./employee.json');
var client = new elasticsearch.Client({
	host: 'localhost:9200',
	log: 'trace'
});

function removeAll(client) {

	client.search({
		"query": {
			"match_all": {}
		}
	}).then(function (resp) {

		resp.hits.hits.forEach(function (hit) {

			client.delete({
				index: hit._index,
				type: hit._type,
				id: hit._id
			}, function (error, response) {
				// ...
			});

		});

	});

}

function showAll(client) {

	client.search({
		"query": {
			"match_all": {}
		}
	}).then(function (resp) {


		console.log('---- show ----');

		console.log(resp.hits.hits);

	});

}

function addAll(client) {

	employee.list.forEach(function (employeeData, id) {

		client.index({
			index: employee.index,
			type: employee.type,
			id: id,
			body: employeeData
		}, function (err, resp) {
			console.log(err, resp);
		});

	});

}

function analytics(client) {

	client.search({
		index: employee.index,
		type: employee.type,
		body: {
			"aggs": {
				"all_interests": {
					"terms": { "field": "interests" }
				}
			}
		}
	}).then(function (resp) {

		console.log('---- analytics ----');

		console.log(resp.hits.hits);

	});

}


//////////////////////////////////////////////////


// removeAll(client);
// addAll(client);
// showAll(client);

analytics(client);