module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    
    eleventyConfig.addWatchTarget('_tmp/style.css');

    eleventyConfig.addPassthroughCopy({ '_tmp/style.css': 'style.css' });
    eleventyConfig.addPassthroughCopy({ 'src/_media': 'media' });
    eleventyConfig.addPassthroughCopy('src/admin');

    const { minify } = require('terser');
    // this can be changed to a universal filter in 11ty 2.0
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
        code,
        callback
    ){
        try {
            const minified = await minify(code);
            callback(null, minified.code);
        } catch (err) {
            console.error("Terser error: ", err);
            callback(null, code);
        }
    });

    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "posts"].indexOf(tag) === -1);
    }
    eleventyConfig.addFilter("filterTags", filterTagList)

    const { DateTime } = require('luxon');
    eleventyConfig.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    });
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });

    return {
        dir: {
            input: 'src'
        }
    }
};