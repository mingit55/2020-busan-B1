function Interview(){
    var app = this;

    this.input__recruit = document.querySelector("#recruit_name");
    this.input__interview = document.querySelector("#interview");
    this.input__field = document.querySelector("#field");

    this.loadData(function(res){
        app.recruitList = JSON.parse(res);
        app.init();
        app.setEvents();
    });
}

Interview.prototype.loadData = function(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/json/interview.json");
    xhr.onload = function(){
        callback(xhr.responseText);
    }
    xhr.send();
}

Interview.prototype.init = function(){
    this.input__recruit.innerHTML = "<option></option>";
    for(var i = 0; i < this.recruitList.length; i ++){
        var item = this.recruitList[i];
        var option = document.createElement("option");
        option.innerText = option.value = item.recruit_name;
        this.input__recruit.appendChild(option);
    }
};

Interview.prototype.setEvents = function(){
    var app = this;
    console.log(app.recruitList);
    app.input__recruit.addEventListener("change", function(){
        app.input__interview.innerHTML = "<option></option>";
        app.input__field.innerHTML = "<option></option>";
        if(!app.input__recruit.value) return;

        var itvList = [];
        for(var i = 0; i < app.recruitList.length; i++){
            if(app.input__recruit.value == app.recruitList[i].recruit_name){
                itvList =  app.recruitList[i].interview;
                break;
            }
        }

        for(var i = 0; i < itvList.length; i++){
            var option = document.createElement("option");
            option.innerText = option.value = itvList[i];
            app.input__interview.appendChild(option);
        }
    });

    app.input__interview.addEventListener("change", function(){
        app.input__field.innerHTML = "<option></option>";
        if(!app.input__recruit.value || !app.input__interview.value) return;

        var fldList = [];
        for(var i = 0; i < app.recruitList.length; i++){
            if(app.input__recruit.value == app.recruitList[i].recruit_name){
                fldList = app.recruitList[i].field;
                break;
            }
        }

        for(var i = 0; i < fldList.length; i++){
            var option = document.createElement("option");
            option.innerText = option.value = fldList[i];
            app.input__field.appendChild(option);
        }
    });
};

window.onload = function(){
    this.app = new Interview();
};