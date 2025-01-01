// type predicates
const numbers = [1, undefined, 25, 25, undefined];
const onlyNumbers = numbers.filter((val): val is number => Boolean(val));

// branded types (add metadata to types)
export type Brand<T, BrandName extends string> = T & { __brand: BrandName };
type Username = Brand<string, 'Username'>;
type Role = Brand<string, 'Role'>;

const username = 'coldelicks' as Username;
const role = 'admin' as Role;

let testUsername: Username;
// testUsername = role;

// branded type predicates

export type Approved<T> = Brand<T, 'Approved'>;

interface PurchaseDetails {
  item: string;
  price: number;
}

const isPurchaseApproved = (
  details: PurchaseDetails,
): details is Approved<PurchaseDetails> => {
  if (details.price > 1000) {
    return false;
  }
  return true;
};

const processPurchase = (details: Approved<PurchaseDetails>) => {
  // submiting to backend logic...
};

/*
  Your Job:
  Update isPurchaseApproved function so the following cases pass.
*/

const submitHandler = (details: PurchaseDetails) => {
  if (isPurchaseApproved(details)) {
    processPurchase(details); // This should not error.
  }
  // processPurchase(details); // This should error.
};

// branded type guards

interface PurchaseDetails {
  item: string;
  price: number;
}

function assertAmount2(
  details: PurchaseDetails,
): asserts details is Approved<PurchaseDetails> {
  if (details.price > 1000) {
    throw new Error('Amound exeeds the max limit.');
  }
}

const processPurchase2 = (details: Approved<PurchaseDetails>) => {
  // submiting to backend logic...
};

/*
  Your Job:
  Update isPurchaseApproved function so the following cases pass.
*/

const submitHandler2 = (details: PurchaseDetails) => {
  // processPurchase2(details); // This should error.

  assertAmount2(details);
  processPurchase2(details); // This should not error.
};

// type predicates with classes

class Task<T> {
  counter?: number;
  public tasks: T;
  private countTasks;

  constructor(tasks: T, countTasks: (details: T) => number | void) {
    this.tasks = tasks;
    this.countTasks = countTasks;
  }

  check(): this is Task<T> & { counter: number } {
    // <----- type predicate on instance
    const countResult = this.countTasks(this.tasks);

    if (typeof countResult == 'number') {
      this.counter = countResult;
      return true;
    }

    this.counter = undefined;
    return false;
  }
}

const task = new Task(/*['task1', 'task2', 'task3']*/ 0, (tasks) => {
  /*  if (tasks.length > 0) {
      return tasks.length - 1;
    }*/
});

if (task.check()) {
  type test = typeof task.counter;
} else {
  type test = typeof task.counter;
}

// assertion inside class

interface Vehicle {
  type: string;
}

export class VehicleController {
  currentVehicle?: Vehicle;

  constructor(currentVehicle?: Vehicle) {
    this.currentVehicle = currentVehicle;
  }

  assertHasVehicle(): asserts this is VehicleController & {
    // or this is this (2nd this means class name)
    currentVehicle: Vehicle; // <---- assert currentVehicle is not null / undefined
  } {
    if (!this.currentVehicle) {
      throw new Error('No vehicle selected');
    }
  }

  performMaintenance(serviceType: string, description: string) {
    let test = this.currentVehicle;
    this.assertHasVehicle();
    let test2 = this.currentVehicle;

    // Logic for performing maintenance on the selected vehicle
  }
}
