//#region Randomized thumb code
const thumbDirectory = "/media/thumbs";
var thumb = document.getElementById("title-image");
var thumbHttp = new XMLHttpRequest();

thumbHttp.onreadystatechange = function ()
{
    try
    {
        if (thumbHttp.readyState != thumbHttp.DONE) return;
        if (thumbHttp.status != 200) throw new Error("Error loading thumb data.");

        var data = JSON.parse(thumbHttp.responseText);
        if (data == undefined) throw new Error("Error parsing thumb data.");

        if (data.thumbOptions == undefined) throw new Error("Thumb data does not contain image options.");
        var options = data.thumbOptions;

        var index = Math.floor(Math.random() * options.length);
        thumb.src = thumbDirectory + "/" + options[index];
    }
    catch (error)
    {
        console.error(error);
        thumb.src = thumbDirectory + "/thumb_error.png";
    }
};

thumbHttp.open("GET", thumbDirectory + "/thumb_data.json");
thumbHttp.send();
//#endregion
