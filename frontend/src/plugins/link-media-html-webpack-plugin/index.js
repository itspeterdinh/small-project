/**
 * cloned from: https://github.com/probablyup/link-media-html-webpack-plugin
 * with some modification to support newer webpack version (current: v5)
 */

/**
 * Extract media `stringValue` from `base64MediaString` in pattern
 * `media_{base64MediaString}` in filename
 * @param {string} filename
 * @example
 * extractMediaFromFilename(styles.media_KG1pbi13aWR0aDogNzAwcHgpLCBoYW5kaGVsZCBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUp.css)
 *  = "(min-width: 700px), handheld and (orientation: landscape)"
 * extractMediaFromFilename(styles.media_c2NyZWVu.css) = "screen"
 */
const extractMediaFromFilename = (filename) => {
  const matches = filename.match(/\bmedia_([A-Z0-9=]*)/i)

  if (matches && matches[1]) return Buffer.from(matches[1], 'base64').toString()

  return false
}

// check if the styleTag is a stylesheet link tag
const isStylesheetLinkTag = (styleTag) => styleTag.tagName === 'link' && styleTag.attributes.rel === 'stylesheet'

// add media attribute if the input styleTag is a stylesheet link tag
const addMediaAttributeToStylesheetLinkTag = (styleTag) => {
  if (isStylesheetLinkTag(styleTag) && styleTag.attributes.href) {
    return {
      ...styleTag,
      attributes: {
        ...styleTag.attributes,
        media: extractMediaFromFilename(styleTag.attributes.href),
      },
    }
  }

  return styleTag
}

/**
 * Plugin to add `media` attribute into any generated stylesheet link
 * inferred from the CSS filename according to the pattern
 * `media_{base64MediaString}`
 * Process:
 * 1. Loop through all html tags in <head> and <body> then
 * 2. For any stylesheet link found: extract `media_{base64MediaString}`
 *    from attribute `href` that containing `fileName`
 * 3. Then convert `base64MediaString` to `stringValue` then add
 *    attribute `media={stringValue}` to those stylesheet links
 * @example
 * <link
 *  src="styles.media_KG1pbi13aWR0aDogNzAwcHgpLCBoYW5kaGVsZCBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUp.css"
 *  rel="stylesheet"
 *  media="(min-width: 700px), handheld and (orientation: landscape)"
 * />
 * <link
 *  src="styles.media_c2NyZWVu.css"
 *  rel="stylesheet"
 *  media="screen"
 * />
 */
class LinkMediaHTMLWebpackPlugin {
  constructor(options) {
    // this plugin will NOT support any options
    // then if it is provided, throw error
    if (options !== undefined) {
      throw new Error('The LinkMediaHTMLWebpackPlugin does not accept any options')
    }
  }

  apply(compiler) {
    // Hook into the html-webpack-plugin processing
    compiler.hooks.compilation.tap('LinkMediaHtmlWebpackPlugin', (compilation) => {
      require('html-webpack-plugin')
        .getHooks(compilation)
        .alterAssetTags // read here to see why using this hook: https://github.com/jantimon/html-webpack-plugin#events
        .tap(
          'LinkMediaHtmlWebpackPlugin',
          // read here to see definition for `htmlPluginData`: https://github.com/jantimon/html-webpack-plugin/blob/main/lib/hooks.js#L28
          (htmlPluginData) => ({
            ...htmlPluginData,
            assetTags: {
              ...htmlPluginData.assetTags,
              styles: htmlPluginData.assetTags.styles.map(addMediaAttributeToStylesheetLinkTag),
            },
          }),
        )
    })
  }
}

module.exports = LinkMediaHTMLWebpackPlugin
