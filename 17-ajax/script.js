console.log('Ajax tutorial in one video');

let fetchBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click',buttonClickHandler);
let popBtn =document.getElementById('backupBtn');
popBtn.addEventListener('click',popHandler);

function buttonClickHandler(){
    console.log("You have clicked fetchBtn")
    // instantiate an xhr object
    const xhr = new XMLHttpRequest();

    //open object
   // xhr.open('GET','demo.txt',true);
    //xhr.open('GET','https://jsonplaceholder.typicode.com/todos/1',true);
    xhr.open('GET','https://dummy.restapiexample.com/api/v1/create',true);// true -> make async request so the code will  not be blocked
    xhr.getResponseHeader('Content-type','application/json')
    console.log("Opening the demo.txt")

    // what to do on progress
    xhr.compress =function(){
        console.log('On pogress..');
    }

    // what to do when response is ready
    xhr.onload= function(){
        if(this.status==200){
        console.log(this.responseText)
        }
        else{
            console.log('Some error occured')
        }
    }

    // send request

    params =`{"name":"dummy","salary":"12456","age":"23"}`
    xhr.send(params);
    console.log("Request send")
}

function popHandler(){

    console.log("You have clicked popBtn")
    // instantiate an xhr object
    const xhr = new XMLHttpRequest();

    //open object
    xhr.open('GET','https://jsonplaceholder.typicode.com/users',true);

    // what to do when response is ready
    xhr.onload= function(){
        if(this.status==200){
        let obj=JSON.parse(this.responseText)
        console.log(obj)
        }
        else{
            console.log('Some error occur')
        }
    }

    // send request
    xhr.send();
    console.log("Done fetching data!!")
}