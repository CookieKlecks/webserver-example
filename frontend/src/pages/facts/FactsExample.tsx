import "./FactsExample.scss"
import React, {HTMLAttributes, useState} from 'react';
import {useWebsocket} from "../../hooks/useWebsocket";
import _ from "lodash";
import ClientServerVisualization, {
    Package,
    PackageTarget
} from "../../components/ClientServerVisualization/ClientServerVisualization";
import {FaBook} from "react-icons/fa6";
import FactsExampleDescription from "../../components/taskDescriptions/FactsExampleDescription/FactsExampleDescription";

const MAX_CONCURRENT_PACKAGES = 12;

interface NamesExampleProps extends HTMLAttributes<HTMLDivElement> {

}

function FactsExample({...props}: NamesExampleProps) {
    // here we store the received names directly to instantly visualize the package from client to server
    const [packagesToServer, setPackagesToServer] = useState<Package[]>([])
    const [packagesToClient, setPackagesToClient] = useState<Package[]>([])
    const [activeFacts, setActiveFacts] = useState<number[]>([])

    useWebsocket({
        url: `${process.env.REACT_APP_WEBSOCKET}/fact`,
        onMessage: (data) => {
            let factData: { id: string, fact: string } = {id: '-1', fact: ''}
            try {
                factData = JSON.parse(data)
            } catch (e) {
                console.error(e)
                return
            }

            if (!factData.hasOwnProperty('id') || !factData.hasOwnProperty('fact')) {
                // invalid fact returned from web server
                return;
            }
            let newPackage: Package = {
                name: `GET Fakt ${factData.id}`,
                id: Date.now(),
                data: factData,
            }
            // add new element at front of the list and take only the left most MAX_CONCURRENT_PACKAGES
            let newPackages = _.take(_.concat([newPackage], packagesToServer), MAX_CONCURRENT_PACKAGES)
            setPackagesToServer(newPackages)
        }
    })

    const filterActivePackages = (removeId: number) => {
        let newActiveFacts = _.filter(activeFacts, (id) => id !== removeId)
        setActiveFacts(newActiveFacts)
    }

    const handlePackageArrived = (pkg: Package, target: PackageTarget) => {
        if (target === 'server') {
            // arrived at server => create answer packages
            const answerPackage = {
                name: `Fakt ${pkg.data.id}`,
                id: pkg.id,
                data: pkg.data
            }
            // add new element at front of the list and take only the left most MAX_CONCURRENT_PACKAGES
            let newPackages = _.take(_.concat([answerPackage], packagesToClient), MAX_CONCURRENT_PACKAGES)
            setPackagesToClient(newPackages)

            let newActiveFacts = _.concat(activeFacts, pkg.data.id);
            setActiveFacts(newActiveFacts)
        }
        if (target === 'client') {
            filterActivePackages(pkg.data.id)
        }
    }

    const serverContent = <div className={'FactsExample-ServerContent'}>
        <div className={'FactVisualization'}>
            {
                Array.from(Array(9).keys()).map(id => {
                    let classNameAddition = '';
                    if (activeFacts.includes(id)) {
                        classNameAddition += ' active'
                    }
                    return <div key={id} className={'Fact-container' + classNameAddition}>
                        <FaBook className={'Fact-icon' + classNameAddition}
                            // we use the onAnimationEnd hook to remove it from active packages. This is to restart
                            // the animation when it is received again by the server.
                                onAnimationEnd={() => filterActivePackages(id)}/>
                        <span>Fakt {id}</span>
                    </div>
                })
            }
        </div>
    </div>

    return (
        <div {...props}>
            <ClientServerVisualization packagesToServer={packagesToServer}
                                       packagesToClient={packagesToClient}
                                       serverContent={serverContent}
                                       taskDescription={<FactsExampleDescription/>}
                                       onPackageArrived={handlePackageArrived}
                                       maxPackageLabelLength={15}
            />
        </div>
    )
}

export default FactsExample;