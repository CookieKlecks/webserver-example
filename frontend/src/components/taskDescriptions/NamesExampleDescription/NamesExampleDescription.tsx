import "./NamesExampleDescription.scss"
import React, {HTMLAttributes} from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface NamesExampleDescriptionProps extends HTMLAttributes<HTMLDivElement> {

}

function NamesExampleDescription({...props}: NamesExampleDescriptionProps) {
    const bodyContent: string = `
    {
        "name": "Dein Name" // natürlich mit beliebigen Namen :)
    }
    `

    return (
        <div {...props}>
            <h5>Aufgabe:</h5>
            Sende eine <code>POST</code> Anfrage an den Server unter:
            <SyntaxHighlighter language={'http'} style={docco}>http://localhost:10000/name</SyntaxHighlighter>
            Mit folgendem <code>Body</code>:
            <SyntaxHighlighter language={'javascript'} style={docco}>
                {bodyContent}
            </SyntaxHighlighter>
        </div>
    )
}

export default NamesExampleDescription;