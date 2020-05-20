touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
function centeritemsdisplay() {
    item = 53
    width = document.body.offsetWidth
    if (width % item != 0) {
        document.getElementById("itemsdisplay").style.width = width - width % item + "px"
    }
    console.log("centered!")
}
centeritemsdisplay()
function convertunit(num) {
    if(num > 1000) {
        num = Math.round(num/1000)+"k"
    } else if(num > 1000000) {
        num = Math.round(num/1000)+"M"
    }
    return num
}
function displayitems(items) {
    document.getElementById("itemsdisplay").innerHTML = ""
    itemdisplayhtml = ""
    i=0
    while (i < items.length) {
        itemdisplayhtml += `
        <div class="items" id="${i}" onmouseover="showName(this)" onmouseout="hideName(this)">
            <img class="items-img" id="${i}-img" onerror="this.src='https://gamepedia.cursecdn.com/minecraft_gamepedia/6/6a/Grass_Block_JE6_BE5.png';" src="textures/${items[i]["name"].replace(':', '/')}.png">
            <span class="items-size" id="${i}-size">${convertunit(items[i]["size"])}</span>
            <span class="items-name" id="${i}-name">${items[i]["label"]}</span>
        </div>`;
        i+=1
        document.getElementById("status").innerHTML = "Item "+i+"/"+items.length
    }
    centeritemsdisplay()
    document.getElementById("itemsdisplay").innerHTML = itemdisplayhtml
    document.getElementById("status").innerHTML = ""
    
}
function downaloaditems() {
    document.getElementById("itemsdisplay").innerHTML = ""
    document.getElementById("status").innerHTML = "Downloading..."
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText);
            document.getElementById("status").innerHTML = "Loading..."
            displayitems(items)
        }
    };
    if (location.protocol == "file:") {
        protocol = "http:"
    } else {
        protocol = location.protocol
    }
    xhttp.open("GET", protocol+"//shokokuki.ga/webae/items.php", true);
    xhttp.send();
}
downaloaditems()
function showName(elem) {
    document.getElementById("status").innerHTML = elem.children[2].innerText
    if(!touchDevice) {
        elempos = elem.getBoundingClientRect()
        document.getElementById("itemtoast").innerHTML = elem.children[2].innerText
        document.getElementById("itemtoast").style.top = (elempos.top+10)+"px"
        document.getElementById("itemtoast").style.left = elempos.right-10+"px"
        document.getElementById("itemtoast").style.display = "block"
    }
    
}
function hideName(elem) {
    document.getElementById("status").innerHTML = ""
    if(!touchDevice) {
        document.getElementById("itemtoast").style.display = "none"
    }
}
