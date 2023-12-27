import "./NamesExample.scss"
import React, {HTMLAttributes, useState} from 'react';
import {useWebsocket} from "../../hooks/useWebsocket";
import _ from "lodash";
import NameVisualization, {NameInformation} from "../../components/NameVisualization/NameVisualization";
import ClientServerVisualization, {Package} from "../../components/ClientServerVisualization/ClientServerVisualization";
import NamesExampleDescription from "../../components/taskDescriptions/NamesExampleDescription/NamesExampleDescription";

const MAX_VISIBLE_NAMES = 12;

interface NamesExampleProps extends HTMLAttributes<HTMLDivElement> {

}

function NamesExample({...props}: NamesExampleProps) {
    // here we store the received names directly to instantly visualize the package from client to server
    const [packages, setPackages] = useState<Package[]>([])
    // after the package (visually) arrived at the server, we also draw them in the server content
    const [receivedNames, setReceivedNames] = useState<NameInformation[]>([])

    useWebsocket({
        url: `${process.env.REACT_APP_WEBSOCKET}/name`,
        onMessage: (data) => {
            if (_.isString(data)) {
                let newPackage: Package = {
                    name: data,
                    id: Date.now()
                }
                // add new element at front of the list and take only the left most MAX_VISIBLE_NAMES
                let newPackages = _.take(_.concat([newPackage], packages), MAX_VISIBLE_NAMES)
                setPackages(newPackages)
            }
        }
    })

    const handlePackageArrived = (pkg: Package) => {
        let newReceivedName: NameInformation = {
            name: pkg.name,
            id: pkg.id
        }
        // add new element at front of the list and take only the left most MAX_VISIBLE_NAMES
        let newNames = _.take(_.concat([newReceivedName], receivedNames), MAX_VISIBLE_NAMES)
        setReceivedNames(newNames)
    }

    const serverContent = <div className={'NamesExample-ServerContent'}>
        <div className={'NameVisualization'}>
            <NameVisualization names={receivedNames}/>
        </div>
    </div>

    return (
        <div {...props}>
            <ClientServerVisualization packagesToServer={packages}
                                       packagesToClient={[]}
                                       serverContent={serverContent}
                                       taskDescription={<NamesExampleDescription/>}
                                       onPackageArrived={handlePackageArrived}
                                       maxPackageLabelLength={15}
            />
        </div>
    )
}

export default NamesExample;