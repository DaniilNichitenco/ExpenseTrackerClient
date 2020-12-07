const mapToSelectItem = (idProperty: string, labelProperty: string, sourceObject: any) => {
    try
    {
        const item: {
            id: number,
            label: string
        } = {
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

const mapToSelectItemWithoutIdProperty = (id: number, labelProperty: string, sourceObject: any) => {
    try
    {
        const item: {
                id: number,
                label: string
            } = {
                id: id,
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

export const mapToSelectItems = (idProperty: string, labelProperty: string, sourceObjectArray: any[]) => {
    let items: {id: number, label: string}[] = [];
    sourceObjectArray.forEach((element, index) => {
        let item: {
            id: number,
            label: string
        }; 
        if(idProperty.length > 0)
        {
            item = mapToSelectItem(idProperty, labelProperty, element);
        }
        else
        {
            item = mapToSelectItemWithoutIdProperty(index, labelProperty, element);
        }
        items.push(item);
    });

    return items;
}

export default mapToSelectItems;