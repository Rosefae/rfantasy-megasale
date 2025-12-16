// 11ty handles everything except the CSS stuff.
// For CSS stuff, please see the gulpfile.

module.exports = async function(eleventyConfig){
    const { RenderPlugin } = await import("@11ty/eleventy");
    eleventyConfig.addPlugin(RenderPlugin, {
        accessGlobalData: true
    });

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
