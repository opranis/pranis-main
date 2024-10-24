module.exports = function (eleventyConfig) {
    eleventyConfig.setUseGitIgnore(false);
    
    eleventyConfig.addWatchTarget('_tmp/style.css');

    eleventyConfig.addPassthroughCopy({ '_tmp/style.css': 'style.css' });
    eleventyConfig.addPassthroughCopy('src/admin');

    const { minify } = require('terser');
    eleventyConfig.addAsyncFilter("jsmin", async function (code) {
        try {
            const minified = await minify(code);
            return minified.code;
        } catch (err) {
            console.error("Terser error: ", err);
            return code;
        }
    });

    function filterTagList(tags) {
        tags = Array.isArray(tags) ? tags : [tags];
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

    eleventyConfig.addPassthroughCopy({"node_modules/lightgallery": "lightgallery"});
    eleventyConfig.addPairedShortcode("gallery", function(content, name){
        return `
        <div>
            <div class="not-prose grid sm:grid-cols-3 grid-cols-2 gap-3" id="gallery-${name}">
                ${content}
            </div>
            <script type="text/javascript">
                    lightGallery(document.getElementById('gallery-${name}'), {
                    plugins: [],
                    speed: 500,
                    download: false,
                });
            </script>
        </div>
        `.replace(/(\r\n|\n|\r)/gm, "");
    });

    eleventyConfig.addShortcode("galleryImg", function(img, desc){
        return `
            <a href="${img}" class="flex aspect-square border-[6px] rounded-sm  transition duration-300
            border-my-offwhite hover:shadow-my-orange hover:border-my-yellow">
                <img alt="${desc}" src="${img}" class="h-full object-cover"/>
            </a>
        `.replace(/(\r\n|\n|\r)/gm, "");
    });

    return {
        dir: {
            input: 'src'
        }
    }
};