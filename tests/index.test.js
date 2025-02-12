const { _getRssFeed, _formatAndPrintLogOutput, _filterFeedsByDays, _sortFeedsByDate } = require('../index');
const sinon = require('sinon');
const { expect } = require('chai');

describe('RSS Feed Tests', () => {
  describe('_filterFeedsByDays', () => {
    it('should filter feeds based on the input parameter for days', () => {
      const feeds = [
        { pubDate: new Date().toISOString() },
        { pubDate: new Date(Date.now() - 86400000).toISOString() }, // 1 day ago
        { pubDate: new Date(Date.now() - 172800000).toISOString() }, // 2 days ago
        { pubDate: new Date(Date.now() - 259200000).toISOString() }, // 3 days ago
      ];
      const days = 2;
      const filteredFeeds = _filterFeedsByDays(feeds, days);
      expect(filteredFeeds.length).to.equal(2);
    });
  });

  describe('_sortFeedsByDate', () => {
    it('should sort feeds by date in descending order', () => {
      const feeds = [
        { pubDate: new Date(Date.now() - 86400000).toISOString() }, // 1 day ago
        { pubDate: new Date().toISOString() },
        { pubDate: new Date(Date.now() - 172800000).toISOString() }, // 2 days ago
      ];
      const sortedFeeds = _sortFeedsByDate(feeds);
      expect(new Date(sortedFeeds[0].pubDate)).to.be.above(new Date(sortedFeeds[1].pubDate));
      expect(new Date(sortedFeeds[1].pubDate)).to.be.above(new Date(sortedFeeds[2].pubDate));
    });
  });
});
