
interface ExtraData {
    [index: string]: string | undefined | Object
}

export default interface Item extends ExtraData {
    data: [Data]
    href: string,
    links: [Links]
}

interface Data {
    center: string,
    date_created: string,
    description: string,
    media_type: string,
    nasa_id: string,
    photographer: string,
    title: string
}

interface Links {
    href: string,
    rel: string,
    render?: string
}