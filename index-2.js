var elasticsearch = require('elasticsearch');
var tweets = require('./tweets.json');
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
			"match_all": {
		// 		index: "g*",
		// 		type: "tweet",
		// q: {
					name: "mary"
		// }
			}
		}
	}).then(function (resp) {


		console.log('---- show ----');

		console.log(resp.hits.hits);

	});

}

function addAll(client) {

	tweets.list.forEach(function (tweet, id) {

		var body = {};

		Object.keys(tweet).forEach(function (key) {

			if (key === 'index' || key === 'type') {
				return;
			}

			body[key] = tweet[key];

		});

		client.index({
			index: tweet.index,
			type: tweet.type,
			id: id + 1,
			body: body
		}, function (err, resp) {
			console.log(err, resp);
		});

	});

}


//////////////////////////////////////////////////


// removeAll(client);
// addAll(client);
showAll(client);

// analytics(client);
// analytics2(client);

// add new index - 'blog'
// with setting
function newIndexWithSettings(client) {

	client.indices.create({
		index: 'blog_3',
		body: {
			settings: {
				"number_of_shards": 3,
				"number_of_replicas": 1
			}
		}

		// the same
/*
		index: 'blog_3',
		body: {
			"number_of_shards": 3,
			"number_of_replicas": 1
		}
*/

	}, function (err, resp) {
		console.log(err, resp);
	});

}
// newIndexWithSettings(client);


// not work
function setIndexSettings(client) {

	client.indices.putSettings({

		index: 'blog_3',
		settings: {
			"number_of_shards": 6,
			"number_of_replicas": 1
		}

	}, function () {
		console.log(arguments);
	})

}

// setIndexSettings(client);

function getData(client) {

	client.get({
		index: employee.index,
		type: employee.type,
		id: 1
	}, function (err, data) {
		console.log(data);
	})

}

// getData(client);

















