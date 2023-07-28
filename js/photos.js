//#region Photo Gallery
const galleryDirectory = "/media/gallery";
var galleryContainer = document.getElementById("gallery-container");
var galleryHttp = new XMLHttpRequest();

galleryHttp.onreadystatechange = function ()
{
    if (galleryHttp.readyState != galleryHttp.DONE) return;
    if (galleryHttp.status != 200) throw new Error("Error loading gallery data.");

    var data = JSON.parse(galleryHttp.responseText);
    if (data == undefined) throw new Error("Error parsing gallery data.");

    if (data.categories == undefined) throw new Error("Gallery data does not contain any categories.");
    var categories = data.categories;

    var tableOfContents = document.getElementById("table-of-contents");

    for (var i = 0; i < categories.length; i++)
    {
        var jsonCategory = categories[i];
        var category = document.createElement("div");
        category.className = "photo-category";
        category.id = jsonCategory.name.trim().toLowerCase().replace(' ', '-');

        galleryContainer.append(category);

        var name = document.createElement("h3");
        name.textContent = `${jsonCategory.name} (${jsonCategory.images.length} images)`;
        category.append(name);

        for (var j = 0; j < jsonCategory.images.length; j++)
        {
            var image = jsonCategory.images[j];
            var imgElement = document.createElement("img");
            imgElement.src = galleryDirectory + "/" + image;

            var link = document.createElement("a");
            link.href = imgElement.src;
            link.target = "_blank";
            link.append(imgElement);

            category.append(link);
        }

        var tableEntry = document.createElement("a");
        tableEntry.textContent = jsonCategory.name;
        tableEntry.href = "#" + category.id;

        tableOfContents.append(tableEntry);
    }
};

galleryHttp.open("GET", galleryDirectory + "/gallery_data.json");
galleryHttp.send();
//#endregion
