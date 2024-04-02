var imagePaths = [
    '../Static/Static Images/scene-1-img.jpg',
    '../Static/Static Images/scene-2.jpg',
    '../Static/Static Images/scene-3.jpeg',
    '../Static/Static Images/scenery-4.jpg',
    '../Static/Static Images/scenery-5.jpeg',
    '../Static/Static Images/scene-6.jpg'
];
  
function changeBackgroundImage() {
    var body = document.querySelector('.slide-show-random');
    let divoffset = document.getElementById('nav-bar-stakker');
    var randomIndex = Math.floor(Math.random() * imagePaths.length);

    var imagePath = imagePaths[randomIndex];
    let mainImg = document.createElement('img');
    mainImg.className = 'data-image-main';
    mainImg.src = imagePath;
    var divHeight = divoffset.offsetHeight;
    mainImg.style.position = 'absolute';

    mainImg.style.top = divHeight;
    console.log("The height of the div is: " + divHeight + " pixels");
    body.appendChild(mainImg);

    // Set timeout to trigger the transition
    setTimeout(function() {
        mainImg.style.opacity = 1;
    }, 0);

    body.style.backgroundImage = "url('" + imagePath + "')";
} 

function startBackgroundChange() {
    changeBackgroundImage();
    setInterval(changeBackgroundImage, 3000);
}

startBackgroundChange();
