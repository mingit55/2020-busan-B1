function Resome(){
    this.rows = {
        education: '<td class="resume__input"><input type="text"></td>'
                    +'<td class="resume__input">'
                        +'<select name="type" id="edu_Type">'
                            +'<option value="재학">재학</option>'
                            +'<option value="졸업">졸업</option>'
                        +'</select>'
                    +'</td>'
                    +'<td class="resume__input"><input type="text"></td>'
                    +'<td class="resume__input"><input type="text"></td>'
                    +'<td class="resume__input"><input type="text"></td>'
                    +'<td class="resume__remove">'
                        +'<button class="btn-remove">삭제 <i class="fa fa-times"></i></button>'
                    +'</td>',
        career: '<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__remove">'
                    +'<button class="btn-remove">삭제 <i class="fa fa-times"></i></button>'
                +'</td>',
        outside: '<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__remove">'
                    +'<button class="btn-remove">삭제 <i class="fa fa-times"></i></button>'
                +'</td>',
        license: '<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__input">'
                    +'<select name="type" id="lic_type">'
                        +'<option value="자격증">자격증</option>'
                        +'<option value="어학">어학</option>'
                    +'</select>'
                +'</td>'
                +'<td class="resume__input"><input type="text"></td>'
                +'<td class="resume__remove">'
                    +'<button class="btn-remove">삭제 <i class="fa fa-times"></i></button>'
                +'</td>'
    };

    this.setEvents();    
}

/**
 * 이벤트 설정
 */
Resome.prototype.setEvents = function(){
    var app = this;

    // 이미지 INPUT
    var input__image = document.querySelector("#profile")
    input__image.addEventListener("change", function(e){
        var file = this.files.length > 0 ? this.files[0] : null;
        if(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(){
                app.setImage(this.result);
            }
        }
    });

    // 추가하기 BUTTON
    var btns__add = document.querySelectorAll(".btn-add");
    for(var i = 0; i < btns__add.length; i++){
        var btn = btns__add[i];
        btn.addEventListener("click", function(){
            var table = closest(this, ".resume__table");
            var infoName = table.dataset.info;
            
            var tbody = table.firstElementChild;
            var autoSize = tbody.querySelector(".resume__autosize");
            var length = tbody.querySelectorAll("tr").length;
            var row__add = tbody.querySelector(".resume__add").parentElement;
            
            var row = document.createElement("tr");
            row.innerHTML = app.rows[infoName];
            tbody.insertBefore(row, row__add);
        
            autoSize.rowSpan = length + 1;
        });
    }
    

    // 삭제하기 BUTTON
    var tables = document.querySelectorAll(".resume__table");
    for(var i = 0; i < tables.length; i++){
        var table = tables[i];
        table.addEventListener("click", function(e){
            var isBtn = e.target.classList.contains("btn-remove") || closest(e.target, ".btn-remove");
            if(!isBtn) return;

            var table = closest(e.target, ".resume__table");
            var length = table.querySelectorAll("tr").length;
            var autoSize = table.querySelector(".resume__autosize");

            var row = closest(e.target, ".resume__table tr");
            console.log(row);
            row.remove();

            autoSize.rowSpan = length - 1;
        });
    }
};

/**
 * 이미지 업로드
 */
Resome.prototype.setImage = function(imageURL){
    document.querySelector("#profile__url").value = imageURL;

    var img__exist = document.querySelector(".resume__image img");
    img__exist && img__exist.remove();

    var img = document.createElement("img");
    img.src = imageURL;
    img.alt = "프로필 사진";
    img.onload = function(){
        document.querySelector(".resume__image").append(img);
    };
};

window.onload = function(){
    var app = new Resome();
};