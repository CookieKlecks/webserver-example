import "./NameVisualization.scss"
import React, {HTMLProps} from 'react';


export type NameInformation = {
    id: number
    name: string
}

interface NameVisualizationProps extends HTMLProps<HTMLDivElement> {
    names: NameInformation[]
}

function NameVisualization({names, ...props}: NameVisualizationProps) {

    return <div {...props} className={`NameVisualization  ${props.className ?? ''}`}>
        {
            names.map((nameInformation) => {
                return <ViewSingleName key={nameInformation.id}
                                       name={nameInformation.name}
                />
            })
        }
    </div>
}

interface ViewSingleNameProps extends HTMLProps<HTMLDivElement> {
    name: string
}

function ViewSingleName({name, ...props}: ViewSingleNameProps) {
    return <div className={`ViewSingleName ${props.className ?? ''}`}>
        <strong>{name}</strong> war hier!
    </div>
}

export default NameVisualization;