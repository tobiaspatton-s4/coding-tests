import { DogSummary } from './dog-summary';

export class Dog extends DogSummary {
    constructor(public name: string,
                public group: string,
                public minWeight: number,
                public maxWeight: number,
                public minHeight: number,
                public maxHeight: number,
                public minLifeExpectancy: number,
                public maxLifeExpectancy: number,
                public otherNames: Array<string>) {
        super(name, group);
    }
}
