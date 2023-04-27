/**
 * Generate base64 string
 * @param {string} string
 * @example
 * generateBase64String("(min-width: 700px), handheld and (orientation: landscape)")
 *  = "KG1pbi13aWR0aDogNzAwcHgpLCBoYW5kaGVsZCBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUp"
 * generateBase64String("screen") = "c2NyZWVu"
 */
const generateBase64String = (string) => {
  return Buffer.from(string).toString('base64')
}

module.exports = generateBase64String
