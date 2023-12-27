import React, {HTMLAttributes, useEffect, useState} from 'react';

interface LabelProps extends HTMLAttributes<HTMLDivElement> {
    label: string
    maxLength?: number
}

/**
 * This component is a simple text label inside a div.
 * The text can however be restricted to a maximum length.
 * If the text is cut, an ellipsis (…) is added to indicate that text is missing.
 *
 * The displayed text will have in no case more than maxLength characters.
 *
 * @param label the full label that should be displayed
 * @param maxLength (Optional) the maximum number of characters to show. If undefined, full label is displayed.
 * @param props other properties that are directly passed to the outer most div
 * @constructor
 */
function Label({label, maxLength, ...props}: LabelProps) {
    // the label cut to the maximum length
    const [shortLabel, setShortLabel] = useState<string>("")

    useEffect(() => {
        if (maxLength === undefined) {
            setShortLabel(label)
            return
        }
        if (label.length > maxLength) {
            let newShortLabel = label.slice(0, maxLength - 1) + "…"
            setShortLabel(newShortLabel)
        } else {
            setShortLabel(label)
        }
    }, [label, maxLength])

    return (
        <div {...props}>
            {shortLabel}
        </div>
    )
}

export default Label;