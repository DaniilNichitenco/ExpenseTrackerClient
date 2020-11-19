declare module "AmdarisTask" 
{
    export class BaseGeneric<T> {
        #value: T;
        constructor(value: T) {
            this.value = value;
        }

        add(value: T)
        {
            return this.#value + value;
        }
    }

    export class NumDerivedClass extends BaseGeneric<number>
    {
        constructor(value: number) {
            super(value);
        }
    }


    export const a = (num: number) => {
        return num*num;
    }

    export default {BaseGeneric, a};
}