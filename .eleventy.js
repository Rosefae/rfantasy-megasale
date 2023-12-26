// 11ty handles everything except the CSS stuff.
// For CSS stuff, please see the gulpfile.

module.exports = function(eleventyConfig){

    // Copy assets and scripts

    eleventyConfig.addPassthroughCopy("src/_scripts");
    eleventyConfig.addPassthroughCopy("src/_assets");

    // Watch for SCSS changes

    eleventyConfig.addWatchTarget("src/_styles/");

    // Eleventy settings

    return {
        dir: {
            input: "src",
            output: "dist"
        },
        passthroughFileCopy: true
    }
}
