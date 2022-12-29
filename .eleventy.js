module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    
    eleventyConfig.addWatchTarget('_tmp/style.css');

    eleventyConfig.addPassthroughCopy({ '_tmp/style.css': 'style.css' });
    eleventyConfig.addPassthroughCopy({ 'src/_media': 'media' });

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

    return {
        dir: {
            input: 'src'
        }
    }
};