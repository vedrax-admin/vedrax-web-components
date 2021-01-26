/**
 * Enum that describes the available table's column action
 */
export enum ActionType {
    select = 'select', //emit selected value
    redirect = 'redirect', //redirect to the provided url
    form = 'form', //open form in a modal
    download = 'download', //download documents
    upload = 'upload',
    job = 'job'
}