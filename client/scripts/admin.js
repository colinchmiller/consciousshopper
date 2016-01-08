

var editStoreId;

$(document).ready(function() {

        //Store search for all data will occur on simple keystroke of 'enter'
        $('#storeSearchEdit').keypress(function (event) {
            enabledEnter();
        });

        //Click listeners for each button that appears along with each resulting store. One to delete, other to edit
        $("#storeContainer").on('click', '.delete', deleteStore);
        $("#storeContainer").on('click', '.edit', editStore);

             //getStores();
                updateDOM();
});


// takes data from input field clears data and sends to storesAdmin.js for search
     function enabledEnter() {
         if (event.keyCode == 13) {
             event.preventDefault();

             //serialize array didn't work with keypress.  went with .val and manual object for ajax data:
             var search = $('#storeAdminSearch').val();

             $('#storeSearchEdit').find("input[type=text]").val("");


             $.ajax({
                 type: "GET",
                 url: "/getstores",
                 data: {"venue" : search},
                 success: function (data) {
                     updateDOM(data);
                 }
             });
         }
     }



$(document).ready(function() {

        //$('#storeAdminSearch').on('return', 'search', findStore);

        //updateDOM(data);

        $("#storeContainer").on('click', '.delete', deleteStore);
        $("#storeContainer").on('click', '.edit', editStore);
             getStores();
                updateDOM();

});
        function getStores() {

            $.ajax({
                type: "GET",
                url: "/getstores",
                success: function (data) {
                    updateDOM(data)
                }
            });
        }

        function updateDOM(data) {
            $('#storeContainer').empty();

            for (var i = 0; i < data.length; i++) {
                var el = "<div class='well col-md-3'>" +
                    "<p>" + data[i].name + "</p>" +
                    "<button class='btn btn-danger delete' data-id='" + data[i]._id + "'>Delete</button>" +
                    "<button  class='btn btn-primary edit' data-id='" + data[i]._id + "' >Edit</button>" +

                    "</div>";
                $("#storeContainer").append(el);
            }
        }
        // So _id and id is weird    data-id in UPDATE DOM.  Need "id" in deleteStore,
        // but data[i]._id in UpdateDom
        function deleteStore() {
            var deletedId = {"id": $(this).data("id")};

            console.log(deletedId);

            $.ajax({
                type: "DELETE",
                url: "/deletestores",
                data: deletedId,
                success: function (data) {
                    updateDOM();
                }
            });
        }

    function clearPage() {
        $.ajax({
            type: 'GET',
            url: '/getstores',
            success: function (data) {
                updateDOM(data);
            }

        })
    }


function editStore() {
    //establish the id as a variable for search
    var editStoreId = {"id": $(this).data("id")};

    //ajax call to get all pertinent data for the store
    $.ajax({
        type: "post",
        url: "/editstore",
        data: editStoreId,
        success: function (data) {
            //setting the returned data to a variable for local storage
            editStoreId = data;
            //storing the store data in local storage for accessing after redirect
            localStorage.setItem('editInfo', JSON.stringify(editStoreId));
            //redirect function call
            editRedirect();
        }
    });
}

//redirect function to edit store page
var editRedirect = function(){


    window.location.replace('/assets/views/admin/ed1tst0re.html');
};


//
//
//function populateFields(editStoreId) {
//
//    $.ajax({
//        method: 'GET',
//        url: '/getstoreforedit',
//        data: editStoreId,
//
//        //data: {"_id": editStoreId},
//        success: function (data) {
//            console.log("The response data: ", data);
//        }
//    });
//}
//
//populateFields(editStoreId);


    //
    //function findStore(data) {
    //    $('#storeAdminSearch').keypress(function (e) {
    //        if (e.which == 13) {
    //            var el = "<div class='well col-md-3'>" +
    //                "<p>" + data[i].name + "</p>" +
    //                "<button class='btn btn-danger delete' data-id='" + data[i].id + "'>Delete</button>" +
    //                "button class='btn btn-primary edit' data-id='" + data[i].id + "'>Edit</button>" +
    //                "</div>";
    //            $('storeContainer').append(el);
    //        }
    //    });
    //}                                                                                                          ////Function to find the store -- called within getCurrentLocation
//var findStore = function(){
//    console.log("The location data being sent to the db as search criteria: ", myLatLng);
//    $.ajax({
//        type: "GET",
//        url: "/addStore",
//        data: myLatLng,
//        success: function(data){
//            console.log("The data response from the db: ", data);
//            storesFound = data;
//            console.log("The storesFound: ", storesFound);
//            initMap(myLatLng, storesFound);
//            return storesFound;
//        }
//    });
//};

//search store database
//function findStore() {
//    event.preventDefault();
//    var stores = {};
//
//    $.each($(this).serializeArray(), function (i, field) {
//        stores[field.name] = field.value;
//    });
//
////clears the search input after enter
//    $('#storeSearchAdd').find("input[type=text]").val("");
//
//    $.ajax({
//        type: "GET",
//        url: "/data",
//        data: stores,
//        success: function (data) {
//            getStores();
//        }
//    });
//}




