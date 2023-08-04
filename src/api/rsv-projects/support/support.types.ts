export interface iSupport {
    nominationId: number
    email: string
    name: string
    message: string
    files?: tFiles[]
    device: tDevice
}

type tFiles = {
    uuid: string
    url: string
}

type tDevice = {
    screenWidth: number
    screenHeight: number
    windowInnerWidth: number
    windowInnerHeight: number
}

export interface iSupportResponse extends iSupport {
    id: number
    code: string
    createdAt: string
    sendAt: string
}
