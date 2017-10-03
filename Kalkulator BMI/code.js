function setupEvents(){

    var resetButton = document.querySelector('.reset');
    console.log(resetButton);
    resetButton.onclick = function(){
        return reset();
    }
}

setupEvents();

function reset(){
    var resetButton = document.querySelector('.reset');
    
    showAlert('default');
    resetButton.style.display = "none";
}

function showAlert(type, text){
    var type = type;
    var text = text;
    var output = document.querySelector('.alert');

    if(type == 'default'){
        output.classList.value = "alert"; 
    } else {
        output.innerHTML = text;
        output.classList.value = "alert";
        output.classList.value += " alert-" + type; 
    }
}

function calculateBmi() {
    var weight = document.bmiForm.weight.value;
    var height = document.bmiForm.height.value;

    var resetButton = document.querySelector('.reset');

    if(weight > 0 && height > 0 ){	

        var finalBmi = weight/(height/100*height/100);
        finalBmi = finalBmi.toFixed(1);

        if(finalBmi < 18){

            showAlert('danger', finalBmi + ' Masz niedowagę!');
        }

        if(finalBmi > 18 && finalBmi < 25){

            showAlert('success', finalBmi + ' Prawidłowa waga');
        }

        if(finalBmi > 25){

            showAlert('danger', finalBmi + ' Masz nadwagę!');
        }

        resetButton.style.display = "block";
    }

    else{
        showAlert('warning', 'Proszę wypełnić pola!');
    }

}