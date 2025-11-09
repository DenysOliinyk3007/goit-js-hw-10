import iziToast from "izitoast";
//////////////////
import "izitoast/dist/css/iziToast.min.css";

const notificationBtnClass = document.querySelector('.notification-btn');
const radioBtnClass = document.querySelectorAll('input[name = "state"]');
const delayClass = document.querySelector('input[name = "delay"]');

notificationBtnClass.addEventListener('click', (evt) => {
    evt.preventDefault();
    let status = '';
    for (let radioBtn of radioBtnClass){
        if (radioBtn.checked){
            status = radioBtn.value;
        }
    }
    const delayTime = Number(delayClass.value);
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (status === 'fulfilled'){
                resolve(`✅ Fulfilled promise in ${delayTime} ms`);
            } else{
                reject(`❌ Rejected promise in ${delayTime} ms`)
            }
        }, delayTime);
    });

    promise.then(value => {
        iziToast.success({message: value, position: "topRight"});
    })
    .catch(value => {
        iziToast.error({message: value, position: "topRight"});
    })
})




    


