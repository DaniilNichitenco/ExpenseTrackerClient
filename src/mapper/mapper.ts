export const mapToSelectItem = (idProperty: string, labelProperty: string, sourceObject: any) => {
    try
    {
        const item = {
            id: sourceObject[idProperty],
            label: sourceObject[labelProperty]
        }
        return item;
    }
    catch(exception: any)
    {
        console.log(exception);
        return {id: 0, label: ""}
    }
}

export const mapToSelectItems = (idPropery: string, labelProperty: string, sourceObjectArray: any[]) => {
    let items: {id: number, label: string}[] = [];
    sourceObjectArray.forEach(element => {
        let item = mapToSelectItem(idPropery, labelProperty, element);
        items.push(item);
    });

    return items;
}

export default {
    mapToSelectItem,
    mapToSelectItems
}