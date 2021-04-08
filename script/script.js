var search = function () {
    document.getElementById('results').innerHTML = ""; // clear all existing results

    var searchWord = document.getElementById("search_word").value;
    var request = new XMLHttpRequest();
    const ApiKey = "API_KEY"
    var api_url = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}&part=snippet&maxResults=4&type=video&q=${searchWord}`

    // console.log(api_url)

    request.open('GET', api_url);

    request.onload = function () {

        var response = request.response;
        var parsedData = JSON.parse(response);
        // console.log(parsedData);
        for (i in parsedData.items) {
            var video_title = parsedData.items[i].snippet.title;
            var video_id = parsedData.items[i].id[Object.keys(parsedData.items[i].id)[1]];
            var video_url = 'https://www.youtube.com/watch?v=' + video_id;
            var thumbnail_url = parsedData.items[i].snippet.thumbnails.medium.url;
            var hyperlink = document.createElement("a");
            hyperlink.innerHTML = "<h3 class = \"Youtube_Result_Title\">" + video_title + "</h3>";
            hyperlink.href = video_url;

            var results = document.getElementById('results');


            var result_loop = document.createElement('div');
            result_loop.classList.add("Youtube_Results");

            var curr_result = results.appendChild(result_loop);
            // var result_title = document.createElement("h3");
            // result_title.classList.add("Youtube_Result_Title");
            // // result_title.innerHTML = video_title;
            // result_title.appendChild(hyperlink);
            var result_image = document.createElement("img");
            result_image.src = thumbnail_url;
            hyperlink.insertBefore(result_image, hyperlink.firstChild);
            // result_loop.onclick = function(){
            //
            //     window.open(video_url);
            // }
            curr_result.insertBefore(document.createElement("HR"), curr_result.firstChild);
            // curr_result.insertBefore(result_title,curr_result.firstChild);
            curr_result.insertBefore(hyperlink, curr_result.firstChild);
        }
    }
    request.send();
}
