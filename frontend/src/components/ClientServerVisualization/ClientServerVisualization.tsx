import "./ClientServerVisualization.scss"
import React, {HTMLAttributes, ReactElement} from 'react';
import {FaComputer, FaEnvelope, FaServer} from "react-icons/fa6";
import Label from "../Label/Label";

export interface Package {
    id: number
    name: string
    data?: any
}

export type PackageTarget = 'client' | 'server'

export interface ClientServerVisualizationProps extends HTMLAttributes<HTMLDivElement> {
    packagesToServer: Package[],
    packagesToClient: Package[],
    serverContent?: ReactElement,
    taskDescription?: ReactElement,
    onPackageArrived?: (pkg: Package, target: PackageTarget) => void,
    maxPackageLabelLength?: number,
}

/**
 * This component visualizes a Client-Server-Communication.
 *
 * You can provide packages that will be visualized on a path from the client to the server.
 * This animation is only done once when a new package is added to the packages array. Hence, you do not have to remove
 * packages from the packages array. It should however be useful to remove them at some point to reduce the memory
 * usage as old packages, i.e., packages that already visually arrived at the server, are in overflown content and not
 * shown anymore.
 *
 * You can also provide a React element that will be draw inside the server. Here you can visualize the current content
 * of the server.
 *
 * @param packagesToServer array of the current packages from the client to the server. They will be animated exactly
 *          once on the addition to the list.
 *          To save memory, make sure to periodically remove old packages from this list.
 * @param packagesToClient array of the current packages from the server to the client. They will be animated exactly
 *          once on the addition to the list.
 *          To save memory, make sure to periodically remove old packages from this list.
 * @param serverContent an React element that will be drawn inside the server.
 * @param taskDescription an React element that will be drawn as task description underneath the client.
 * @param onPackageArrived callback function that is called when the animation of the package finished, i.e., the
 *          package visually arrived at the server.
 *          The arrived package information is passed to this callback function.
 * @param maxPackageLabelLength the maximum number of characters that are shown as the name of a package. If the label
 *          text is too long, it will be cut with an ellipsis (…).
 *          DEFAULT: 10.
 * @param props other props that are directly passed to the outlying div
 * @constructor
 */
function ClientServerVisualization({
                                       packagesToServer,
                                       packagesToClient,
                                       serverContent,
                                       taskDescription,
                                       onPackageArrived,
                                       maxPackageLabelLength,
                                       ...props
                                   }: ClientServerVisualizationProps) {
    const handlePackageArrivedFactory = (target: PackageTarget) => {
        if (onPackageArrived === undefined) {
            return undefined
        }
        return (pkg: Package) => onPackageArrived(pkg, target)
    }

    return (
        <div {...props} className={'ClientServerVisualization'}>
            <div className={'Computer icon-container'}>
                <FaComputer className={'icon'} aria-label={'computer'}/>
                <div className={'icon-description'}>
                    Computer
                </div>
            </div>
            <div className={'Packages packages-path'}>
                <div className={'packages client-to-server'}>
                    {
                        packagesToServer.map(pkg => <PackageComponent key={pkg.id}
                                                                      pkg={pkg}
                                                                      direction={'forwards'}
                                                                      onPackageArrived={handlePackageArrivedFactory('server')}
                                                                      maxPackageLabelLength={maxPackageLabelLength}
                        />)
                    }
                </div>
                <div className={'packages server-to-client'}>
                {
                    packagesToClient.map(pkg => <PackageComponent key={pkg.id}
                                                                  pkg={pkg}
                                                                  direction={'backwards'}
                                                                  onPackageArrived={handlePackageArrivedFactory('client')}
                                                                  maxPackageLabelLength={maxPackageLabelLength}
                    />)
                }
            </div>
            </div>
            <div className={'Server'}>
                <div className={'Server-icon icon-container'}>
                    <FaServer className={'icon'} aria-label={'server'}/>
                    <div className={'icon-description'}>
                        Server
                    </div>
                </div>
                <div className={'Server-content'} aria-hidden={serverContent === undefined}>
                    {serverContent ?? <div/>}
                </div>
            </div>
            <div className={'Task'} aria-hidden={taskDescription === undefined}>
                {taskDescription ?? <div/>}
            </div>
        </div>
    )
}


interface PackageProps extends HTMLAttributes<HTMLDivElement> {
    pkg: Package,
    direction: 'forwards' | 'backwards',
    onPackageArrived?: (pkg: Package) => void,
    maxPackageLabelLength?: number
}

const DEFAULT_MAX_PACKAGE_LABEL_LENGTH = 10 // characters
function PackageComponent({pkg, direction, onPackageArrived, maxPackageLabelLength, ...props}: PackageProps) {
    return <div {...props}
                className={'single-package-container ' + direction}
                onAnimationEnd={() => {
                    if (onPackageArrived !== undefined) {
                        onPackageArrived(pkg)
                    }
                }}
    >
        <div className={'single-package icon-container'}>
            <FaEnvelope className={'small-icon package-icon'} aria-label={'Briefumschlag'}/>
            <Label label={pkg.name} maxLength={maxPackageLabelLength ?? DEFAULT_MAX_PACKAGE_LABEL_LENGTH}/>
        </div>
    </div>
}

export default ClientServerVisualization;