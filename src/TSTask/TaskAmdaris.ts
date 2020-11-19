import * as Task from 'AmdarisTask';

let derived = new Task.NumDerivedClass(10);
let base = new Task.BaseGeneric("10");

derived.add(5);
base.add('5');