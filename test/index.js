const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { parseRobots } = require('../src');

const robotsPath = './robots.txt';
let robots = '';
try {
    robots = fs.readFileSync(path.join(__dirname, robotsPath), 'utf-8');
} catch (e) { console.error(e); }

describe('parseRobots', function() {
    it('returns an empty object when passed no parameters', function() {
        assert.deepEqual(parseRobots(), {});
    });

    it('returns an empty object when passed an empty string', function() {
        assert.deepEqual(parseRobots(''), {});
    });

    it('has keys corresponding to all present user agents', function() {
        assert.deepEqual(Object.keys(parseRobots(robots)), ['*', 'adsbot-google', 'Nutch', 'AhrefsBot', 'AhrefsSiteAudit', 'MJ12bot', 'Pinterest']);
    });

    it('can locate the sitemap for a specific user agent', function() {
        assert.equal(parseRobots(robots)['*']['Sitemap'], 'http://localhost:3000/sitemap.xml');
    });

    it('stores the list of disallowed sites for a specific user agent', function() {
        assert.ok(parseRobots(robots)['*']['Disallow'], true);
        assert.equal(Array.isArray(parseRobots(robots)['*']['Disallow']), true);
        assert.equal(parseRobots(robots)['*']['Disallow'].length > 0, true);
    });
});