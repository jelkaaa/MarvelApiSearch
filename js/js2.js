

(function () {
    var xhr = new XMLHttpRequest();

    var api= 'https://gateway.marvel.com/v1/public/characters?limit=100&ts=1&apikey=3d28f429fa553c826bfc53f6a6c1b4af&hash=453e826b64d5df8ec762ca2612893dcd';
    xhr.open('GET', api);
    xhr.onload = function () {
        if (xhr.status === 200) {

            var heroes = JSON.parse(xhr.responseText);
            showDetail(heroes);


        }
        else {
            alert('Error to connection');
        }
    };
    xhr.send();
})();

//Set events class in object and calling after in project
var DOMStrings = {
    searchBox: '.searchBox',
    resultSrc: '.resultSrc',
    resultLocStr: '.resultLocStr',
    listGroupItem2: 'list-group-item2',
    pagination: '.pagination',
    resultPagination: '.resultPagination'
};
var allElementHero = [];
function showDetail(hero) {


    for (var i = 0; i < hero.data.results.length; i++) {

        allElementHero.push(hero.data.results[i]);// Pushing api elements to array


    }


   searchFun(allElementHero);


}


function toggle (element) {
    if (element.style.display !== 'none') {
        element.style.display = 'none';
    }
    else {

        element.style.display = 'block';

    }
}
//Display results from localStorage if click to search filed
function searchToggle(search,rez) {
    var i = 0;
    search.addEventListener('click', function () {

        if (search.value === '') {

            if (i < 1) {
                i++;
                showItem();

            }
            else {
                toggle(rez);
            }
        } else {
            return false;
        }

    });
}

function searchFun(allElementHero) {
    var searchBox = document.querySelector(DOMStrings.searchBox);
    var resultSrc = document.querySelector(DOMStrings.resultSrc);
    var allListGroupItem2=document.getElementsByClassName(DOMStrings.listGroupItem2);
    var resultPagination;
    searchToggle(searchBox,resultSrc);
    searchBox.addEventListener('input', function () {
        if (searchBox.value !== '') {

            resultSrc.innerHTML = '';
            resultSrc.insertAdjacentHTML('beforeend',' <ul class="resultPagination"></ul>');


            var searchField = searchBox.value;
            var searchExp=new RegExp(searchField,'ig');
            var matches = searchField.match(searchExp);


            //Listing object from Api
            Array.from(allElementHero).forEach(function (p1) {
                var title = p1.name;
                var colorReplace;
                var showRez;



                if (title.toLowerCase().indexOf(matches) !== -1) {

                    colorReplace = title.replace(searchExp, function (match) {
                        return  '<span class="search-color">' + match + '</span>';
                    });//Marking search strings with yellow color


                    showRez = resultSrc.insertAdjacentHTML('beforeend', '<li class="list-group-item2 col-lg-3 col-md-3 col-sm-6 col-xs-12 ">' +
                        ' <img class="img-thumbnail" src="' + p1.thumbnail.path + '/portrait_small.' + p1.thumbnail.extension + '">' +
                        ' <a class="img-responsive" href="' + p1.urls[0].url + '" target="_blank">' + colorReplace + '</a> ' +
                        '<button class="add__btn"  onclick="addItems(' + p1.id + ')"><i class="ion-ios-checkmark-outline"></i></button></li>');//Putting results to HTML documents

                }


            });

            resultPagination= document.querySelector(DOMStrings.resultPagination);
            //Insert pagination
            insertPagination(resultPagination,allListGroupItem2);
        }
        else {

            //If input is empty, show items from localStorage
            showItem();


            //Hidden pagination
            document.querySelector(DOMStrings.pagination).style.display = 'none';




            //Hidden elements
            for (var i = 0; i < allListGroupItem2.length; i++) {
                allListGroupItem2[i].style.display = 'none';

            }


        }

    });

}
//Add items  to localStorage
function addItems(id) {

    var allHero = [];
    var JSONHero;

    Array.from(allElementHero).forEach(function (p1) {

        //Checking if click id and id from api object is equal
        if (p1.id === id) {


            allHero.push(p1);// pushing id to array


        }
    });

    JSONHero = JSON.stringify(allHero);//converts value to JSON string
    localStorage.setItem(id, JSONHero);//set JSON string to localStorage
}
//Show items from localStorage
function showItem() {

    var getStorage;
    var parseGetStorage;
    for (var i = 0; i < localStorage.length; i++) {
        var a = localStorage.key(i);

        getStorage = localStorage.getItem(a);

        parseGetStorage = JSON.parse(getStorage);// convert values to JavaScript object


        Array.from(parseGetStorage).forEach(function (p1) {

            var showRez = document.querySelector(DOMStrings.resultSrc).innerHTML += '<li class="list-group-item"> <img class="img-thumbnail" src="' + p1.thumbnail.path + '/portrait_small.' + p1.thumbnail.extension + '"> <a class="img-responsive" href="' + p1.urls[0].url + '" target="_blank">' + p1.name + '</a>  </li>';


        });

    }

}

function insertPagination(rez,item) {



    rez.insertAdjacentHTML('beforeend', '<div class="pagination"> </div>');

    pagin();

    // Hide pagination if search elements empty

   if(  item.length === 0 ) {
        document.querySelector(DOMStrings.pagination).style.display = 'none';
    }
    else if(item.length === 1){
       item[0].classList.remove('col-md-3','col-lg-3','col-sm-6','col-xs-12');
       item[0].classList.add('col-md-12','col-lg-12');


   }
   else if(item.length === 2){
       item[0].classList.remove('col-md-3','col-lg-3','col-xs-12');
       item[0].classList.add('col-md-6','col-lg-6');

       item[1].classList.remove('col-md-3','col-lg-3','col-xs-12');
       item[1].classList.add('col-md-6','col-lg-6');
   }
   else if(item.length === 3){
       item[0].classList.remove('col-md-3','col-lg-3','col-sm-6','col-xs-12');
       item[0].classList.add('col-md-4','col-lg-4');

       item[1].classList.remove('col-md-3','col-lg-3','col-sm-6','col-xs-12');
       item[1].classList.add('col-md-4','col-lg-4');

       item[2].classList.remove('col-md-3','col-lg-3','col-sm-6','col-xs-12');
       item[2].classList.add('col-md-4','col-lg-4');
   }

}

