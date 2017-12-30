'use strict';

function pagin() {
    var numberOfItems = $('#resultSrc .list-group-item2').length;
    console.log(numberOfItems);
    var limitPage = 12;

    $('#resultSrc .list-group-item2:gt(' + (limitPage - 1) + ')').hide();

    var totalPages = Math.ceil(numberOfItems / limitPage);
    $(".pagination").append("<li  id='previous-page'><a href='javascript:void(0)' aria-label=Previous><span aria-hidden=true>&laquo;</span></a></li>");
    $(".pagination").append("<li class='current-page active'><a href='javascript:void(0)'>" + 1 + "</a></li>");

    console.log(totalPages);
    for (var i = 2; i <= totalPages; i++) {
        $(".pagination").append("<li class='current-page'><a href='javascript:void(0)'>" + i + "</a></li>");
    }
    // Add next button after all the page numbers
    $(".pagination").append("<li id='next-page'><a href='javascript:void(0)' aria-label=Next><span aria-hidden=true>&raquo;</span></a></li>");

    // Function that displays new items based on page number that was clicked
    $(".pagination li.current-page").on("click", function() {
        // Check if page number that was clicked on is the current page that is being displayed
        if ($(this).hasClass('active')) {
            return false; // Return false (i.e., nothing to do, since user clicked on the page number that is already being displayed)
        } else {
            var currentPage = $(this).index(); // Get the current page number
            $(".pagination li").removeClass('active'); // Remove the 'active' class status from the page that is currently being displayed
            $(this).addClass('active'); // Add the 'active' class status to the page that was clicked on
            $("#resultSrc .list-group-item2").hide(); // Hide all items in loop, this case, all the list groups
            var grandTotal = limitPage * currentPage; // Get the total number of items up to the page number that was clicked on

            // Loop through total items, selecting a new set of items based on page number
            for (var i = grandTotal - limitPage; i < grandTotal; i++) {
                $("#resultSrc .list-group-item2:eq(" + i + ")").show(); // Show items from the new page that was selected
            }
        }

    });

// Function to navigate to the next page when users click on the next-page id (next page button)
    $("#next-page").on("click", function() {
        var currentPage = $(".pagination li.active").index(); // Identify the current active page
        // Check to make sure that navigating to the next page will not exceed the total number of pages
        if (currentPage === totalPages) {
            return false; // Return false (i.e., cannot navigate any further, since it would exceed the maximum number of pages)
        } else {
            currentPage++; // Increment the page by one
            $(".pagination li").removeClass('active'); // Remove the 'active' class status from the current page
            $("#resultSrc .list-group-item2").hide(); // Hide all items in the pagination loop
            var grandTotal = limitPage * currentPage; // Get the total number of items up to the page that was selected

            // Loop through total items, selecting a new set of items based on page number
            for (var i = grandTotal - limitPage; i < grandTotal; i++) {
                $("#resultSrc .list-group-item2:eq(" + i + ")").show(); // Show items from the new page that was selected
            }

            $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
        }
    });

// Function to navigate to the previous page when users click on the previous-page id (previous page button)
    $("#previous-page").on("click", function() {
        var currentPage = $(".pagination li.active").index(); // Identify the current active page
        // Check to make sure that users is not on page 1 and attempting to navigating to a previous page
        if (currentPage === 1) {
            return false; // Return false (i.e., cannot navigate to a previous page because the current page is page 1)
        } else {
            currentPage--; // Decrement page by one
            $(".pagination li").removeClass('active'); // Remove the 'activate' status class from the previous active page number
            $("#resultSrc .list-group-item2").hide(); // Hide all items in the pagination loop
            var grandTotal = limitPage * currentPage; // Get the total number of items up to the page that was selected

            // Loop through total items, selecting a new set of items based on page number
            for (var i = grandTotal - limitPage; i < grandTotal; i++) {
                $("#resultSrc .list-group-item2:eq(" + i + ")").show(); // Show items from the new page that was selected
            }

            $(".pagination li.current-page:eq(" + (currentPage - 1) + ")").addClass('active'); // Make new page number the 'active' page
        }
    });

}


