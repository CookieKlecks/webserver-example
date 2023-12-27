/**
 * This function pads a specified content in the middle of a line with a specified length.
 * A custom character can be used to pad the content. Default is '='.
 *
 * Example:
 * content = 'Hello World', lineLength = '20', paddingCharacter = '='
 *
 * => return = '=====Hello World===='
 *
 * @param content the content that should be padded. It must have fewer characters than the line length.
 * @param lineLength the total line length. The output will have exactly this many characters.
 * @param paddingCharacter the character that should be used to pad the content to the desired line length.
 */
function padLine(content: string, lineLength: number, paddingCharacter: string = "=") {
    const paddingLength = Math.max(lineLength - content.length - 2, 2)  // we subtract 2 for the spaces around the content
    const paddingLeft = Math.floor(paddingLength / 2)
    const paddingRight = Math.ceil(paddingLength / 2)
    return paddingCharacter.repeat(paddingLeft) + ` ${content} ` + paddingCharacter.repeat(paddingRight)
}

/**
 * This function generates a nice start screen for console output after starting a webserver.
 * @param portNumber the port number that should be specified in the start screen to connect to.
 * @param lineLength the desired length of every line of the start screen.
 */
export function generateStartScreen(portNumber: number, lineLength: number = 50): string {
    const portNumLength = Math.floor(Math.log10(portNumber)) + 1
    const headline = "Started Server Successfully at Port:"
    const lines: string[] = [
        "=".repeat(lineLength),
        padLine(headline, lineLength, "*"),
        "=".repeat(lineLength),
        // create a box around the port number
        padLine("   -" + "-".repeat(portNumLength) + "-   ", lineLength, "*"),
        padLine("  | " + portNumber.toString() + " |  ", lineLength, "*"),
        padLine("   -" + "-".repeat(portNumLength) + "-   ", lineLength, "*"),
        "=".repeat(lineLength)
    ]

    return lines.join("\n")
}