function check_input(input) {
    var valid = true
    if (input== undefined || input == "") {
        var warning = $("<div class='warning'>Please fill search keyword</div>")
        $("#warning").append(warning)
        return false
    } else if (input.replace(/\s+/g, "").length == 0) {
        var warning = $("<div class='warning'>Invalid spaces</div>")
        $("#warning").append(warning)
        return false
    }
    return true
}

$(document).ready(function () {
    
    // display_results(data)


    $("#search-btn").click(function (e) {
        e.preventDefault();
        var input = $("#searchbox").val()

        $("#warning").empty()
        valid = check_input(input)

        if (valid == true) {
            $("#result-list").empty();
            var search_key = {
                "search_key": input
            }
            $("#form1").submit();
        }
        
    });
});