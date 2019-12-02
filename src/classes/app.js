{{
  class Animal {
    /* constructor is used for initializing properties of an object */
    constructor(legs, color) {
      this.legs = legs;
      this.color = color;
      this.someProperty = 10;
    }

    getDetails() {
      return `${this.color} colored animal has ${this.legs} legs`;
    }

    static staticMethod() {
      console.log('HELLO FROM STATIC METHOD');
    }
  }

  /* dog inherits from animal */
  class Dog extends Animal {
    /* when extending from a parent class, we need to call the constructor of the parent */
    constructor(legs, color, age) {
      super(legs, color);
      this.age = age;
    }

    getDetails() {
      return `This is a dog method`;
    }
  }

  class Insect extends Animal {
    /* when extending from a parent class, we need to call the constructor of the parent */
    constructor(legs, color, flies) {
      super(legs, color);
      this.flies = flies;
    }

    getDetails() {
      return `This is an insect method`;
    }
  }

  const dogA = new Dog(4, 'black', 4);
  const dogB = new Dog(4, 'white', 6);

  const insectA = new Insect(100, 'black', false);
  const insectB = new Insect(2, 'black', true);

  // console.log(dogA);
  // // console.log(dogB);
  // // console.log(insectA);
  // // console.log(insectB);

  // console.log(dogA.getDetails());
  // console.log(insectA.getDetails());

  // Animal.staticMethod();
  // Dog.staticMethod();

  // console.log(dogA.getDetails());

  class ReactComponent {
    constructor(/*...*/) {
      // ....
    }

    render() {
      console.log('RENDER ME A DEFAULT TEMPLATE');
    }
  }

  class MyComponent extends ReactComponent {
    constructor() {
      super();
    }

    render() {
      console.log("RENDER ME A MY COMPONENT TEMPLATE");
    }
  }

  const component = new MyComponent();
  component.render();
}}