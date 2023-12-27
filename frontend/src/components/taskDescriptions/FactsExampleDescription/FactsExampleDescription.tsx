import "./FactsExampleDescription.scss"
import React, {HTMLAttributes} from 'react';
import SyntaxHighlighter from "react-syntax-highlighter";
import {docco} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface NamesExampleDescriptionProps extends HTMLAttributes<HTMLDivElement> {

}

function FactsExampleDescription({...props}: NamesExampleDescriptionProps) {

    return (
        <div {...props} className={'FactsExampleDescription'}>
            <h5>Aufgabe:</h5>
            Sende eine <code>GET</code> Anfrage an den Server unter:
            <SyntaxHighlighter language={'http'} style={docco}>http://localhost:10000/fact/:id</SyntaxHighlighter>
            Wobei der Parameter <code>:id</code> durch die Nummer des gewünschten Fakts ersetzt werden soll.
        </div>
    )
}

export default FactsExampleDescription;