
 - a function that returns multiple values (https://www.youtube.com/watch?v=lil4YCCXRYc&list=PLUS3uVC08ZapyqfU21joP-B1vTItKf5qi), Jafar Husain.

 ```
 function* whatDidYouSay(){
     yield 'what?';
     yield 'I said it\'s a function that returns multiple values';
     yield 'I SAID, "it is a function that returns multiple values"';
     return 'I SAID ITS A FUNCTION THAT RETURNS MUTLIPLE VALUES!';
 }
 ```

 reuturns an iterator - an object you can call next on to get the next value.
 ```
 let iterator = whatDidYouSay();
 console.log(iterator.next()); // { value: 'what?', done: false }
 ```

 The iteration pattern.
 Consumer pulls from the producer.

 Generators can take data too.

 ``` 
 generator.throw('an error');
 generator.return('final value');
 ```

 Async iteration pattern