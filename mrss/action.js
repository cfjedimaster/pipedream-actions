const Parser = require('rss-parser');

module.exports = {
  name: "Multi RSS",
  description: "Multi RSS Reader",
  key: "multi_rss",
  version: "0.1.0",
  type: "action",
  props: {
	feeds: {
		type:"string[]",
		label:"Feeds",
		description:"The list of RSS feeds you want to parse."
	},
	merge: {
		type:"boolean",
		optional:true,
		default:true,
		description:"If true, all items are returned in a date sorted array. If false, each feed is returned as one result in the array."
	}
  },
  async run() {

	const getFeeds = async function(url) {
	  	let parser = new Parser();
		return parser.parseURL(url);
	}

	/*
	If merge is true, its an array of feed items where each item has a .feed
	property with info on the feed. A bit repititve. It's sorted by date.

	If merge is false, each array item is an object with:

		{
			feed: info on feed
			items: items
		}
	*/
	let result = [];

	for(let i=0; i < this.feeds.length; i++) {
		let feedResult = await getFeeds(this.feeds[i]);
		let feed = {
			title: feedResult.title, 
			description: feedResult.description, 
			lastBuildDate: feedResult.lastBuildDate, 
			link: feedResult.link, 
			feedUrl: feedResult.feedUrl
		};

		if(this.merge) {
			feedResult.items.forEach(f => {
				let newItem = f;
				newItem.feed = feed;
				result.push(newItem);
			});
		} else {
			result.push({
				feed, 
				items: feedResult.items
			})

		}
	}

	// now sort by pubDate, if merging of course
	if(this.merge) {
		result = result.sort((a,b) => {
			let aDate = new Date(a.isoDate);
			let bDate = new Date(b.isoDate);
			if(aDate < bDate) return 1;
			if(aDate > bDate) return -1;
			return 0;
		});
	} 

	return result;
  },
}